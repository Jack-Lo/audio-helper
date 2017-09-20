import PlayerClass from './PlayerClass'

class Mix extends PlayerClass {
  constructor (voice, bgm, options = {}) {
    var {
      startWith = 'bgm',
      endBy = 'voice',
      isActivated = false
    } = options

    if (!(voice && bgm)) {
      return
    }

    super(voice, bgm, options)

    this.config = {
      startWith, endBy,
      isActivated
    }

    this.voice = voice
    this.bgm = bgm
    this.players = [voice, bgm]
    this.isActivated = voice.isActivated && bgm.isActivated
    _init.call(this)
    _bind.call(this)
  }
}

function _init () {
  var _t = this
  var { voice, bgm } = _t
}

function _bind () {
  var _t = this
  var { voice, bgm, players, config } = _t

  if (config.isActivated) {
    _t.once('play', () => {
      _t.activate()
    })
  }

  bgm.addAudioEvent('playing')

  bgm.on('audio:playing', () => {
    voice.play()
  })

  voice.on('ended', () => {
    bgm.stop()
  })

  _t.on('play', () => {
    bgm.play()
  })

  _t.on('pause', () => {
    players.map((p) => p.pause())
  })

  _t.on('stop', () => {
    players.map((p) => p.stop())
  })

  _t.on('reset', () => {
    players.map((p) => p.reset())
  })

  _t.on('activate', () => {
    players.map((p) => p.activate())
    _t.isActivated = true
  })
}

export default Mix