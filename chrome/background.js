

chrome.runtime.onInstalled.addListener(function() {

  // console.log("Creating the menu");
  chrome.contextMenus.create({
    "title" : "Save your followers a click",
    "type" : "normal",
    "id": "savedyouaclick-menu",
    "contexts" : ["selection","image","video","frame"]
  });

});

chrome.contextMenus.onClicked.addListener(clickHandler);

chrome.webNavigation.onDOMContentLoaded.addListener(function(obj) {
  // e.g. https://www.youtube.com/embed/laLudeUmXHM?...
  if(obj.url.match(/https?:\/\/(www\.)?youtube\.com\/embed\/.+/)) {
    // console.log("YouTUBE iframe detected: ", obj.url);
    chrome.tabs.executeScript(null, {file: "sources/youtube.js", allFrames: true});
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendMessage) {
  clickHandler({frameUrl: request.url},sender.tab);
});

function clickHandler(info, tab) {

  var shortcutUrl;
  var hashtag = "#SavedYouAClick";
  var text = tab.title;

  chrome.tabs.executeScript(null, {file: "content_script.js"});

  // console.log("handling: ", info, tab);

  if(info.selectionText) { 
    var text = info.selectionText + '\n' + tab.title;
  }

  // video element
  if(info.frameUrl) {
  
    if(info.frameUrl.match(/vimeo\.com\//)) {
      var matches = info.frameUrl.match(/vimeo\.com\/video\/([0-9]+).*/);
      var videoId = matches[1];
      shortcutUrl = "https://vimeo.com/"+videoId;
    }

    if(info.frameUrl.match(/youtube\.com\//)) {
      var matches= info.frameUrl.match(/https?:\/\/www\.youtube\.com\/embed\/([^\?]+)/);
      var videoId = matches[1];
      shortcutUrl = "https://youtube.com/watch?v="+videoId;
    } 

  }

  // image element
  if(info.srcUrl) {
    shortcutUrl = info.srcUrl;
  }

  if(!shortcutUrl) 
    shortcutUrl = tab.url;

  text += " " + hashtag; 
  text += " " + shortcutUrl; 

  var url = 'https://twitter.com/intent/tweet?status=' + encodeURIComponent(text) 

  chrome.tabs.executeScript({code: 'setTimeout(function() { openTweet("'+url+'"); }, 10);'});

};

