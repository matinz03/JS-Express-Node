import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/submit", (req, res) => {
  var bandname = req.body["street"] + req.body["pet"] + "😀";
  res.send("<h1> Your band name is :</h1> <h2>" + bandname + "</h2>");
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
