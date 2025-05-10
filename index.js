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
        
        let comparation = list.rows == 0
        ? (() => {
            res.send(` `);
        })()
        : list.rows > 0 ? (() => {
            res.send(list.rows);
            console.log(list.rows);
        })()
        : (() => {
            console.error(`error`);
        })();
    }
    catch (err) {
        res.send(err);
        console.error(err);
    }
});


app.get("/deletar", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/formD.html"))
})


app.post("/gerenciarD", async (req, res) => {
    try {
        const idd = parseInt(req.body.idd);

        await client.query(`DELETE FROM todolist WHERE id = $1`, [idd]);

        console.log(`The task where id is ${idd} is deleted`);
        res.send(`The task where id is ${idd} is deleted`);
    }
    catch (err) {
        console.error(err);
    }
})
app.listen(3030);