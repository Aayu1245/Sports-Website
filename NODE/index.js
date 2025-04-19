const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const server = express();
const publicPath = path.join(__dirname, '..', 'HTML-FILES');
server.use(express.json());
server.use('/css', express.static(path.join(__dirname, '..', 'CSS-FILES')));
server.use('/js', express.static(path.join(__dirname, '..', 'JAVA_SCRIPT-FILES')));
server.use('/xtras', express.static(path.join(__dirname,'..', 'XTRAS')));
server.use('/', express.static(path.join(__dirname, '..', 'HTML-FILES')));

server.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'INTERFACE-PAGE.html'));
});


mongoose.connect("mongodb://127.0.0.1:27017/sports").then(()=>console.log("Launched")).catch(()=>console.log("ERROR"));



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

// Add this after your admin schema
const footballTeamSchema= new mongoose.Schema({
    teamName: String,
    formation: String, // e.g. "4-4-2", "4-3-3", etc.
    players: [
      {
        roll: String, // Reference to players collection if normalized
        goals: Number,
        jerseyNumber: Number,
        name: String,
        position: {
          primary: String, // e.g. "Goalkeeper", "Center Back", "Striker"
          secondary: [String] // alternative positions
        },
        isCaptain: Boolean,
        isViceCaptain: Boolean,
        age: Number,
        foot: String, // "Right", "Left", or "Both"
      }
    ],
    teamColors: [String],
    createdAt: Date, // When this document was created
    updatedAt: Date // When this document was last updated
});

const FootballTeam = mongoose.model('FootballTeam', footballTeamSchema);

const admincred = mongoose.model("AdminID", admin);


server.post('/ADMIN-LOGIN-PAGE.html', async (req,res)=>{
    const body = req.body;
    const a = await admincred.findOne({username: body.Username});
    if (a != null){
        if (body.Pass === a.password){
            res.status(200).json({status: "Good"});
        }
        else{
            res.json({status: "Cooked"});
        }
    }
    else{
        res.json({status: "Cooked"});
    }
});





server.listen(8000, console.log("Server Started"));
