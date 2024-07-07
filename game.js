document.addEventListener('DOMContentLoaded', function() {
    const cardsArray = [
        '🧻', '🧻', '🌱', '🌱', '💧', '💧', '🚽', '🚽', '🧼', '🧼', '🚿', '🚿'
    ];

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // Create the game board
    function createBoard() {
        cardsArray.sort(() => 0.5 - Math.random());
        for (let i = 0; i < cardsArray.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', i);
            card.textContent = '🦔'; // Emoji representing the back of the card
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

// Check for matches
function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
        cards[optionOneId].textContent = '';
        cards[optionTwoId].textContent = '';
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cards[optionOneId].style.backgroundColor = 'green'; // Change background color to green
        cards[optionTwoId].style.backgroundColor = 'green'; // Change background color to green
        cardsWon.push(cardsChosen);
    } else {
        setTimeout(() => {
            cards[optionOneId].textContent = '🦔';
            cards[optionTwoId].textContent = '🦔';
            cards[optionOneId].style.backgroundColor = '#eee'; // Reset background color
            cards[optionTwoId].style.backgroundColor = '#eee'; // Reset background color
        }, 1000);
        // Show jumpscare
        const jumpscare = document.createElement('img');
        jumpscare.src = 'https://cdn.theatlantic.com/thumbor/4dTl39ouRGC009WveLQOUvmZ9l4=/68x29:1211x672/960x540/media/img/upload/wire/2014/05/19/shrek1/original.jpg';
        jumpscare.classList.add('jumpscare');
        document.body.appendChild(jumpscare);
        
        const audio = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Load audio
audio.play(); // Play the audio

// Set the audio source to the Shrek theme song after a delay
setTimeout(() => {
    audio.src = 'https://www.soundjay.com/button/button-43.mp3';
    audio.play();
}, 1000);

        setTimeout(() => {
            jumpscare.remove();
        }, 500); // Remove jumpscare after 2 seconds
        
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = `Matches: ${cardsWon.length}`;

    if (cardsWon.length === cardsArray.length / 2) {
        resultDisplay.textContent = 'Congratulations! You found them all!';
    }
}



    // Flip the card
    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardsArray[cardId]);
        cardsChosenId.push(cardId);
        this.textContent = cardsArray[cardId];
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();

    const restartButton = document.querySelector('#restart'); // Added

    // Restart the game
    function restartGame() {
        grid.innerHTML = ''; // Clear the game board
        resultDisplay.textContent = 'Matches: 0'; // Reset matches count
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        createBoard(); // Create a new game board
    }
    
    restartButton.addEventListener('click', restartGame); // Added
    


});
