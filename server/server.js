const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
const PORT = 5000;
let playerArray = require('./modules/playerArray');
let playerResults = require('./modules/playerResults');
const { post } = require('jquery');
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

function randomNumberGenerator() {
  // generating a random number
let randomNumber = Math.floor(Math.random() * (25 - 1))+ 1;//max value only
console.log(randomNumber);
return randomNumber;
}
// console.log(randomNumberGenerator());
let correctNumber= randomNumberGenerator();

// Client side has posted new guess, this takes them and puts them
// into an array. 
app.post('/guesses',function (req, res){
  console.log('/guesses post hit', req.body.newGuess);
  playerArray.push(req.body.newGuess);
  res.sendStatus(201);
  console.log(playerArray);
  // playerUpdateArray(playerArray);
  playerResults.push(playerUpdateArray(playerArray));
  console.log(playerResults);
})

// wait 
app.get('/playerResults',function(req,res){
  console.log('Request at /playerResults was made,', req.body);
  // Line below sends the guesses back 
  res.send(playerResults);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})


function playerUpdateArray(playerArray) {
  let newResultsArray = [];
  for (let player of playerArray[playerArray.length-1]) {
    let position;
    if (player.guess == correctNumber) {
      position = 'correct';
      console.log(position,player.guess, correctNumber);
    }else if(player.guess < correctNumber){
      position = 'too low';
      console.log(position, player.guess, correctNumber);
    }else {
      position = 'too high';
      console.log(position,player.guess, correctNumber);
    }
    let newPlayerObject = {
      player: player.player,
      guess: player.guess,
      position: position,
    }
    newResultsArray.push(newPlayerObject);
  }
  return newResultsArray;
}
