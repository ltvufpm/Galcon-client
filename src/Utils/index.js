export function euclidDist (p1, p2) {
  let dx = p1.x - p2.x
  let dy = p1.y - p2.y
  return Math.sqrt(dx * dx + dy * dy)
}
export function randBetween (lo, hi) {
  return Math.floor(lo + Math.random() * (hi - lo))
}
export const COLORS = {
  RED: '#FF0000',
  RED0: '#FF4444',
  GREEN: '#00FF00',
  BLUE: '#0000FF',
  BLUE0: '#000099',
  BLUE1: '#2222DD',
  BLUE2: '#000033',
  BLACK: '#000000',
  GRAY0: '#666666',
  GRAY1: '#AAAAAA',
  GRAY2: '#DDDDDD'
}

export const PLANET_SIZE = 25
export const BIG_PLANET_SIZE = 60
export const SMALL_PLANET_SIZE = 25
export const PLANET_COLORS = [
  {
    front: COLORS.BLUE0,
    back: COLORS.GRAY1
  },
  {
    front: COLORS.GRAY2,
    back: COLORS.BLUE1
  },
  {
    front: COLORS.BLUE0,
    back: COLORS.RED0
  }
]
export const PLANET_GROW_RATE = 0.03
export const ONGOING_SHIPS_SPEED = 0.8
