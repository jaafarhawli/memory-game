const card = document.querySelectorAll('.card');
const statusText = document.getElementById('status');
const reset = document.getElementById('reset');

let card1;
let card2;
let firstClick = true;
let lock = false;
let score = 0;

(function shuffle() {
	card.forEach((item) => {
		let position = Math.floor(Math.random() * 6);
		item.style.order = position;
	});
})();

card.forEach((card) => card.addEventListener('click', flip));

function flip() {
	if (this === card1) {
		return;
	}
	if (lock == true) {
		return;
	}
	if (firstClick) {
		card1 = this;
		firstClick = false;
		this.classList.add('flip-card');
		return;
	} else {
		card2 = this;
		this.classList.add('flip-card');
		if (card1.dataset.framework === card2.dataset.framework) {
			statusText.innerHTML = 'Matched';
			lock = true;
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
		} else {
			lock = true;
			setTimeout(() => {
				/* card1.classList.toggle('flip-card');
				card1.classList.toggle('flip-card'); */
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

reset.addEventListener('click', () => {
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
	card.forEach((card) => card.addEventListener('click', flip));
});
