import { _Audio, addEvent } from './helper'
import PlayerClass from './PlayerClass'

class Player extends PlayerClass {
  constructor (options) {
    var {
      src,
      attrs = {},
      eventList = [],
      isActivated = false
    } = options

    if (!src) {
      return
    }

    super(options)

    this.config = {
      src, attrs, eventList,
      isActivated
    }

    this.audio = null
    this.isActivated = false
    _init.call(this)
    _bind.call(this)
  }

  addAudioEvent (event) {
    var _t = this
    var { audio } = _t
    var eventName = 'audio:' + event

    if (typeof _t._handlerMap[eventName] !== 'undefined') {
      return
    }

    addEvent(audio, event, () => {
      _t.fire(eventName)
    }, false)
  }
}

function _init () {
  var _t = this
  var { src, attrs } = _t.config
  var audio = _t.audio = new _Audio(src, attrs)
}

function _bind () {
  var _t = this
  var { audio, isActivated, config } = _t
  var { eventList } = config

  var evList = [].concat(eventList, ['ended'])

  evList.map((ev) => {
    _t.addAudioEvent(ev)
  })

  if (config.isActivated) {
    _t.once('play', () => {
      _t.activate()
    })
  }

  _t.on('play', () => {
    audio.play()
  })

  _t.on('pause', () => {
    audio.pause()
  })

  _t.on('stop', () => {
    audio.pause()
    audio.currentTime = 0
  })

  _t.on('reset', () => {
    audio.currentTime = 0
  })

  _t.on('audio:ended', () => {
    _t.fire('ended')
  })

  _t.on('activate', () => {
    if (!isActivated) {
      var currentTime = audio.currentTime

      audio.play()
      audio.pause()
      audio.currentTime = currentTime

      _t.isActivated = true
    }
  })
}

export default Player