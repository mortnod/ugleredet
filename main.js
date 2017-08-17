/* HELPER FUNCTIONS */
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

/* ACTUAL FUNCTIONS */
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
    // addClass(modal, 'modal-visible');
    fadeIn(modal);
  }

  // When the user clicks the close_button, close the modal
  close_button.onclick = function() {
    // removeClass(modal, 'modal-visible');
    fadeOut(modal);
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      // removeClass(modal, 'modal-visible');
      fadeOut(modal);
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
