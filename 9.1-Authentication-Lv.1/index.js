import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Pedaret1382",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const dup = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    if (dup.rows.length > 0) {
      console.log("User already exists");
      res.render("login.ejs");
    } else {
      const result = await db.query(
        "INSERT INTO users(email,password) VALUES ($1,$2)",
        [email, password]
      );
      res.render("secrets.ejs");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const result = await db.query(
      "SELECT password FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length > 0) {
      if (result.rows[0].password === password) {
        console.log("Welcome");
        res.render("secrets.ejs");
      } else {
        console.log("password incorrect");
        res.render("login.ejs");
      }
    } else {
      console.log("no such user exists");
      res.render("register.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
