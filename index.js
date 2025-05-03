const express = require('express');
const app = express();
const { Pool } = require('pg');


const pool = new Pool({
    user: `vuvhbfjvthvt`,
    database: `hipo`,
    host: `localhost`,
    password: `123901901abc`,
    port: 5432,
});

async function Conectar() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Conexão bem sucedida');
        console.log('Horario: ', res.rows[0].now);
        await pool.end();
    }
    catch (err) {
        console.error('conexão mal sucedida');
    }
}

Conectar();