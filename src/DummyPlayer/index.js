import { randBetween } from '../Utils'
const AUTO_COMMAND_INTERVAL = 200

export default class DummyPlayer {
  constructor (game) {
    this.frameCounter = 0
    this.game = game
  }

  performFrameTurn () {
    this.updateFrameCounter()
    if (this.frameCounter % AUTO_COMMAND_INTERVAL === 0) {
      return this.generateRandomCommand()
    } else {
      return null
    }
  }
  updateFrameCounter () {
    this.frameCounter++
    if (this.frameCounter > 1000 * 1000) this.frameCounter = 0
  }
  generateRandomCommand () {
    let side = randBetween(2, 3)
    let occupiedPlanets = []
    let planets = this.game.planets
    for (let i = 0; i < planets.length; i++) {
      let s = planets[i]
      if (s.side === side) occupiedPlanets.push(i)
    }
    let originIndex = occupiedPlanets[randBetween(0, occupiedPlanets.length)]
    let destIndex = randBetween(0, planets.length)
    while (destIndex === originIndex) {
      destIndex = randBetween(0, planets.length)
    }
    return {
      originIndexes: [originIndex],
      destIndex: destIndex
    }
  }
}
