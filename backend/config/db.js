
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",        // your MySQL username
  password: "Shreehari#27", // your MySQL password
  database: "leavemanagement"
});

connection.connect(err => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

export default connection;
