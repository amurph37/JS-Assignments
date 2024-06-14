const hands = ['rock', 'paper', 'scissors'];
function getHand() {
    return hands[parseInt(Math.random() * 10) % 3];
}

const player1 = { name: 'Player 1', getHand: getHand };
const player2 = { name: 'Player 2', getHand: getHand };
const player3 = { name: 'Player 3', getHand: getHand };
const player4 = { name: 'Player 4', getHand: getHand };

function playround(player1, player2) {
    const hand1 = player1.getHand();
    const hand2 = player2.getHand();

    console.log(`${player1.name} plays ${hand1}`);
    console.log(`${player2.name} plays ${hand2}`);

    if (hand1 === hand2) {
        console.log(`Both players played ${hand1}. It's a tie!`);
        return null;
    }

    let winner;
    if (
        (hand1 === 'rock' && hand2 === 'scissors') ||
        (hand1 === 'paper' && hand2 === 'rock') ||
        (hand1 === 'scissors' && hand2 === 'paper')
    ) {
        winner = player1;
    } else {
        winner = player2;
    }

    console.log(`${winner.name} wins with ${winner === player1 ? hand1 : hand2}!`);
    return winner;
}

function playGame(player1, player2, playUntil) {
    
    let player1Wins = 0;
    let player2Wins = 0;

    while (player1Wins < playUntil && player2Wins < playUntil) {
        const winner = playround(player1, player2);
        if (winner === player1) {
            player1Wins++;
        } else if (winner === player2) {
            player2Wins++;
        }    
        
        console.log(`${player1.name}: ${player1Wins}, ${player2.name}: ${player2Wins}`);
    }

    return player1Wins === playUntil ? player1 : player2;

}

function playTournament(players, playUntil) {
    const semiFinal1Winner = playGame(players[0], players[1], playUntil);
    const semiFinal2Winner = playGame(players[2], players[3], playUntil);

    const tournamentWinner = playGame(semiFinal1Winner, semiFinal2Winner, playUntil);

    console.log(`${tournamentWinner.name} is the world champion!`);
    return tournamentWinner;
}

const gameWinner = playGame(player1, player2, 3);
console.log(`${gameWinner.name} wins the game!`);

const players = [player1, player2, player3, player4];

const tournamentWinner = playTournament(players, 3);

console.log(`${tournamentWinner.name} wins the tournament!`);