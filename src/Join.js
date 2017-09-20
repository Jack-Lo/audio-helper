import PlayerClass from './PlayerClass'

class Join extends PlayerClass {
  constructor(...args) {
    var len = args.length
    var players = []
    var config = {}

    super(...args)

    if (len < 2) {
      return
    } else {
      var last = args[len - 1]

      if (!(last instanceof PlayerClass)) {
        if (len === 2) {
          return
        }

        players = args.slice(0, -1)
        config = last
      } else {
        players = args
      }
    }

    this.players = players
    this.config = config

    this.isActivated = [true].concat(players).reduce((a, b) => a && b.isActivated)
    _init.call(this)
    _bind.call(this)
  }
}

function _init () {
  var _t = this
  var { players, config } = _t
}

function _bind () {
  var _t = this
  var { players, config, isActivated } = _t
  var firstPlayer = players[0]
  var lastPlayer = players[players.length - 1]

  players.slice(0, -1).map((p, i) => {
    p.on('ended', () => {
      players[i + 1].play()
    })
  })

  if (config.isActivated) {
    _t.once('play', () => {
      _t.activate()
    })
  }

  lastPlayer.on('ended', () => {
    _t.fire('ended')
  })

  _t.on('play', () => {
    firstPlayer.play()
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
    if (!isActivated) {
      players.map((p) => p.activate())
      _t.isActivated = true
    }
  })
}

export default Join