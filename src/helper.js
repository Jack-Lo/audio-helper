function _Audio (src,attrs) {
  var audio = null

  if (typeof Audio === 'function') {
    audio = new Audio()
  } else {
    audio = document.createElement('audio')
  }

  if (src) {
    audio.src = src
  }

  if (attrs) {
    Object.keys(attrs).map((attr) => {      
      audio[attr] = attrs[attr]
    })
  }

  return audio
}

function addEvent (el, ...res) {
  return el.addEventListener(...res)
}

export {
  _Audio,
  addEvent
}