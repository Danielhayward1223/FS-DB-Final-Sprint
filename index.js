// Import modules needed for express server.
const express = require("express");
const methodOverride = require("method-override");

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

const Villager = require("./services/villagerDAL");

/* Search route being defined */
server.get("/search", async (req, res) => {
    const name = req.query.name;
    const db = req.query.db;
    let result;

    if (db === 'mongo') {
        result = await findGiftsByName(name);
        console.log('findGiftsByName result:', result);
        console.log('results to be sent to EJS:', result);
    } else if (db === 'postgres') {
        const villager = await Villager.findByName(name);
        result = {
            name: villager.name,
            birthday: villager.birthday,
            gifts: {
                loves: villager.loves,
                likes: villager.likes,
                dislikes: villager.dislikes,
                hates: villager.hates,
            },
        };
        console.log('findByName result:', result);
    }

    const logEntry = `Search query: ${name}, Database: ${db}, Results: ${result ? result.length : 0}, Gifts: ${JSON.stringify(result ? result.gifts : {})}\n`;
    fs.appendFile("search_logs.txt", logEntry, (err) => {
        if (err) {
            console.error("Error logging search:", err);
        }
    });

    if (result) {
        res.render('results.ejs', { results: result });
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
