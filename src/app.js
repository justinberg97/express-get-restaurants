const express = require("express");
const restaurantsRoutes = require("../routes/restaurants");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/restaurants", restaurantsRoutes);

module.exports = app;
