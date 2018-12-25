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
  ORANGE: '#ffaa22',
  YELLOW: '#FFFF00',
  GREEN: '#00FF00',
  GREEN0: '#00cc00',
  GREEN1: '#003300',
  GREEN2: '#aaffaa',
  BLUE: '#0000FF',
  BLUE0: '#000099',
  BLUE1: '#2222DD',
  BLUE2: '#000033',
  BLUE3: '#8888FF',
  PINK: '#FF00FF',
  PURPLE: '#990099',
  PURPLE0: '#ff0055',
  BLACK: '#000000',
  GRAY0: '#666666',
  GRAY1: '#AAAAAA',
  GRAY2: '#DDDDDD',
  WHITE: '#FFFFFF'
}

export const PLAYER_COLOR_PAIRS = [
  [COLORS.RED0, COLORS.BLUE3],
  [COLORS.GREEN2, COLORS.PURPLE],
  [COLORS.ORANGE, COLORS.GREEN0]
]

export const PLANET_SIZE = 25
export const BIG_PLANET_SIZE = 60
export const SMALL_PLANET_SIZE = 25

export function getPlanetColors () {
  const pair = PLAYER_COLOR_PAIRS[randBetween(0, 2)]
  return [
    {
      // neutral
      caption: COLORS.BLUE0,
      fill: COLORS.GRAY1
    },
    {
      // friendly
      caption: COLORS.GREEN1,
      fill: pair[0]
    },
    {
      // hostile
      caption: COLORS.WHITE,
      fill: pair[1]
    }
  ]
}
export const PLANET_GROW_RATE = 0.03
export const ONGOING_SHIPS_SPEED = 0.8
