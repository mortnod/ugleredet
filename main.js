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
  try {
    tagline_dom = document.getElementsByClassName('tagline')[0];
    tagline_dom.innerHTML = tagline_string;
  } catch(err) {}
}

function activateModal() {
  // Get the modal
  var modal = document.getElementById("modal-background");

  // Get the button that opens the modal
  var open_button = document.getElementById("open_info_modal_button");

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

var Analytics = {
  init: function() {
    this.initGoogleAnalytics();
    this.createEventTrackers();
  },

  initGoogleAnalytics: function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('set', 'anonymizeIp', true);
    ga('create', 'UA-104769219-1', 'auto');
    ga('send', 'pageview');
  },

  // Helper method to normalEvent() and outBoundEvent()
  sendEvent: function(category, action) {
    try {
      ga('send', 'event', category, action);
    } catch(err){
        console.error(err);
    }
  },

  // Sends data to Analytics. If a 'selector' parameter is given,
  // set up a onClick listener for that selector
  normalEvent: function(category, action, selector) {
    if (selector === undefined) {
      Analytics.sendEvent(category, action);
    }
    else {
      var eventTrigger = document.getElementById(selector);
      eventTrigger.onclick = function() {

        Analytics.sendEvent(category, action);
      }
    }
  },

  // Sends data to Analytics and redirects (after a slight delay)
  outboundEvent: function(category, action, selector) {
    var eventTrigger = document.getElementById(selector);

    eventTrigger.onclick = function(e) {
      // Send tracking information to Google Analytics
      Analytics.sendEvent(category, action);

      // If CTRL or CMD is pressed (to open the link in a new tab),
      // proceed using the browsers default action
      if (e.metaKey || e.ctrlKey) { return; }

      // Otherwise, stop the motherfucker
      e.preventDefault();

      // Small timeout to ensure that the event is tracked
      // before following the link
      setTimeout(function() {
        document.location.href = eventTrigger.getAttribute("href");
      }, 100);

    }
  },

  createEventTrackers: function() {
    this.outboundEvent('Main Links', 'Fronter', 'js-track-fronter');
    this.outboundEvent('Main Links', 'Email', 'js-track-email');
    this.outboundEvent('Main Links', 'StudentWeb', 'js-track-studentweb');
    this.outboundEvent('Main Links', 'Office 365', 'js-track-office365');
    this.outboundEvent('Main Links', 'Schedule', 'js-track-schedule');
    this.outboundEvent('Main Links', 'Print', 'js-track-print');
    this.outboundEvent('Main Links', 'Dinner', 'js-track-dinner');
    this.outboundEvent('Main Links', 'Software', 'js-track-software');
    this.outboundEvent('Main Links', 'Software Kiosk', 'js-track-software-kiosk');
    this.outboundEvent('Main Links', 'Library', 'js-track-library');
    this.outboundEvent('Main Links', 'Change Password', 'js-track-password');
    this.outboundEvent('Main Links', 'Book Training', 'js-track-training');

    this.normalEvent('Info Modal', 'Show Modal', 'open_info_modal_button');
    this.outboundEvent('Info Modal', 'Github', 'js-track-github-repo');
    this.outboundEvent('Info Modal', 'mvn.no', 'js-track-mvn');
  }
};



function main() {
  setTagline();

  resizeCardHeight();
  window.addEventListener("resize", resizeCardHeight);

  Analytics.init();

  activateModal();

}



main();
