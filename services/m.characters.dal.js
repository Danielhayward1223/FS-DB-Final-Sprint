/* Set requirement constants for Stardew Characters */

const { ObjectId } = require("mongodb");
const dal = require("./m.auth_db");

/* Set the collection name */

const collection = "Characters";

/* Create functions to allow the Client to search by Character name to find gifts using REGEX*/

async function findGiftsByName(name) {
	console.log("Searching for gifts for " + name + "...");
	const filter = { name: { $regex: new RegExp(`^${name}$`, "i") } };
	try {
		const result = await dal.collection(collection).findOne(filter);
		console.log("Result:", result);
		return result;
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
}

module.exports = { findGiftsByName };
