import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  const d = new Date("September 27  , 2024 11:13:00");
  let day = d.getDay();
  let type = "a week day";
  let quote = "it's time to work hard.";
  if (day === 0 || day === 6) {
    type = "it's the weekend";
    quote = "time to have fun";
  }
  res.render("index.ejs", {
    daytype: type,
    advice: quote,
  });
});

app.listen(port, () => {
  console.log(`the server is running on port ${port}.`);
});
