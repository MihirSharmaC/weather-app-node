const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const chalk = require("chalk");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mihir Sharma",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mihir Sharma",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Mihir Sharma",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      success: false,
      message: "no search param provided",
    });
  } else {
    res.send({
      products: {
        key: req.query.key,
        search: req.query.search,
        name: req.query.name,
      },
    });
  }
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      success: false,
      message: "no address param provided",
    });
  } else {
    geocode(req.query.address, (err, response) => {
      if (!response) {
        res.send({
          message: "Failed to fetch data",
          return: response,
        });
      } else {
        forecast(response.long, response.lat, (error, data) => {
          if (err) {
            res.send({
              message: "Something went wrong",
            });
          } else {
            res.send({
              forecast: data.weather.weather_descriptions[0],
              temp: data.weather.temperature,
              location: data.loc,
            });
          }
        });
      }
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mihir Sharma",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mihir Sharma",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
