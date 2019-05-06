/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dice as many times as he whishes. Each result get added to his current score
- The player looses his CURRENT score when one of them is a 1. After that, it's the next player's turn
- A player looses his ENTIRE score when he rolls two 6 in the same time. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his CURRENT score gets added to his ENTIRE score. After that, it's the next player's turn.
- Players can set the winning score, so that they can change the predefined score of 100.
- The first player to reach the winning score on ENTIRE score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, dice1, dice2, winningScore;



var $ = function(id) {
	return document.getElementById(id);
};


init();

/*
document.querySelector('.help-circle').addEventListener('click', function() {
	window.document.alert('dsfsdfsdf');
}
*/

document.querySelector('.btn-roll').addEventListener('click', function() {
	
	if (gamePlaying) {
		
		
		// 1. Random number
		dice1 = Math.floor(Math.random() * 6) + 1;
		dice2 = Math.floor(Math.random() * 6) + 1;
		
				
		// 2. Display the result
		var diceDOM1 = document.querySelector('.dice-1');
		diceDOM1.style.display = 'block';
		diceDOM1.src = 'resources/img/dice-' + dice1 + '.png';
		
		var diceDOM2 = document.querySelector('.dice-2');
		diceDOM2.style.display = 'block';
		diceDOM2.src = 'resources/img/dice-' + dice2 + '.png';


		// 3. Update the round score if the rolled number was NOT a 1
		if (dice1 === 1 || dice2 === 1) {
			//Next player
			
			nextPlayer();
			
		} if (dice1 === 6 && dice2 === 6) {
			//Player looses score
			scores[activePlayer] = 0;
			$('score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		} else {

			//Add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
	}
});


document.querySelector('.btn-hold').addEventListener('click', function() {
	
	if (gamePlaying) {
		// ADD CURRENT SCORE TO GLOBAL SCORE
		scores[activePlayer] += roundScore;

		// UPDATE THE UI
		$('score-' + activePlayer).textContent = scores[activePlayer];

		var input = $('winningScore').value;
		
		// Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
			$('winningScore').value = 100;
        }
		
		// CHECK IF PLAYER WON THE GAME
		if (scores[activePlayer] >= winningScore) {
			$('name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice-1').style.display= 'none';
			document.querySelector('.dice-2').style.display= 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// NEXT PLAYER
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	
	dice1 = 0;
	dice2 = 0;
	roundScore = 0;
	$('current-0').textContent = '0';
	$('current-1').textContent = '0';


	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	
}

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
			
	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';

	$('score-0').textContent = '0';
	$('score-1').textContent = '0';
	$('current-0').textContent = '0';
	$('current-1').textContent = '0';
	$('name-0').textContent = 'Player-1';
	$('name-1').textContent = 'Player-2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	
}
