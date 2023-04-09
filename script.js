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

let chosenLetter = null;

let equalLetter = [];

let amountLetters = null;

let amountPairs = null;

function startGame() {

    let amountLetters = parseInt(prompt(`🔹 Com quantas cartas deseja jogar?
    🔺 Obs: Digite um número par entre 4 e 14!`));

    while ((amountLetters % 2 !== 0) || (amountLetters < 4) || (amountLetters > 14)) {
        amountLetters = parseInt(prompt(`🔺 Atenção!!
    ➡️ Digite um número par entre 4 e 14!`));
    };

    gifs.sort(randomLetters);

    for (let i = 0; i < (amountLetters / 2); i++) {
        cards.push(gifs[i], gifs[i]);
    };

    amountPairs = amountLetters / 2;
    cards.sort(randomLetters);

    for (let i = 0; i < amountLetters; i++) {
        const box = document.querySelector('.box-cards');
        box.innerHTML += `
        <div data-test="card" class="card" onclick="clickLetter(this)" id="${i}">
            <div class="front-face face">
                <img data-test="face-down-image" src="img/back.png">
            </div>
            <div class="back-face face">
                ${cards[i]}
            </div>
        </div>`
    };
};

function randomLetters() {
    return Math.random() - 0.5;
};

startGame()

function clickLetter(card) {
    const backFace = card.querySelector('.back-face');
    card.removeAttribute('onclick');

    if (counter == 0) {
        time = setInterval(timeCounter, 1000);
    };

    if (backFace.classList.contains('.selected-back') === false) {
        spinLetter(card);
        counter++;
        if (selectedStatus === false) {
            chosenLetter = card;
            selectedStatus = true;
        } else if (chosenLetter.innerHTML !== card.innerHTML) {
            selectedStatus = false;
            card.setAttribute('onclick','clickLetter(this)');
            chosenLetter.setAttribute('onclick','clickLetter(this)');
            setTimeout(spinLetter, 1000, chosenLetter);
            setTimeout(spinLetter, 1000, card);
            chosenLetter = null;
        } else {
            selectedStatus = false;
            equalLetter.push(card.classList[1]);
        } if (equalLetter.length === amountPairs) {
            clearTimeout(time);
            setTimeout(endGame, 1000);
        };
    };
};

function spinLetter(card) {
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