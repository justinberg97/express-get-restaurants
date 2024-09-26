const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Restaurant = require("../models/index");

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

router.post("/", 
    [
        check("name").notEmpty().withMessage("Name cannot be empty."),
        check("location").notEmpty().withMessage("Location cannot be empty."),
        check("cuisine").notEmpty().withMessage("Cuisine cannot be empty."),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const restaurant = await Restaurant.create(req.body);
        const restaurants = await Restaurant.findAll();
    res.json(restaurants)    
}
);;

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
