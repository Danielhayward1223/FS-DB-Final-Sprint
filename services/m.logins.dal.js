/* Creating the Logins DAL for the search engine */

const { ObjectId } = require("mongodb");
const dal = require("./m.auth_db");
const bcrypt = require("bcrypt");


async function findUserByUsername(username) {
    console.log("Searching for user with username:", username, "...");
    const filter = { username: { $regex: new RegExp(`^${username}$`, "i") } };
    try {
        const result = await dal.collection("Users").findOne(filter);
        console.log("Result:", result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

async function validatePassword(user, password) {
    const match = await bcrypt.compare(password, user.password);
    return match;
}


module.exports = { findUserByUsername, validatePassword };