const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const sql = require('mssql')
const { connectMySQL, connectSQLServer } = require('./db');

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'vibio_secret_key_2026'

// ——— Middleware ———
// Allow localhost dev servers (any port) and permit non-browser tools (no-origin)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, server-side)
    if (!origin) return callback(null, true);
    try {
      const u = new URL(origin);
      if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') return callback(null, true);
    } catch (e) {
      // If origin is malformed, reject
    }
    return callback(new Error('CORS policy: origin not allowed'), false);
  },
  credentials: true
}))
// Capture raw body for better diagnostics on JSON parse errors
app.use(express.json({
  verify: (req, _res, buf) => {
    try {
      req.rawBody = buf && buf.toString ? buf.toString() : '';
    } catch (e) {
      req.rawBody = '';
    }
  }
}))

// Handle malformed JSON payloads gracefully so the server doesn't crash
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON received:', err.message)
    if (req && req.rawBody) console.error('Raw body:', req.rawBody)
    return res.status(400).json({ error: 'Invalid JSON payload' })
  }
  next()
})

// ——— In-memory user store (swap for a real DB in production) ———
// const users = [] // We are now using MySQL instead of this array!

// ——— Routes ———

/**
 * POST /api/register
 * Body: { username, password }
 */
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' })
    }

    if (username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters.' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' })
    }

    if (!global.mysqlConnection && !global.sqlServerPool) {
      return res.status(503).json({ error: 'No database available. Please try again later.' })
    }

    // Check duplicate in available databases
    let mysqlDuplicate = false;
    let sqlServerDuplicate = false;

    if (global.mysqlConnection) {
      const [rows] = await global.mysqlConnection.query('SELECT * FROM users WHERE username = ?', [username]);
      mysqlDuplicate = rows.length > 0;
    }

    if (global.sqlServerPool) {
      const sqlServerResult = await global.sqlServerPool.request()
        .input('username', sql.NVarChar, username)
        .query('SELECT * FROM users WHERE username = @username');
      sqlServerDuplicate = sqlServerResult.recordset.length > 0;
    }

    if (mysqlDuplicate || sqlServerDuplicate) {
      return res.status(409).json({ error: 'Username already taken.' })
    }

    // Hash & store
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    let insertId = null;

    // Insert into MySQL
    if (global.mysqlConnection) {
      const [result] = await global.mysqlConnection.query(
        'INSERT INTO users (username, password) VALUES (?, ?)', 
        [username, hashedPassword]
      );
      insertId = result.insertId;
    }

    // Insert into SQL Server
    if (global.sqlServerPool) {
      await global.sqlServerPool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, hashedPassword)
        .query('INSERT INTO users (username, password) VALUES (@username, @password)');
    }

    const newUser = {
      id: insertId || Date.now(),
      username
    }

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.status(201).json({
      message: 'Registration successful!',
      user: { id: newUser.id, username: newUser.username },
      token,
    })
  } catch (err) {
    console.error('Register error:', err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
})

/**
 * POST /api/login
 * Body: { username, password }
 */
app.post('/api/login', async (req, res) => {
  try {
    // Support lenient parsing: some clients may send double-encoded/escaped JSON.
    let username = req.body && req.body.username;
    let password = req.body && req.body.password;

    // If fields missing, attempt to recover from rawBody (e.g. escaped JSON string)
    if ((!username || !password) && req.rawBody) {
      try {
        let raw = String(req.rawBody).trim();
        // If payload is a quoted JSON string, unwrap it
        if (raw.startsWith('"') && raw.endsWith('"')) {
          raw = raw.slice(1, -1);
        }
        // Unescape common escape sequences produced by naive clients
        raw = raw.replace(/\\n/g, '')
                 .replace(/\\r/g, '')
                 .replace(/\\t/g, '')
                 .replace(/\\\"/g, '"')
                 .replace(/\\\\/g, '\\');

        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          username = username || parsed.username;
          password = password || parsed.password;
          console.warn('Recovered login payload from rawBody')
        }
      } catch (parseErr) {
        console.warn('Could not recover login payload from rawBody:', parseErr.message)
      }
      // If still missing, try parsing as urlencoded form data
      if ((!username || !password) && req.rawBody) {
        try {
          const raw = String(req.rawBody).trim();
          if (raw.includes('=') && raw.includes('&')) {
            const params = new URLSearchParams(raw);
            username = username || params.get('username');
            password = password || params.get('password');
            if (username || password) console.warn('Recovered login payload from urlencoded rawBody')
          }
        } catch (urlErr) {
          // ignore
        }
      }
    }

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' })
    }

    if (!global.mysqlConnection && !global.sqlServerPool) {
      return res.status(503).json({ error: 'No database available. Please try again later.' })
    }

    // Query available databases
    let userFromMySQL = null;
    let userFromSQLServer = null;

    if (global.mysqlConnection) {
      const [rows] = await global.mysqlConnection.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length > 0) userFromMySQL = rows[0];
    }

    if (global.sqlServerPool) {
      const sqlServerResult = await global.sqlServerPool.request()
        .input('username', sql.NVarChar, username)
        .query('SELECT * FROM users WHERE username = @username');
      if (sqlServerResult.recordset.length > 0) userFromSQLServer = sqlServerResult.recordset[0];
    }

    const user = userFromMySQL || userFromSQLServer;

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' })
    }

    let isMatch = false;

    // Check if password stored in DB is a bcrypt hash (starts with $2a$, $2b$, or $2y$)
    if (user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$'))) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Fallback for manually inserted accounts with plain-text passwords
      if (password === user.password) {
        isMatch = true;
        
        // Auto-upgrade: Hash the plain-text password and save it back to both DBs
        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash(password, salt);
        user.password = newHash; // Update object so sync logic below inserts the hashed version

        // Update MySQL
        if (userFromMySQL && global.mysqlConnection) {
          await global.mysqlConnection.query('UPDATE users SET password = ? WHERE username = ?', [newHash, user.username]);
        }
        // Update SQL Server
        if (userFromSQLServer && global.sqlServerPool) {
          await global.sqlServerPool.request()
            .input('username', sql.NVarChar, user.username)
            .input('password', sql.NVarChar, newHash)
            .query('UPDATE users SET password = @password WHERE username = @username');
        }
      }
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' })
    }

    // --- Synchronization ---
    // If user is only in one DB, copy them to the other to keep them in sync
    if (userFromMySQL && !userFromSQLServer && global.sqlServerPool) {
      await global.sqlServerPool.request()
        .input('username', sql.NVarChar, user.username)
        .input('password', sql.NVarChar, user.password)
        .query('INSERT INTO users (username, password) VALUES (@username, @password)');
    } else if (userFromSQLServer && !userFromMySQL && global.mysqlConnection) {
      await global.mysqlConnection.query(
        'INSERT INTO users (username, password) VALUES (?, ?)', 
        [user.username, user.password]
      );
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.json({
      message: 'Login successful!',
      user: { id: user.id, username: user.username },
      token,
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
})

/**
 * GET /api/health
 */
app.get('/api/health', (_req, res) => {
  // Return a simple health check. Avoid referencing the removed in-memory `users` array.
  res.json({ status: 'ok' })
})

// Friendly root route so visiting http://localhost:3001/ is informative
app.get('/', (_req, res) => {
  res.send(`<html><head><meta charset="utf-8"><title>VIBIO Backend</title></head><body style="font-family:system-ui,Segoe UI,Arial,sans-serif;padding:24px;"><h1>VIBIO Backend</h1><p>API is available under <a href="/api/health">/api/health</a>.</p><p>If you're developing locally, run the frontend dev server at <a href="http://localhost:5174">http://localhost:5174</a>.</p></body></html>`)
})

// ——— Start ———
app.listen(PORT, async () => {
  console.log(`\n  🎬 VIBIO Server running at http://localhost:${PORT}\n`)
  
  // Initialize Database Connections gracefully – keep running even if one/both DBs are unavailable
  try {
    global.mysqlConnection = await connectMySQL();
  } catch (err) {
    console.warn('⚠️ MySQL is not available. Server will run without MySQL.');
    global.mysqlConnection = null;
  }

  try {
    global.sqlServerPool = await connectSQLServer();
  } catch (err) {
    console.warn('⚠️ SQL Server is not available. Server will run without SQL Server.');
    global.sqlServerPool = null;
  }

  if (!global.mysqlConnection && !global.sqlServerPool) {
    console.error('❌ No database connections available. Server will respond to requests but auth will fail.');
  }
})
