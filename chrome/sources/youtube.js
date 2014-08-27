// This content script is loaded whenever a YouTUBE video iframe is detected on the page

(function() {

  if(typeof SavedYouAClickYT != 'undefined') return;

  // Since this script is executed in all iframes, we first check that we are 
  // in the youtube video iframe
  if(!window.location.href.match(/https?:\/\/(www\.)?youtube\.com\/embed\/.+/)) return;

  setTimeout(function() {
    // We get the html5 contextual menu  
    var menu = document.querySelector('.html5-context-menu');
    // console.log("HTML5 Contextual menu found on "+window.location.href, menu);

    if(!menu) return;

    var li = menu.querySelector('li');

    var newli = li.cloneNode(true);
    var span = newli.querySelector('span');
    span.textContent = "Save your followers a click";
    span.classList.remove('html5-context-menu-copy-video-url');

    span.addEventListener('click', function() {
      // console.log("Saving a click with url: ", window.location.href);
      chrome.runtime.sendMessage({url: window.location.href});
    });

    menu.appendChild(newli);
  }, 700);

})();

SavedYouAClickYT = true;
