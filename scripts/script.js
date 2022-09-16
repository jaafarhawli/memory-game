const cardsGrid = document.querySelectorAll('.cards');
const card = document.querySelectorAll('.card');

(function shuffle() {
	card.forEach((item) => {
		let position = Math.floor(Math.random() * 6);
		item.style.order = position;
	});
})();
