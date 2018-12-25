import Game from './Game'
import Timer from './Timer'
import { COLORS } from './Utils'

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  startMainLoop(canvas, ctx)
}

function addEventListeners (game, canvas) {
  canvas.addEventListener('mousedown', e =>
    game.mouseDown(e.offsetX, e.offsetY)
  )
  canvas.addEventListener('mouseup', e => game.mouseUp(e.offsetX, e.offsetY))
  canvas.addEventListener('mousemove', e =>
    game.mouseMove(e.offsetX, e.offsetY)
  )
}

function startMainLoop (canvas, ctx) {
  let timer = new Timer(60, 0.05, ctx)
  let game = new Game(canvas, ctx)
  addEventListeners(game, canvas)
  mainLoop(timer, game)
}

function clearScreen (canvas, ctx) {
  ctx.fillStyle = COLORS.BLUE2
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function mainLoop (timer, game) {
  timer.beginFrame()
  clearScreen(game.canvas, game.ctx)
  game.update()
  game.render()
  timer.endFrame()
  setTimeout(() => {
    mainLoop(timer, game)
  }, timer.shouldDelay)
}
