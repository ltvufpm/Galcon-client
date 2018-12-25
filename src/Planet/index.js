import { PLANET_GROW_RATE, SMALL_PLANET_SIZE, BIG_PLANET_SIZE } from '../Utils'

export default class Planet {
  constructor (place, ctx) {
    this.place = {
      x: place.x,
      y: place.y
    }
    this.ctx = ctx
    this.side = 0
    this.number = 0
  }
  computeSize () {
    if (this.number < SMALL_PLANET_SIZE) return SMALL_PLANET_SIZE
    if (this.number > BIG_PLANET_SIZE) return BIG_PLANET_SIZE
    return this.number
  }
  render () {
    this.renderBall()
    if (this.side > 0) this.renderNumber()
  }
  renderBall () {
    this.ctx.fillStyle = this.ctx.colors[this.side].fill
    this.ctx.beginPath()
    this.ctx.arc(this.place.x, this.place.y, this.computeSize(), 0, 2 * Math.PI)
    this.ctx.fill()
  }
  renderNumber () {
    this.ctx.fillStyle = this.ctx.colors[this.side].caption
    this.ctx.font = '20px Courier'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(Math.floor(this.number), this.place.x, this.place.y)
  }
  grow () {
    if (this.side === 0) this.number = 0
    else if (this.number < 99) this.number += PLANET_GROW_RATE
    // else do nothing
  }
}
