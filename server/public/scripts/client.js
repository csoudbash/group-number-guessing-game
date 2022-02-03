$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#addButton').on('click', addGuesses)
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
    getGuessList();
}).catch(function(response){
  console.log('It did not work :(', response);
  
})
$('#guess1').val('')
$('#guess2').val('')
$('#guess3').val('')
$('#guess4').val('')
// getGuessList();
}


// Makes AJAX get to get the array of player results with position value added. 
function getGuessList(){
  $.ajax({
    method: 'GET',
    url: '/playerResults'

  }).then(function(response){
    console.log('This is the response from the server for /playerResults',response);
    renderGuessesToDom(response); 
  }).catch(function(response){
    console.log('shucks scoob',response);
  })

}






function renderGuessesToDom(newDomArray){
  console.log(newDomArray);
  $('#history').empty();
  for (let entry of newDomArray){
    console.log('This is the entry', entry);
    for (let item of entry){
    $('#history').append(`
    <tr>
        <td>&nbsp;Player Name: ${item.player}</td>
        <td>&nbsp;Player Guess: ${item.guess}</td>
        <td>&nbsp;Guess Position: ${item.position}</td>
    </tr>
    `)
  }
  }
  
}