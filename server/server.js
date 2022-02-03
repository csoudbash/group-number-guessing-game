const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
const PORT = 5000;
let playerArray = require('./modules/playerArray');

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));



// Client side has posted new guess, this takes them and puts them
// into an array. 
app.post('/guesses',function (req, res){
  console.log('/guesses post hit', req.body);
  playerArray.push(req.body);
  res.sendStatus(201);
  console.log(playerArray);
})

// wait 
app.get('/guessResponse',function(req,res){
  console.log('Request at /guess was made,', req.body);
  // Line below sends the guesses back 
  res.send(playerArray);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})


function randomNumberGenerator() {
  // generating a random number
let randomNumber = Math.floor(Math.random() * (25));//max value only
return randomNumber;
}
console.log(randomNumberGenerator());