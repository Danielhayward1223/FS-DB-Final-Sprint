const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StardewVillagers',
  password: 'Keyin2021',
  password: 'password',
  port: 5432,
});

module.exports = pool;
