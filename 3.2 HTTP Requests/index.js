import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/about", (req, res) => {
  res.send("<h1>this page is about nothing </h1>");
});
app.get("/contact", (req, res) => {
  res.send("<h1>989211075192</h1>");
});

app.listen(port, () => {
  console.log(`The server is running on Port ${port}.`);
});
