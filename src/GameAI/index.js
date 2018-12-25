import { randBetween } from '../Utils'

export default function GameAI (game) {
  let self = this
  const AUTO_COMMAND_INTERVAL = 200

  self.frame_counter = 0
  self.game = game

  self.perform_frame_turn = function () {
    self.update_frame_counter()

    if (self.frame_counter % AUTO_COMMAND_INTERVAL === 0) {
      return self.generate_random_command()
    } else {
      return null
    }
  }

  self.update_frame_counter = function () {
    self.frame_counter++
    if (self.frame_counter > 1000 * 1000) self.frame_counter = 0
  }

  self.generate_random_command = function () {
    let side = randBetween(2, 3)
    let occupiedPlanets = []
    let planets = self.game.planets
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
