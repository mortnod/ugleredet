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

function activateModal() {
  // Get the modal
  var modal = document.getElementById("modal-background");

  // Get the button that opens the modal
  var open_button = document.getElementById("open_modal_button");

  // Get the (x) that closes the modal
  var close_button = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  open_button.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks the close_button, close the modal
  close_button.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}


function main() {
  setTagline();

  resizeCardHeight();
  window.addEventListener("resize", resizeCardHeight);

  activateModal();
}

main();
