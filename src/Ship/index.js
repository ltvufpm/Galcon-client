import {
  euclidDist,
  ONGOING_SHIPS_SPEED,
  PLANET_SIZE,
  randBetween,
  SPEED
} from '../Utils'

import User from '../User';

export default class Ship {
  constructor (originPlanetIndex, destPlanetIndex, planets, ctx, canvas, power) {
    const originPlanet = planets[originPlanetIndex]
    this.planets = planets
    this.originIndex = originPlanetIndex
    this.place = {
      x: originPlanet.place.x,
      y: originPlanet.place.y
    }
    this.side = originPlanet.side
    this.destIndex = destPlanetIndex
    this.number = originPlanet.number * (originPlanet.side === 1 ? power : 0.5)
    this.ctx = ctx
    this.canvas = canvas

    this.swarm = this.generateSwarm()
  }

  generateSwarm () {
    let res = []
    for (let i = 0; i < this.number; i++) {
      res.push({
        x: randBetween(this.place.x, this.place.x - 50),
        y: randBetween(this.place.y, this.place.y - 50)
      })
    }
    return res
  }

  march () {
    this.advance(SPEED[User.speed])
  }

  render () {
    this.renderTail()
    this.renderBall()
    this.planets[this.originIndex].render()
    this.planets[this.destIndex].render()
  }
  renderSmallBall (x, y) {
    const BALL_SIZE = 5
    this.ctx.fillStyle = this.ctx.colors[this.side].fill
    this.ctx.beginPath()
    this.ctx.arc(x, y, BALL_SIZE, 0, 2 * Math.PI)
    this.ctx.fill()
  }
  renderBall () {
    const BALL_SIZE = 5
    this.ctx.fillStyle = this.ctx.colors[this.side].fill
    this.ctx.beginPath()
    this.ctx.arc(
      this.place.x - 25,
      this.place.y - 25,
      BALL_SIZE,
      0,
      2 * Math.PI
    )
    this.ctx.fill()
  }

  renderTail () {
    this.swarm.map(({ x, y }) => this.renderSmallBall(x, y))
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
      for (let swarmling of this.swarm) {
        swarmling.x += stepX
        swarmling.y += stepY
      }
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
          dest.unSelect();
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
