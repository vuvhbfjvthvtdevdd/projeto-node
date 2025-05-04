const express = require('express');
const app = express();
const path = require('path');
const client = require('./dbc');


app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})


app.post("/enviar", async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        await client.query(`INSERT INTO login (usuario, senha) VALUES ($1, $2)`, [usuario, senha]);
        res.send(`usuario ${usuario} adicionado no banco de dados`);
    }
    catch (err) {
        console.error(err)
    }
})


app.listen(3030);