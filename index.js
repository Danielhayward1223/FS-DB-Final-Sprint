// Import modules needed for express server.
const express = require("express");
const methodOverride = require("method-override");

const Villager = require("./services/villagerDAL");

const env = require("dotenv").config();

const fs = require("fs");

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

		if (db === "mongo") {
			result = await findGiftsByName(name);
		} else if (db === "postgres") {
			result = await Villager.findByName(name);
		}

		// Log search query
		// Log search query
		const logEntry = `Search query: ${name}, Database: ${db}, Results: ${
			result ? JSON.stringify(result.gifts) : "undefined"
		}\n`;
		fs.appendFile("search_logs.txt", logEntry, (err) => {
			if (err) {
				console.error("Error logging search:", err);
			}
		});

		res.render("results.ejs", { results: result });
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
