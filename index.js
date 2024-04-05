// Import modules needed for express server.
const express = require("express");
const methodOverride = require("method-override");

const Villager = require('./services/villagerDAL');

const env = require('dotenv').config();


// Initialize express server
const server = express();
const PORT = 3000;

/*  Setup Debugging (Global) */
global.DEBUG = true;

// Set view engine
server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(express.json());


// Define route for the homepage


/* findGiftsByName function import from (m.characters.dal) */

const { findGiftsByName } = require("./services/m.characters.dal");


/* Search route being defined */
server.get("/search", async (req, res) => {
  const name = req.query.name;
  const db = req.query.db;

  if (name && db) {
    let result = [];

    if (db === 'mongo') {
      result = await findGiftsByName(name);
      console.log('findGiftsByName result:', result);  /* Debug and Log to see if Data is being displayed from Function */
      console.log('results to be sent to EJS:', result); /* Debug and Log to see if Data is going through to EJS */
    } else if (db === 'postgres') {
      result = await Villager.findByName(name);
      console.log('findByName result:', result);  /* Debug and Log to see if Data is being displayed from Function */
      console.log('results to be sent to EJS:', result); /* Debug and Log to see if Data is going through to EJS */
    }

    res.render('results.ejs', { results: result }); /*  Render the results to the EJS file */
  } else {
    res.render("search");
  }
});

// Define the output of the server

server.get("/", (req, res) => {
  res.render("index.ejs");
});


// Define route for viewing a specific villager
server.get("/villagers/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const villager = await Villager.findByName(name);
    if (villager) {
      res.render("result.ejs", { villager });
    } else {
      res.status(404).send("Villager not found");
    }
  } catch (error) {
    console.error("Error retrieving villager:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Start the express server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

