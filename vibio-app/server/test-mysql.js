const mysql = require('mysql');

const config = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  // Align test password with server/db.js to avoid accidental mismatches
  password: 'Hieuthi22032005',
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error('❌ Failed. Error:', err.code, err.message);
    return;
  }
  console.log('✅ Success with mysql legacy driver!');
  connection.end();
});
