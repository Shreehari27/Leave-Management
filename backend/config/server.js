import express from "express";
import mysql from "mysql2/promise";   // use promise wrapper
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",              // your MySQL username
  password: "Shreehari#27",  // your MySQL password
  database: "leavemanagement",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ API: Apply Leave
app.post("/apply-leave", async (req, res) => {
  const { employee_id, from_date, to_date, reason } = req.body;

  if (!employee_id || !from_date || !to_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Step 1: Check if employee exists
    const [employeeRows] = await connection.query(
      "SELECT * FROM employees WHERE id = ?",
      [employee_id]
    );

    let employee;
    if (employeeRows.length === 0) {
      // create employee with default 20 leaves
      await connection.query(
        "INSERT INTO employees (id, name, available_leaves) VALUES (?, ?, ?)",
        [employee_id, `Employee_${employee_id}`, 20]
      );
      const [newEmployeeRows] = await connection.query(
        "SELECT * FROM employees WHERE id = ?",
        [employee_id]
      );
      employee = newEmployeeRows[0];
    } else {
      employee = employeeRows[0];
    }

    // Step 2: Check available leaves
    if (employee.available_leaves <= 0) {
      await connection.rollback();
      return res.status(400).json({ error: "No leaves available" });
    }

    // Step 3: Validate dates
    const from = new Date(from_date);
    const to = new Date(to_date);
    if (from > to) {
      await connection.rollback();
      return res.status(400).json({ error: "From date must be before To date" });
    }

    const leaveDays =
      Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;

    if (leaveDays > employee.available_leaves) {
      await connection.rollback();
      return res.status(400).json({ error: "Not enough leave balance" });
    }

    // Step 4: Insert into leaves table
    await connection.query(
      "INSERT INTO leaves (employee_id, from_date, to_date, reason, status) VALUES (?, ?, ?, ?, 'PENDING')",
      [employee_id, from_date, to_date, reason || null]
    );

    // Step 5: Update employee available leaves
    await connection.query(
      "UPDATE employees SET available_leaves = available_leaves - ? WHERE id = ?",
      [leaveDays, employee_id]
    );

    await connection.commit();
    res.json({ message: "Leave applied successfully", status: "PENDING" });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Error applying leave:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) connection.release();
  }
});

// ✅ Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
