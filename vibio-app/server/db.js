const mysql = require('mysql2/promise');
const sql = require('mssql');

// ==========================================
// MySQL Connection
// ==========================================
const mysqlConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Hieuthi22032005', // Mật khẩu khớp với ảnh chụp của bạn
  database: 'VIBIO'
};

async function connectMySQL() {
  try {
    const connection = await mysql.createConnection(mysqlConfig);
    console.log('✅ Connected to MySQL Database successfully!');
    return connection;
  } catch (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
    // Re-throw so callers (server startup) can handle the failure explicitly
    throw err;
  }
}

// ==========================================
// SQL Server Connection
// ==========================================
const sqlServerConfig = {
  server: 'localhost',
  port: 1433,
  database: 'VIBIO',
  user: 'sa',
  password: '123456',
  options: {
    trustServerCertificate: true,
    encrypt: false
  }
};

async function connectSQLServer() {
  try {
    const pool = new sql.ConnectionPool(sqlServerConfig);
    await pool.connect();
    console.log('✅ Connected to SQL Server (VIBIO) successfully!');
    return pool;
  } catch (err) {
    console.error('❌ Failed to connect to SQL Server:', err.message);
    // Re-throw so callers (server startup) can handle the failure explicitly
    throw err;
  }
}

module.exports = {
  connectMySQL,
  connectSQLServer
};
