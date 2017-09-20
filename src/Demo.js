import Bus from 'on-fire'

export default class Demo {
  constructor(option) {
    super()

    this.config = option
  }

  _new() {
    var _t = this
    var option = _t.config
    var Constructor = _t.__proto__.constructor

    return new Constructor(option)
  }
}