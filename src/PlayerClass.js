import Bus from 'on-fire'

export default class PlayerClass extends Bus {
  constructor(...options) {
    super()

    this._args = options
    this.isActivated = false
  }

  copy() {
    var _t = this
    var { _args } = _t
    var Constructor = _t.__proto__.constructor

    return new Constructor(..._args)
  }

  play() {
    this.fire('play')
  }

  pause() {
    this.fire('pause')
  }

  stop() {
    this.fire('stop')
  }

  reset() {
    this.fire('reset')
  }

  activate() {
    this.fire('activate')
  }
}