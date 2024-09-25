const express = require("express");
const router = express.Router();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.findAll({});
  res.json(restaurants);
});

router.get("/:id", async (req, res) => {
  const number = req.params.id;
  const restaurant = await Restaurant.findByPk(number);
  res.json(restaurant);
});

router.post("/", async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.json(restaurant);
});

router.put("/:id", async (req, res) => {
  const updatedRest = await Restaurant.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedRest);
});
router.delete("/:id", async (req, res) => {
  const deletedRest = await Restaurant.destroy({
    where: { id: req.params.id },
  });
  res.json(deletedRest);
});

module.exports = router;
