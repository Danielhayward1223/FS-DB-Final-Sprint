const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StardewVillagers',
  password: 'Keyin2021',
  port: 5432,
});

module.exports = pool;
