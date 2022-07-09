const express = require("express");
const app = express();
const PORT = 8080;

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.set("view engine", "ejs");

app.get("/urls/:id", (req, res) => {
  const id = req.params.id;
  const templateVars = {
    id,
    longURL: urlDatabase[id]};
  res.render("urls_show", templateVars);
});

app.get("/urls", (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.get("/", (req,res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});