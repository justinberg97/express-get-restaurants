const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get('/restaurants', async (req, rest) => {
    const restaurants = await Restaurant.findAll({});
    rest.json(restaurants);
})



module.exports = app;