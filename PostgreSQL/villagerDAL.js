const pool = require('./dbConfig');

const Villager = {
  async findByName(name) {
    const query = 'SELECT * FROM villagers WHERE name = $1';
    const { rows } = await pool.query(query, [name]);
    return rows[0]; // Return the first row (if found) or undefined
  },
};

module.exports = Villager;
