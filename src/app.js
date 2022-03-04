const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicPath)); //allows access to all files in the given path which is public here.

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Naman",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Naman",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    dude: "Nibba",
    helpText: "This is indeed some very helpful text,lol!",
    title: "Help Page",
    name: "Naman",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a location.",
    });
  }
  geocode(req.query.address, (error, { location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(location, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help article not found",
    title: "Help 404",
    name: "Naman",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "Error:404, page not found",
    title: "Page not found",
    name: "Naman",
  });
});

app.listen(3000, () => {
  console.log(`The server is running on port 3000`);
});
