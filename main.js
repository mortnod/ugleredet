function resizeCardHeight() {
  cards = document.getElementsByClassName('card')

  // We want the height to be equal to the width
  height = cards[0].offsetWidth + 'px';
  console.log(height);

  for (card of cards) {
    card.style.height = height;
  }
}

window.addEventListener("resize", resizeCardHeight);

resizeCardHeight();
