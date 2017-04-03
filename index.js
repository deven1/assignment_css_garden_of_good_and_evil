const express = require('express');
const app = express();

// Set up form body parsing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));



// Set up cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());


// Set up handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use((req, res, next) => {
  app.locals.radio_selection = req.cookies.radio_selection;
  next();
});


// Route handlers
app.get("/", (req, res) => {
  //const { cart } = req;
  let { radio_selection, food_selection, color_selection } = req.cookies;
  // if (!radio_selection) radio_selection = "Neutral";
  res.render("index", {radio_selection, food_selection, color_selection});
});

app.post("/changeProp", (req, res) => {
  console.log(req.body);
  if (req.cookies.radio_selection && !req.body.radio_selection) {
    res.cookie("radio_selection", req.cookies.radio_selection);
  } else {
    res.cookie("radio_selection", req.body.radio_selection);
  }
  if (req.cookies.food_selection && !req.body.food_selection) {
    res.cookie("food_selection", req.cookies.food_selection);
  } else {
    res.cookie("food_selection", req.body.food_selection);
  }
  if (req.cookies.color_selection && !req.body.color_selection) {
    res.cookie("color_selection", req.cookies.color_selection);
  } else {
    res.cookie("color_selection", req.body.color_selection);
  }
  res.redirect("back");
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("Listening!");
});
