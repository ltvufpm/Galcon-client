import { euclidDist, randBetween } from '../Utils'
import Planet from './index'

export class PlanetManager {
  static generatePlanets(count, distanceTolerance, ctx, canvas) {
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
}