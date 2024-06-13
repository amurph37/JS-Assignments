const hands = ['rock', 'paper', 'scissors'];
function getHand() {
    return hands[parseInt(Math.random() * 10) % 3];
}
const player1 = {
    name: 'Player 1',
    getHand: getHand
};
const player2 = {
    name: 'Player 2',
    getHand: getHand
};

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

let winner = playround(player1, player2);