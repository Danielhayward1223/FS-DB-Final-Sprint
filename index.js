// Import modules needed for express server.
const express = require("express");
const methodOverride = require("method-override");

// Initialize express server
const server = express();
const PORT = 3000;

// Set view engine
server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(express.json());

// Define the output of the server
server.get("/", (req, res) => {
  res.render("index.ejs");
});

// Start the express server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
