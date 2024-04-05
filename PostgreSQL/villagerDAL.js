const pool = require('./dbConfig');

const Villager = {
  async findByName(name) {
    const query = 'SELECT * FROM villagers WHERE name = $1';
    const { rows } = await pool.query(query, [name]);
    return rows[0]; 
  },

  async findGiftsByNameFromPostgres(name) {
    try {
      const query = 'SELECT * FROM gifts WHERE name = $1';
      const { rows } = await pool.query(query, [name]);
      return rows;
    } catch (error) {
      console.error('Error finding gifts by name:', error);
      return [];
    }
  }
};

module.exports = Villager;
