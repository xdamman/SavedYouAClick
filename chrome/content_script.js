
function getTwitterHandle() {
  var handle, attr;
  var el = document.querySelector('meta[name="twitter:site"]');
  if(el) {
    attr = el.attributes.getNamedItem('content') || el.attributes.getNamedItem('value');
    handle = attr.value;
    handle = handle.replace('@','');
  }
  return handle;
}

function openTweet(url) {
  var handle = getTwitterHandle();
  if(handle) {
    url += "&via="+handle;
  }

  var height = 400;
  if(url.match(/imgurl=/)) height = 675;

  window.open(url, "savedyouaclick-tweet", "width=520,height="+height);
}
