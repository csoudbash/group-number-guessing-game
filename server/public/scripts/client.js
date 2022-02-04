$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#addButton').on('click', addGuesses)
  $('#restartButton').on('click', restartGame);
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
    //BEN AND ADAMS JQUERY HISTORY APPENDING TABLE HEADERS. ONCE PER ROUND
    //  DEPRECATED AS OF FRIDAY MORNING
    // $('#guessHead').append(`
    // <th id="r${newDomArray.length}"></th>
    // `)
    for (let item of entry){
    $('#history').append(`
    <tr>
        <td>Name: ${item.player}</td>
        <td>Guess: ${item.guess}</td>
        <td>Position: ${item.position}</td>
    </tr>
    `)
    // BEN and Adams Guess History Appending thing
    // DEPRECATED AS OF FRIDAY MORNING
  //   let roundIterator = 1;
  //   switch (item.player){
  //     case '1':
  //       $('#p1-history').append(`
  //       <td>
  //       ${item.guess}
  //       </td>
  //       `);
  //       break;
  //     case '2':
  //       $('#p2-history').append(`
  //       <td>
  //       ${item.guess}
  //       </td>
  //       `);
  //       break;
  //     case '3':
  //       $('#p3-history').append(`
  //       <td>
  //       ${item.guess}
  //       </td>
  //       `);
  //       break;
  //     case '4':
  //       $('#p4-history').append(`
  //       <td>
  //       ${item.guess}
  //       </td>
  //       `);
  //       break;
  // }
  }
  }
    $('.empty').empty();
    for (let entry of newDomArray[newDomArray.length-1]) {
    console.log(entry);
      switch (entry.player){
      case '1':
              $('#position1').append(`
              Guest position: ${entry.position}
              `);
              break;
            case '2':
              $('#position2').append(`
              Guest position: ${entry.position}
              `);
              break;
            case '3':
              $('#position3').append(`
              Guest position: ${entry.position}
              `);
              break;
            case '4':
              $('#position4').append(`
              Guest position: ${entry.position}
              `);
      }       
    }



}

function restartGame(){
  $.ajax({
    method: 'GET',
    url: '/restartGame'
  }).then(function(response){
    console.log('Game HAS BEEN RESET',response);
    renderGuessesToDom(response);
  }).catch(function(response){
    console.log('DIDN\'T WORK? ',response);
  })
}