// Import modules needed for express server.
const express = require("express");
const methodOverride = require("method-override");
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
      /*  BECK add Postgres Function here */
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


// Start the express server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
