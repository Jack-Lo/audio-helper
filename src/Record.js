import Player from './Player'

export default class Record {
  constructor(options) {
    this.config = options
  }

  init () {
    return new Player(this.config)
  }
}