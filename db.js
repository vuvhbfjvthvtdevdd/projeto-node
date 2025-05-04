const { Client } = require('pg');
require('dotenv').config()

const client = new Client({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 5432,
    password: process.env.DB_PASSWORD,
})

client.connect()
.then(() => console.log('Connection whith database is sucefully.'))
.catch((err) => console.error(err));


module.exports = client;
