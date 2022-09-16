const card = document.querySelectorAll('.card');
const statusText = document.getElementById('status');
const reset = document.getElementById('reset');

// First clicked card
let card1;
// Second clicked card
let card2;
let firstClick = true;
let lock = false;
let score = 0;
let flips = 0;
let cardsLeft = 6;

// Shuffle cards each time the page is loaded or reset
(function shuffle() {
	card.forEach((item) => {
		let position = Math.floor(Math.random() * 6);
		item.style.order = position;
	});
})();

// Click event listener for each card
card.forEach((card) => card.addEventListener('click', flip));

// When a card is clicked
function flip() {
	// You're not allowed to click same card twice
	if (this == card1) {
		return;
	}
	// When page is locked due to cards animation, function is disabled
	if (lock == true) {
		return;
	}

	flips += 1;
	// If this is the first selected card
	if (firstClick) {
		card1 = this;
		firstClick = false;
		this.classList.add('flip-card');
		return;
	} else {
		// If this is the second selected card
		card2 = this;
		this.classList.add('flip-card');
		// If it matched the first selected card
		if (card1.dataset.framework == card2.dataset.framework) {
			cardsLeft -= 2;
			if (cardsLeft > 0) {
				statusText.innerHTML = 'Matched';
			} else {
				// If no cards are left, calculate the score and display it before terminating
				score = 10 - (flips - 10);
				if (score < 0) {
					score = 0;
				}
				if (score > 10) {
					score = 10;
				}
				statusText.innerHTML = `Congrats! Your score = ${score}`;
			}
			lock = true;
			// Time out is to let the cards flip first
			setTimeout(() => {
				card1.classList.toggle('flip-card');
				card1.classList.toggle('flip-card');
				card1.style.opacity = 0;
				card2.style.opacity = 0;
				card1.removeEventListener('click', flip);
				card2.removeEventListener('click', flip);
				lock = false;
				firstClick = true;
				card1 = null;
				card2 = null;
			}, 500);
			// If the two cards did'nt match
		} else {
			lock = true;
			setTimeout(() => {
				card1.classList.remove('flip-card');
				card2.classList.remove('flip-card');
				statusText.innerHTML = 'Try again';
				firstClick = true;
				card1 = null;
				card2 = null;
				lock = false;
			}, 1000);
		}
	}
}

// If reset button is clicked
reset.addEventListener('click', () => {
	// If no cards are flipped yet
	if (flips == 0) {
		return;
	}
	// Reset everything
	card.forEach((element) => {
		if (element.style.opacity == 0) {
			element.style.opacity = 1;
			element.classList.toggle('flip-card');
		}
	});
	firstClick = true;
	card1 = null;
	card2 = null;
	lock = false;
	cardsLeft = 6;
	flips = 0;
	score = 0;
	statusText.innerHTML = 'Start';
	card.forEach((card) => card.addEventListener('click', flip));
});
