const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
})

client.connect()
.then(() => console.log('conexão do banco bem sucedida'))
.catch(err => console.error(err));

module.exports = client;