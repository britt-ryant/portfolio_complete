const express = require('express');
const bodyParser = require('body-parser');
const colors = require ('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 5000;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "shsid107001",
    database: "ryan_db"
})
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));



app.get('/api/hello', (req, res) => {
    res.send({ express: "Hello from express!"});
});

app.listen(port, () => console.log(`Server Up and Running, listening on PORT ${port}`.green.bold))