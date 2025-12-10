const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  host: "localhost",
  user: "postgres",      // PostgreSQL username
  password: "",
  database: "texttospeech",  // your database
  port: 5432,
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rows.length > 0) res.json("login successful");
    else res.json("no record");
  } catch (err) {
    console.error(err);
    res.json("error");
  }
});

// REGISTER
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.json("User already exists");
    }

    // Insert new user
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
    res.json("registration successful");
  } catch (err) {
    console.error(err);
    res.json("error");
  }
});

app.listen(8081, () => console.log("Server running on port 8081"));
