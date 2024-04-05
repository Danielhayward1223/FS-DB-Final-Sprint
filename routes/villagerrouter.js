const express = require('express');
const router = express.Router();
const Villager = require('../services/villagerDAL');

server.get("/villagers/:name", async (req, res) => {
    const name = req.params.name;
    try {
      const villager = await Villager.findByName(name);
      if (villager) {
        res.render("villager.ejs", { villager });
      } else {
        res.status(404).send("Villager not found");
      }
    } catch (error) {
      console.error("Error retrieving villager:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;
