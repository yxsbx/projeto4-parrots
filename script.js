const cards = [];

const gifs = [
    `<img data-test="face-up-image" src="img/bobrossparrot.gif">`,
    `<img data-test="face-up-image" src="img/explodyparrot.gif">`,
    `<img data-test="face-up-image" src="img/fiestaparrot.gif">`,
    `<img data-test="face-up-image" src="img/metalparrot.gif">`,
    `<img data-test="face-up-image" src="img/revertitparrot.gif">`,
    `<img data-test="face-up-image" src="img/tripletsparrot.gif">`,
    `<img data-test="face-up-image" src="img/unicornparrot.gif">`
];

let counter = 0;

let selectedStatus = false;

let chosenCard = null;

let equalCard = [];

let amountCards = null;

let amountPairs = null;

function startGame() {

    let amountCardCards = parseInt(prompt(`🔹 Com quantas cartas deseja jogar?
    🔺 Obs: Digite um número par entre 4 e 14!`));

    while ((amountCards % 2 !== 0) || (amountCards < 4) || (amountCards > 14)) {
        amountCards = parseInt(prompt(`🔺 Atenção!!
    ➡️ Digite um número par entre 4 e 14!`));
    };

    gifs.sort(randomCards);

    for (let i = 0; i < (amountCards / 2); i++) {
        cards.push(gifs[i], gifs[i]);
    };

    amountPairs = amountCards / 2;
    cards.sort(randomCards);

    for (let i = 0; i < amountCards; i++) {
        const box = document.querySelector('.box-cards');
        box.innerHTML += `
        <div data-test="card" class="card" onclick="clickCard(this)" id="${i}">
            <div class="front-face face">
                <img data-test="face-down-image" src="img/back.png">
            </div>
            <div class="back-face face">
                ${cards[i]}
            </div>
        </div>`
    };
};

function randomCards() {
    return Math.random() - 0.5;
};

startGame()

function clickCard(card) {
    const backFace = card.querySelector('.back-face');
    card.removeAttribute('onclick');

    if (counter == 0) {
        time = setInterval(timeCounter, 1000);
    };

    if (backFace.classList.contains('.selected-back') === false) {
        spinCard(card);
        counter++;
        if (selectedStatus === false) {
            chosenCard = card;
            selectedStatus = true;
        } else if (chosenCard.innerHTML !== card.innerHTML) {
            selectedStatus = false;
            card.setAttribute('onclick','clickCard(this)');
            chosenCard.setAttribute('onclick','clickCard(this)');
            setTimeout(spinCard, 1000, chosenCard);
            setTimeout(spinCard, 1000, card);
            chosenCard = null;
        } else {
            selectedStatus = false;
            equalCard.push(card.classList[1]);
        } if (equalCard.length === amountPairs) {
            clearTimeout(time);
            setTimeout(endGame, 1000);
        };
    };
};

function spinCard(card) {
    const frontFace = card.querySelector('.front-face');
    frontFace.classList.toggle('selected-front');
    const backFace = card.querySelector('.back-face');
    backFace.classList.toggle('selected-back');
};

function timeCounter() {
    const clock = document.querySelector('.clock');
    clock.innerHTML = parseInt(clock.innerHTML) + 1;
};

function endGame() {

    const clock = document.querySelector('.clock');

    alert(`🎉 Você ganhou em ${counter} jogadas! A duração do jogo foi de ${clock.innerHTML} segundos!`);

    let restart = prompt('Você gostaria de reiniciar a partida? (sim ou não)');

    while (restart !== 'sim' && restart !== 'não') {
        restart = prompt(`🔺 Atenção!!
    ➡️ Digite [sim] ou [não]!`);
    };
    if (restart === 'sim') {
        location.reload(true);
    } else {
        alert(`Obrigada por jogar Parrot Card Game!
    💚 Até Logo!`)
    };

};