const mysql = require('mysql2/promise');
const sql = require('mssql');
const { connectMySQL, connectSQLServer } = require('./db');

async function initMySQL() {
  console.log('Initializing MySQL Database...');
  const conn = await connectMySQL();
  if (!conn) return;

  try {
    // 1. Create Users Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ MySQL: "users" table created.');

    // 2. Create Categories Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT
      )
    `);
    console.log('✅ MySQL: "categories" table created.');

    // 3. Create Movies Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        poster_url VARCHAR(500),
        video_url VARCHAR(500),
        rating DECIMAL(3, 1),
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ MySQL: "movies" table created.');

  } catch (err) {
    console.error('❌ MySQL Init Error:', err.message);
  } finally {
    await conn.end();
  }
}

async function initSQLServer() {
  console.log('\nInitializing SQL Server Database...');
  const pool = await connectSQLServer();
  if (!pool) return;

  try {
    // 1. Create Users Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U')
      CREATE TABLE users (
          id INT IDENTITY(1,1) PRIMARY KEY,
          username NVARCHAR(255) NOT NULL UNIQUE,
          password NVARCHAR(255) NOT NULL,
          createdAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✅ SQL Server: "users" table created.');

    // 2. Create Categories Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='categories' and xtype='U')
      CREATE TABLE categories (
          id INT IDENTITY(1,1) PRIMARY KEY,
          name NVARCHAR(100) NOT NULL UNIQUE,
          description NVARCHAR(MAX)
      )
    `);
    console.log('✅ SQL Server: "categories" table created.');

    // 3. Create Movies Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='movies' and xtype='U')
      CREATE TABLE movies (
          id INT IDENTITY(1,1) PRIMARY KEY,
          category_id INT,
          title NVARCHAR(255) NOT NULL,
          description NVARCHAR(MAX),
          poster_url NVARCHAR(500),
          video_url NVARCHAR(500),
          rating DECIMAL(3, 1),
          CONSTRAINT FK_Movies_Categories FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ SQL Server: "movies" table created.');

  } catch (err) {
    console.error('❌ SQL Server Init Error:', err.message);
  } finally {
    await pool.close();
  }
}

async function run() {
  await initMySQL();
  await initSQLServer();
  console.log('\n✅ Database Initialization Complete.');
  process.exit(0);
}

run();
