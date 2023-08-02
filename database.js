const { Pool } = require('pg')
const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DB,
        password: process.env.PG_PASS,
        port: 5432,
})
const client = pool;

module.exports = client;