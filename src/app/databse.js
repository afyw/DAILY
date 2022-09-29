const mysql = require('mysql2');

const config = require('./config');
// 数据库的连接
const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
});

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log('数据库连接失败~');
    } else console.log('数据库连接成功~');
  });
});

module.exports = connections.promise();
