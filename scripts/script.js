const cardsGrid = document.querySelectorAll('.cards');
const card = document.querySelectorAll('.card');
const statusText = document.getElementById('status');

let card1;
let card2;
let firstClick = true;

(function shuffle() {
	card.forEach((item) => {
		let position = Math.floor(Math.random() * 6);
		item.style.order = position;
	});
})();

card.forEach((card) => card.addEventListener('click', flip));

function flip() {
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
			card1.classList.toggle('active');
			card1.classList.toggle('active');
			card1.style.opacity = 0;
			card2.style.opacity = 0;
		} else {
			setTimeout(() => {
				card1.classList.remove('flip-card');
				card2.classList.remove('flip-card');
				statusText.innerHTML = 'Try again';
				firstClick = true;
				card1 = null;
				card2 = null;
			}, 1500);
		}
	}
}
