const express = require('express');
const router = express.Router();
const Villager = require('../villagerDAL');

router.get('/villagers/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const villager = await Villager.findByName(name);
    if (villager) {
      res.render('villager', { villager }); // Render the villager details in a view template
    } else {
      res.status(404).send('Villager not found');
    }
  } catch (error) {
    console.error('Error retrieving villager:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
