const express = require('express');
const app = express();
const path = require('path');
const client = require('./db');


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.post("/gerenciar", async (req, res) => {
    const tarefa = req.body.tarefa;

    try {
        await client.query(`INSERT INTO todolist (task) VALUES ($1)`, [tarefa]);
        res.send(`task ${tarefa} added in your to do list`);
        console.log(`task ${tarefa} added in your to do list`);
    }
    catch (err) {
        res.send(err);
        console.error(err);
    }
});


app.get("/lista", async (req, res) => {
    try {
        const list = await client.query(`SELECT * FROM todolist`);
        res.send(list.rows);
        console.log(list.rows);
    }
    catch (err) {
        res.send(err);
        console.error(err);
    }
});

app.listen(3030);