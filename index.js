// Import modules needed for express server.
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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

// Import the functions needed for the server

const { findUserByUsername } = require("./services/m.logins.dal");

/* Set up session using express-session middleware for easier session management */

server.use(
	session({
		secret: "stardew-key" /* Create a secret key for the session */,
		resave: false /* Resave the session if it is modified */,
		saveUninitialized: false /* Save the session if it is new */,
	})
);

/*  Define Passport Local Strategy using the Passport module */
/*  Initialize the passport  */
server.use(passport.initialize());
server.use(passport.session());

passport.use(
	new LocalStrategy(async (username, password, done) => {
		/* Create a new instance of LocalStrategy, received user and password */
		try {
			const user = await findUserByUsername(
				username
			); /* Calls the findUserByUsername function */
			if (!user) {
				/*  (user) check to see if user was found, if not found it calls the done callback with null, false and an error message. */
				return done(null, false, { message: "Incorrect username." });
			}
			if (!(await validatePassword(user, password))) {
				/* Calls the validatePassword function, which essentially does the same as the conditional above, instead checks to see if the provided password
			matches a password within the data base. */
				return done(null, false, { message: "Incorrect password." });
			}
			return done(
				null,
				user
			); /*  If both entries exist the callback function is called with null, and the user object.  */
		} catch (err) {
			/* If an error occurs during the try block, a done callback is called with the error object */
			return done(err);
		}
	})
);

passport.serializeUser((user, done) => {
	/*  Serialize the user object, reduces the amount of data that is stored. */
	done(
		null,
		user._id
	); /*  Calls the done callback with null and the user object's id */
});

passport.deserializeUser(async (id, done) => {
	/*  Deserialize the user object */
	try {
		const user = await findUserById(id); /*  Calls the findUserById function */
		done(
			null,
			user
		); /*  Calls the done callback with null and the user object */
	} catch (err) {
		/*  If an error occurs during the try block, a done callback is called with the error object */
		done(err);
	}
});

/*  Create a GET route for the login EJS */
server.get("/login", (req, res) => {
	res.render("logins", { error: req.query.error });
});

/*  Set up post for the login page, that allows a redirect to the search if Login can be validated */
server.post("/login", async (req, res) => {
	try {
		const user = await findUserByUsername(req.body.username);
		if (!user) {
			return res.redirect("/login?error=Incorrect username.");
		}
		const validPassword = await validatePassword(user, req.body.password);
		if (!validPassword) {
			return res.redirect("/login?error=Incorrect password.");
		}
		res.redirect("/search");
	} catch (err) {
		console.error(err);
		res.redirect("/login");
	}
});

// Define route for the homepage

/* findGiftsByName function import from (m.characters.dal) */

const { findGiftsByName } = require("./services/m.characters.dal");

const Villager = require("./services/villagerDAL");

/* Search route being defined */
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
	try {
		const name = req.params.name;
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
