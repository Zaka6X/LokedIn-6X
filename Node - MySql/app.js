const express = require('express');
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Serve static files from the "public" directory
const publicPath = path.join(__dirname, '../');
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'html');

db.connect((e) => {
    if (e) {
        console.log(e);
    } else {
        console.log("Database Connected!");
    }
});

// Serve index.html on the root route
app.get("/", (req, res) => {
    res.render('index');
});

//Define routes
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);
const examRouter = require('./routes/exam');
app.use('/auth', examRouter);

app.listen(4000, () => {
    console.log("Server Started on Port 4000");
});