import Planet from './planetEntity'

export default interface Group {
  id: number;
  amount: number;
  targetPlanet: Planet;
  sourcePlanet: Planet;
  arrivalTime: number;
  longitude: number;
  latitude: number;
}