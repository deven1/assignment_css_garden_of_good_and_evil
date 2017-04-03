const express = require('express');
const app = express();
const exphbs = require("express-handlebars");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");



// Set up form body parsing

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));



// Set up cookies

app.use(cookieParser());



// Set up handlebars

app.engine("handlebars", exphbs({
  defaultLayout: "main",

  //using npm package https://www.npmjs.com/package/handlebars-helper-equal
  //to compare properties in handlebars template
  helpers: { equal: require("handlebars-helper-equal") }
}));

app.set("view engine", "handlebars");

app.use((req, res, next) => {
  app.locals.radio_selection = req.cookies.radio_selection;
  if (req.cookies.slider_selection < 40) {
    app.locals.font_selection = "low_insanity"
  } else if (req.cookies.slider_selection > 60) {
    app.locals.font_selection = "high_insanity"
  }
  next();
});


// Route handlers
app.get("/", (req, res) => {

  let { radio_selection, food_selection, color_selection, slider_selection } = req.cookies;

  res.render("index", {radio_selection, food_selection, color_selection, slider_selection});
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
  if (req.cookies.slider_selection && !req.body.slider_selection) {
    res.cookie("slider_selection", req.cookies.slider_selection);
  } else {
    res.cookie("slider_selection", req.body.slider_selection);
  }
  //_prePopulate(radio_selection);
  res.redirect("back");
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("Listening!");
});
