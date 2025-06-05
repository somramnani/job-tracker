const mysql = require("mysql2");

if (process.env.NODE_ENV === "test") {
  module.exports = {
    query: jest.fn(),
  };
} else {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) throw err;
    console.log("DB connected");
  });

  module.exports = db;
}
