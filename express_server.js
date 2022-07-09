const express = require("express");
const app = express();
const PORT = 8080;

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//Function to generate a random string of input length to be used as shortURL
const generateRandomString = function(length) {
  const characters = 'ABCDEFGHIKJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = "";
  const range = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * range));
  }
  return result;
};

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  console.log("Received redirect");
  if(!urlDatabase[shortURL]) {
    console.log("Not Found");
    res.status(404).send("NOT FOUND");
    return;
  }
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

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

app.post("/urls", (req, res) => {
  let longURL = req.body.longURL;
  if(!longURL.startsWith("http://") && !longURL.startsWith("https://")){
    longURL = "http://" + longURL;
  }
  const shortURL = generateRandomString(6);
  urlDatabase[shortURL] = longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});