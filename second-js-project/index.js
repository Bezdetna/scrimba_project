let massageEl = document.getElementById("massage-el");
let summEl = document.getElementById("sum-el");
let cardEl = document.getElementById("card-el");
let playerEl = document.getElementById("player-el");

let cards = []
let sum = 0;
let player = {
    name: "Alisa",
    chips: 200
}

let hasBlackJack = false;
let isAlive = false;

let massage = "";

playerEl.textContent = player.name + ": $ " + player.chips

function getRandomCard() {

    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }


};

function startGame() {
    isAlive = true;

    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard;

    renderGame();
};


function renderGame() {
    cardEl.textContent = `Cards: `
    for (let i = 0; i < cards.length; i++) {
        cardEl.textContent += cards[i] + " "
    };

    summEl.textContent = `Sum: ${sum}`;

    if (sum <= 20) {
        massage = "Do you want to draw a new card?"
    } else if (sum === 21) {
        massage = "Wohoo! You've got Blackjack!"
        hasBlackJack = true

    } else {
        massage = "You're out of the game!"
        isAlive = false;
    };
    massageEl.textContent = massage;
};

function newCard() {

    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;

        cards.push(card)
        renderGame()
    } else {
        massageEl.textContent = "That's all";
    }



};




