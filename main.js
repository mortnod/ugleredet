function resizeCardHeight() {
  cards = document.getElementsByClassName('card')

  // We want the height to be equal to the width
  height = cards[0].offsetWidth + 'px';

  for (card of cards) {
    card.style.height = height;
  }
}

function getRandomTagline() {
  var taglines = [
    "Dekker alle dine behov som UiB-student... bortsett fra kaffe",
    "UiBs IT-tjenester? Gotta know 'em all!",
    "Du och jag, UiB. Du och jag...",
    "Alle lenkene du trenger... og et par til",
    "Uhu-ggelig nyttige lenker",
  ];

  n = Math.floor((Math.random() * taglines.length));

  return taglines[n];
}

function setTagline() {
  tagline_string = getRandomTagline();
  tagline_dom = document.getElementsByClassName('tagline')[0];

  tagline_dom.innerHTML = tagline_string;
}

window.addEventListener("resize", resizeCardHeight);

function main() {
  setTagline();
  resizeCardHeight();
}

main();
