var base_url = 'http://localhost:3000';
var base_url = 'http://savedyouaclick.herokuapp.com';

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
  var text = ""; 

  chrome.tabs.executeScript(null, {file: "content_script.js"});

  if(info.selectionText) { 
    var text = info.selectionText + " ";
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

  if(shortcutUrl)
    text += shortcutUrl; 

  var url = base_url + "?status="+encodeURIComponent(text)+"&title="+encodeURIComponent(tab.title)+"&url="+encodeURIComponent(tab.url);

  // image element
  if(info.srcUrl) {
    url += "&imgurl="+info.srcUrl;
  }

  chrome.tabs.executeScript({code: 'setTimeout(function() { openTweet("'+url+'"); }, 10);'});

};

