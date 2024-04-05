const pool = require('./dbConfig');

const Villager = {
  async findByName(name) {
    console.log("Searching for villager with name:", name, "...");
    const query = 'SELECT * FROM villagers WHERE name = $1';
    try {
      const { rows } = await pool.query(query, [name]);
      return rows[0]; 
    }
    catch (error) {
      console.error("Error:", error);
    }
  },
};

module.exports = Villager;

