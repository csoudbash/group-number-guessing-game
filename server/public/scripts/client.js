$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#addButton').on('click', addGuesses)
}


function getGuessList(){
  $.ajax({
    method: 'Get',
    url: '/guesses'
  }).then(function(response){
    console.log('This is the response from the server for getGuessList',response);
  }).catch(function(response){
    
  })
}





function addGuesses(){
  // builds array of objects with the current input values
  let guessesToAdd = [{
    player: 1,
    guess:$('#guess1').val()
    },
    {
    player: 2,
    guess:$('#guess2').val()
    },
    {
    player: 3,
    guess:$('#guess3').val()
    },
    {
    player: 4,
    guess:$('#guess4').val()
    }];

    // posts the array of objects to the server
  $.ajax({
    method: 'POST',
    url: '/guesses',
    data: {
      newGuess: guessesToAdd,
    }
}).then(function(){
    console.log('guesses added successfully');
    renderGuessesToDom();
}).catch(function(response){
  console.log('It did not work :(', response);
  

})
$('#guess1').val('')
$('#guess2').val('')
$('#guess3').val('')
$('#guess4').val('')
}

function renderGuessesToDom(){
  $.ajax({
    method: 'GET',
    url:'/guessResponse'
  }).then(function(response){
    console.log('Get reponse',response);
  }).catch(function(response){
    console.log('It did not work :(', response); 
  })
}