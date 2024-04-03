// Import modules needed for express server.
const express = require("express");
const methodOverride = require("method-override");
const Villager = require('./PostgreSQL/villagerDAL');

// Initialize express server
const server = express();
const PORT = 3000;

// Set view engine
server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(express.json());

// Define route for the homepage
server.get("/", (req, res) => {
  res.render("index.ejs");
});

// Define route for viewing a specific villager
server.get("/villagers/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const villager = await Villager.findByName(name);
    if (villager) {
      res.render("test.ejs", { villager });
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

