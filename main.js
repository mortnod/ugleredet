/* ACTUAL FUNCTIONS */
function resizeCardHeight() {
  var $cards = $('.card');
  card_width = $cards.outerWidth();
  $cards.css('height', card_width);
}

function getRandomTagline() {
  var taglines = [
      "Dekker alle dine behov som UiB-student... bortsett fra kaffe",
      "UiBs IT-tjenester? Gotta know 'em all!",
      "Du och jag, UiB. Du och jag...",
      "Alle lenkene du trenger... og et par til",
      "Uhu-ggelig nyttige lenker",
    ];

  random_id = Math.floor((Math.random() * taglines.length));
  return taglines[random_id];
}

function setTagline() {
  var random_tagline = getRandomTagline();
  try {
    var $tagline = $('.tagline');
    $tagline.text(random_tagline);
  } catch(err) {}
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
    ga('create', 'UA-105595845-1', 'auto');
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

  // Create event listener for analytics events
  normalEvent: function(category, action, selector) {
    $(selector).click(function(e) {
      Analytics.sendEvent(category, action);
    });
  },

  // Sends data to Analytics and redirects (after a slight delay)
  outboundEvent: function(category, action, selector) {
    var eventTrigger = $(selector);

    eventTrigger.click(function(e) {
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
        document.location.href = eventTrigger.attr("href");
      }, 100);

    });
  },

  createEventTrackers: function() {
    this.outboundEvent('Main Links', 'Mitt UiB', '#js-track-mitt-uib');
    this.outboundEvent('Main Links', 'Mazemap', '#js-track-mazemap');
    this.outboundEvent('Main Links', 'Litteraturkiosken', '#js-track-litteraturkiosken');
    this.normalEvent('Main Links', 'Print', '#js-track-print');
    this.outboundEvent('Main Links', 'Email', '#js-track-email');
    this.outboundEvent('Main Links', 'StudentWeb', '#js-track-studentweb');
    this.outboundEvent('Main Links', 'Office 365', '#js-track-office365');
    this.outboundEvent('Main Links', 'Dinner', '#js-track-dinner');
    this.outboundEvent('Main Links', 'Software', '#js-track-software');
    this.outboundEvent('Main Links', 'Library', '#js-track-library');
    this.outboundEvent('Main Links', 'Change Password', '#js-track-password');
    this.outboundEvent('Main Links', 'Book Training', '#js-track-training');

    this.normalEvent('Info Modal', 'Show Modal', '#open-info-modal-button');
    this.outboundEvent('Info Modal', 'Github', '#js-track-github-repo');
    this.outboundEvent('Info Modal', 'mvn.no', '#js-track-mvn');

    this.outboundEvent('Print Modal', 'Color print', '#js-track-print-color');
    this.outboundEvent('Print Modal', 'Greyscale print', '#js-track-print-greyscale');
    this.outboundEvent('Print Modal', 'Payprint', '#js-track-payprint');
  }
};

function activateModal() {
  // leanModal v1.1 by Ray Stone - http://finelysliced.com.au
  // Dual licensed under the MIT and GPL
  (function($){$.fn.extend({leanModal:function(options){var defaults={top:100,overlay:0.5,closeButton:null};var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);return this.each(function(){var o=options;$(this).click(function(e){var modal_id=$(this).attr("href");$("#lean_overlay").click(function(){close_modal(modal_id)});$(o.closeButton).click(function(){close_modal(modal_id)});var modal_height=$(modal_id).outerHeight();var modal_width=$(modal_id).outerWidth();
  $("#lean_overlay").css({"display":"block",opacity:0});$("#lean_overlay").fadeTo(200,o.overlay);$(modal_id).css({"display":"block","position":"absolute","opacity":0,"z-index":11000,"top":o.top+"px"});$(modal_id).fadeTo(200,1);e.preventDefault()})});function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"})}}})})(jQuery);

  $('a[rel*=leanModal]').each(function() {
    $(this).leanModal({ top : 0, overlay: 0.7, closeButton: ".close" });
  });
}

function init() {
  setTagline();

  resizeCardHeight();
  $(window).resize(resizeCardHeight);

  activateModal();

  Analytics.init();
}
