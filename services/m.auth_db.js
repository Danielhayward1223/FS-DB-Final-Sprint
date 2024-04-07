/*  Creating the Authentification for MongoDB */

/* Import Requirements */
const { MongoClient } = require("mongodb");
require('dotenv').config();

/* Create MDB Local Environment for MDB instance */
const uri = process.env.MDBLOCAL;

/* Create instance for MongoClient using the client constant. */
const client = new MongoClient(uri);

client.connect();

if (DEBUG) console.log("Connection to MongoDB established...");
const dal = {
	collection: function (collection) {
		return client.db().collection(collection);
	},
};

module.exports = dal;
