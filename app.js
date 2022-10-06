var secretNumber = null;
var input = null;
var tries = 0;
var username = null;
var again = null;
var playerHistory = {};
var bestScore = 50;
var guessesArray = [];

retrieveScores();

function play(){
  secretNumber = Math.floor(Math.random()*100);
  if(!username){
    username = prompt('What is your name?');
  } else {
    alert('Welcome '+username);
  }
  higherLowerOrEqual(); 
  updateUser(username, tries);
  playAgain();
}
	
  


function playAgain(){
  again = prompt('Play again?');
  if(again.toLowerCase() == 'yes'){
    tries = 0;
    guessesArray = [];
    play();
  } else {
    var newUser = prompt('Play as new user?');
    if(newUser.toLowerCase() == 'yes'){
      tries = 0;
      guessesArray = [];
      username = prompt('Enter new user');
      play();
    } else {
    alert('Game Over\n playerHistory' +JSON.stringify(playerHistory));
    }
  }
}
function updateUser(username, tries) {
  if (!playerHistory[username]) {
    playerHistory[username] = tries;
  } else if (playerHistory[username] > tries) {
    playerHistory[username] = tries;
  }
  localStorage.setItem('scores', JSON.stringify(playerHistory));
}

function retrieveScores() {
  let message = '';
  playerHistory = JSON.parse(localStorage.getItem('scores'));
  if (!playerHistory) {
    message = 'No Scores Yet!';
    playerHistory = {};
  } else {
    message = generateplayerHistory();
  }
}
   

function higherLowerOrEqual(){
  for(var i = 0; i <= guessesArray.length; i++){
  	input = prompt('Guess a number 0 to 100');
    guessesArray.push(input);
    tries++;
    if(input == secretNumber){
      alert('Correct '+username+'! it took you '+tries+' guesses. You guessed '+guessesArray.join(', '));
      break;
    } else if (input > secretNumber){
      alert('Lower '+username+', guess again. Your last guess was ' + input);
    } else {
      alert('Higher '+username+', guess again. Your last guess was ' + input);
    }
  }
}
function generateplayerHistory() {
  let message = '';
  for (let i in playerHistory) {
    message += i + ': ' + playerHistory[i] + '\n';
  }
  return message;
}

play();
