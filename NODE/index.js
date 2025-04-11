const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const server = express();
const publicPath = path.join(__dirname, '..', 'HTML-FILES');
server.use('/css', express.static(path.join(__dirname, '..', 'CSS-FILES')));
server.use('/js', express.static(path.join(__dirname, '..', 'JAVA_SCRIPT-FILES')));
server.use('/xtras', express.static(path.join(__dirname,'..', 'XTRAS')));
server.use('/', express.static(path.join(__dirname, '..', 'HTML-FILES')));

server.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'INTERFACE-PAGE.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'HTML-FILES', 'LOGIN-PAGE.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'HTML-FILES', 'LOGIN-PAGE.html'));
});

app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'HTML-FILES', 'ADMIN-LOGIN-PAGE.html'));
});

app.get('/interface', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'HTML-FILES', 'INTERFACE-PAGE.html'));
});

app.get('/cricket', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'HTML-FILES', 'CRICKET-TOURNAMENTS.html'));
});

mongoose.connect("mongodb://127.0.0.1:27017/sports")
.then(()=>console.log("Launched"))
.catch(()=>console.log("ERROR"));


const admin = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const admincred = mongoose.model("AdminID", admin);

server.listen(8000, console.log("Server Started"));
