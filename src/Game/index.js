import {
  randBetween,
  euclidDist,
  PLANET_SIZE,
  getPlanetColors,
  COLORS
} from '../Utils'
import Planet from '../Planet'
import DummyPlayer from '../DummyPlayer'
import Ship from '../Ship/index'

function generatePlanets (count, distanceTolerance, ctx, canvas) {
  function getRandomPlace () {
    let t = distanceTolerance
    return {
      x: randBetween(t, canvas.width - t),
      y: randBetween(t, canvas.height - t)
    }
  }

  function isReasonablePlanetPlace (place) {
    for (let i = 0; i < planets.length; i++) {
      let distance = euclidDist(planets[i].place, place)
      if (distance < distanceTolerance * 2) return false
    }
    return true
  }

  function getNewPlanet () {
    let place = getRandomPlace()
    while (!isReasonablePlanetPlace(place)) {
      place = getRandomPlace()
    }
    return new Planet(place, ctx)
  }

  let planets = []
  for (let i = 0; i < count; i++) {
    planets.push(getNewPlanet())
  }
  return planets
}

function hitPlanet (x, y, planets) {
  let mousePlace = {
    x: x,
    y: y
  }
  for (let i = 0; i < planets.length; i++) {
    if (euclidDist(mousePlace, planets[i].place) < PLANET_SIZE) {
      return i
    }
  }
  return -1
}

export default class Game {
  constructor (canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.ctx.colors = getPlanetColors()
    this.planets = generatePlanets(10, 50, ctx, canvas)
    this.ongoingShips = []
    this.halfCommand = null
    this.currentMousePlace = {
      x: 0,
      y: 0
    }
    this.victory = null
    this.dummy = new DummyPlayer(this)
    this.setOriginPlayerPlanets(2)
  }
  setOriginPlayerPlanets (playerCount) {
    for (let i = 0; i < playerCount; i++) {
      this.planets[i].number = 50
      this.planets[i].side = i + 1
    }
  }
  update () {
    if (this.victory) return

    this.updateVictory()
    this.updateOngoingShips()
    this.updatePlanets()

    let command = this.dummy.performFrameTurn()
    if (command) this.executeCommand(command)
  }

  updateVictory () {
    let playerDomainCount = [0, 0, 0]
    for (let i = 0; i < this.planets.length; i++) {
      playerDomainCount[this.planets[i].side]++
    }
    if (playerDomainCount[1] === 0) this.victory = 'Dummy wins'
    else if (playerDomainCount[2] === 0) this.victory = 'Player wins'
    else this.victory = null
  }
  updateOngoingShips () {
    this.marchShips()
    this.checkShipsArrival()
    this.removeFinishedShips()
  }
  updatePlanets () {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].grow()
    }
  }
  marchShips () {
    for (let i = 0; i < this.ongoingShips.length; i++) {
      this.ongoingShips[i].march()
    }
  }

  checkShipsArrival () {
    for (let i = 0; i < this.ongoingShips.length; i++) {
      this.ongoingShips[i].checkArrival()
    }
  }
  removeFinishedShips () {
    let remainingShips = []
    for (let i = 0; i < this.ongoingShips.length; i++) {
      let t = this.ongoingShips[i]
      if (!t.finished) remainingShips.push(t)
    }
    this.ongoingShips = remainingShips
  }
  render () {
    this.renderSides()
    this.renderplanets()
    this.renderOngoingShips()
    this.renderHalfCommand()
    this.renderVictory()
  }
  renderplanets () {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].render()
    }
  }
  renderOngoingShips () {
    for (let i = 0; i < this.ongoingShips.length; i++) {
      this.ongoingShips[i].render()
    }
  }
  renderHalfCommand () {
    if (this.halfCommand) {
      for (let i = 0; i < this.halfCommand.originIndexes.length; i++) {
        let originPlace = this.planets[this.halfCommand.originIndexes[i]].place
        this.ctx.strokeStyle = COLORS.GRAY0
        this.ctx.lineWidth = 1
        this.ctx.moveTo(originPlace.x, originPlace.y)
        this.ctx.lineTo(this.currentMousePlace.x, this.currentMousePlace.y)
        this.ctx.stroke()
      }
    }
  }
  renderSides () {
    this.ctx.fillStyle = this.ctx.colors[1].fill
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('Player', 10, 20)

    this.ctx.fillStyle = COLORS.PINK
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('vs.', 110, 20)

    this.ctx.fillStyle = this.ctx.colors[2].fill
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('Dummy', 160, 20)
  }
  renderVictory () {
    if (this.victory) {
      this.ctx.fillStyle = COLORS.PURPLE0
      this.ctx.font = '57px Courier'
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillText(
        this.victory,
        this.canvas.width / 2,
        this.canvas.height / 2
      )
    }
  }
  executeCommand (command) {
    for (let i = 0; i < command.originIndexes.length; i++) {
      let s = this.planets[command.originIndexes[i]]
      let ship = new Ship(
        command.originIndexes[i],
        command.destIndex,
        this.planets,
        this.ctx,
        this.canvas
      )
      this.ongoingShips.push(ship)
      s.number /= 2
    }
  }
  mouseDown (x, y) {
    if (this.victory) return
    if (!this.halfCommand) {
      let sIndex = hitPlanet(x, y, this.planets)
      if (sIndex >= 0 && this.planets[sIndex].side === 1) {
        // side 1 is player
        this.halfCommand = {
          originIndexes: [sIndex]
        }
      }
    }
  }
  mouseUp (x, y) {
    if (this.victory) return

    if (this.halfCommand) {
      let sIndex = hitPlanet(x, y, this.planets)
      let originIndexes = this.halfCommand.originIndexes
      if (sIndex >= 0 && originIndexes.indexOf(sIndex) < 0) {
        // execute half command to attack alien planet
        let command = {
          originIndexes: originIndexes,
          destIndex: sIndex
        }
        this.executeCommand(command)
        this.halfCommand = null
      } else if (
        sIndex >= 0 &&
        originIndexes.indexOf(sIndex) === originIndexes.length - 1
      ) {
        // execute half command to reinforce own planet
        let command = {
          originIndexes: originIndexes.slice(0, originIndexes.length - 1),
          destIndex: sIndex
        }
        this.executeCommand(command)
        this.halfCommand = null
      } else {
        // cancel halfCommand
        this.halfCommand = null
      }
    }
  }
  mouseMove (x, y) {
    if (this.victory) return

    this.currentMousePlace = {
      x: x,
      y: y
    }

    if (this.halfCommand) {
      let sIndex = hitPlanet(x, y, this.planets)
      if (
        sIndex >= 0 &&
        this.planets[sIndex].side === 1 && // side 1 is player
        this.halfCommand.originIndexes.indexOf(sIndex) < 0
      ) {
        this.halfCommand.originIndexes.push(sIndex)
      }
    }
  }
}
