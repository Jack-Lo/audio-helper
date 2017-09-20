var $greet = document.getElementById('greet')

/* questions

1. 微信下自动播放需要WeixinJSBridgeReady
2. 微信ios下，无法在监听函数里触发一个未被手动播放过的audio

*/


var lufySrc = './audios/lufy.mp3'
var bgmSrc = './audios/bgm.mp3'
var a1Src = './audios/1.mp3'
var a2Src = './audios/2.mp3'
var a3Src = './audios/3.mp3'
var a4Src = './audios/4.mp3'

document.addEventListener('WeixinJSBridgeReady', onReady, false)

$('#play').onclick = function () {
  onReady()
}

var { Player, Mix, Join } = AudioHelper

var lufy = new Player({
  src: lufySrc
})

var a1 = new Player({
  src: a1Src
})

var a2 = new Player({
  src: a2Src
})

var a3 = new Player({
  src: a3Src
})

var a4 = new Player({
  src: a4Src
})

var bgm = new Player({
  src: bgmSrc,
  attrs: {
    loop: true
  }
})

var girl = new Join(a1, a2, a3)

// var audio = new Mix(girl, bgm, {isActivated: true})

// audio1.play()
// audio.play()

// new Mix(new Join(lufy, girl), bgm).play()

function onReady () {
  // girl.play()
  // audio.play()
  // a1.play()
  new Mix(new Join(lufy, girl), bgm, {isActivated: true}).play()
}

function $ (selector) {
  return document.querySelector(selector)
}






