import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Pedaret1382",
  port: "5432",
});
let list = [];
app.post("/add", async (req, res) => {
  const name = req.body["country"];
  db.connect();
  try {
    const result = await db.query(
      `SELECT country_code FROM world WHERE country_name = $1`,
      [name]
    );
    result.rows.forEach((country) => {
      list.push(country.country_code); // Adjust field to match the returned value
    });
    console.log(list);
  } catch (error) {
    console.error(error);
  } finally {
    db.end();
  }

  res.redirect("/");
});

app.get("/", async (req, res) => {
  //   db.connect();
  //   const result = await db.query("SELECT country FROM visited_countries");
  //   result.rows.forEach((country) => {
  //     list.push(country.country);
  //   });
  //   console.log(list);

  res.render("index.ejs", { countries: list, total: list.length });
  // db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
