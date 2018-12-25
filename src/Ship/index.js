import {
  euclidDist,
  PLANET_COLORS,
  ONGOING_SHIPS_SPEED,
  PLANET_SIZE
} from '../Utils'

export default class Ship {
  constructor (originPlanetIndex, destPlanetIndex, planets, ctx) {
    const originPlanet = planets[originPlanetIndex]
    this.planets = planets
    this.originIndex = originPlanetIndex
    this.place = {
      x: originPlanet.place.x,
      y: originPlanet.place.y
    }
    this.side = originPlanet.side
    this.destIndex = destPlanetIndex
    this.number = originPlanet.number / 2
    this.ctx = ctx
  }
  march () {
    this.advance(ONGOING_SHIPS_SPEED)
  }

  render () {
    this.renderTail()
    this.renderBall()

    this.planets[this.originIndex].render()
    this.planets[this.destIndex].render()
  }
  renderBall () {
    const BALL_SIZE_CAP = 35

    let outerBallSize = BALL_SIZE_CAP * (this.number / 50.0)
    let innerBallsize = outerBallSize - 2
    if (innerBallsize < 1) innerBallsize = 1

    this.ctx.fillStyle = '#BBBBBB'
    this.ctx.beginPath()
    this.ctx.arc(this.place.x, this.place.y, outerBallSize, 0, 2 * Math.PI)
    this.ctx.fill()

    this.ctx.fillStyle = PLANET_COLORS[this.side].back
    this.ctx.beginPath()
    this.ctx.arc(this.place.x, this.place.y, innerBallsize, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  renderTail () {
    const TAIL_LENGTH = 70
    let destPlace = this.planets[this.destIndex].place
    let originPlace = this.planets[this.originIndex].place
    let backDist = euclidDist(originPlace, this.place)
    let tailLength = TAIL_LENGTH
    if (tailLength > backDist) tailLength = backDist

    let longOffsetX = destPlace.x - this.place.x
    let longOffsetY = destPlace.y - this.place.y

    let longDist = euclidDist(destPlace, this.place)

    let stepX = tailLength * longOffsetX / longDist
    let stepY = tailLength * longOffsetY / longDist
    let tailEndX = this.place.x - stepX
    let tailEndY = this.place.y - stepY

    this.ctx.strokeStyle = '#BBBBBB'
    this.ctx.lineWidth = 3
    this.ctx.moveTo(this.place.x, this.place.y)
    this.ctx.lineTo(tailEndX, tailEndY)
    this.ctx.stroke()
  }

  advance (dist) {
    let destPlace = this.planets[this.destIndex].place
    let longOffsetX = destPlace.x - this.place.x
    let longOffsetY = destPlace.y - this.place.y
    let longDist = euclidDist(destPlace, this.place)
    let stepX = dist * longOffsetX / longDist
    let stepY = dist * longOffsetY / longDist

    if (longDist >= dist) {
      this.place.x += stepX
      this.place.y += stepY
    }
  }

  checkArrival () {
    let dest = this.planets[this.destIndex]
    if (euclidDist(this.place, dest.place) < PLANET_SIZE) {
      if (this.side !== dest.side) {
        // invasion and battle
        if (this.number > dest.number) {
          // invasion win
          dest.number = this.number - dest.number
          dest.side = this.side
        } else {
          // defense win
          dest.number -= this.number
        }
      } else {
        // reinforcement
        dest.number += this.number
      }
      if (dest.number > 99) dest.number = 99
      this.finished = true
    }
  }
}
