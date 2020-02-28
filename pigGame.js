var scores, roundScore, activePlayer, gamePlaying, dice1, dice2, lastDice, finalScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() { //Anonymus function
    
    if(gamePlaying) {
        
        finalScore = document.querySelector('.final-score').value;
        
        // Undefined, 0, null or "" are COERCED to false
        //Anything else is COERCED to true
        //if(finalScore < 1) {
        if(!finalScore) {
            alert('Please enter the Final Score to proceed!');
            return;
        }
        
        document.querySelector('.final-score').disabled = true;
       
        //1. Random number
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        console.log('dice1 : '+dice1);
        console.log('dice2 : '+dice2);
        
        //2. Display result
        var diceDOM1 = document.getElementById('dice-1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        
        var diceDOM2 = document.getElementById('dice-2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        //3. Update the round score IF the rolled number was not a 1
        if(lastDice === 6 && dice1 === 6) {
            //Player loses all of his score
             scores[activePlayer] = 0;
             document.getElementById('score-' + activePlayer).textContent = '0';            
             nextPlayer();
            
        } else if(dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer();
        }
        
        lastDice = dice1;
    }
    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {
        
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
                
        } else {
            nextPlayer();
        }
    }
    
    
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    dice1 = 0;
    lastDice = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init); //

function init() {
    
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    dice1 = 0;
    previousValue = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.final-score').value = "";
    
    document.querySelector('.final-score').disabled = false;

}



