const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forecast");

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
    name: "Guan He"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Guan He"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "Do you need help?",
    name: "Guan He"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      err: "Your must provide an address"
    });
  }

  geocode(req.query.address, (err, { longitude, latitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }

    forcast(latitude, longitude, (err, data) => {
      if (err) {
        return res.send({ err });
      }

      data.location = location;
      data.address = req.query.address;
      res.send(data);
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      err: "You must provide a search term"
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "Help article not found",
    name: "Guan He"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "Page not found",
    name: "Guan He"
  });
});

app.listen(3000, () => {
  console.log("Server is up on http://localhost:3000");
});
