import Game from './Game'
import Welcome from './Welcome';
import Settings from './Settings';
import Timer from './Timer'
import { COLORS } from './Utils'

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  new Canvas(canvas, ctx, 'welcome');
}

class Canvas {
  constructor(canvas, ctx, defaultPageId) {
    this.canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')

    this.timer = new Timer(60, 0.05, ctx);
    this.goToPage(defaultPageId);

    this.addEventListeners();
    this.mainLoop();
  }

  addEventListeners () {
    this.canvas.addEventListener('mousedown', e => this.page.mouseDown(e.offsetX, e.offsetY))
    this.canvas.addEventListener('mouseup', e => this.page.mouseUp(e.offsetX, e.offsetY))
    this.canvas.addEventListener('mousemove', e => this.page.mouseMove(e.offsetX, e.offsetY))
    window.addEventListener('keydown', e => this.page.keyDown(e.keyCode, e.key));
  }

  goToPage(pageId, force = false) {
    if (!force && this.currentPage === pageId) return;

    switch (pageId) {
      case 'game':
        this.page = new Game(this);
        this.currentPage = 'game';
        break;
      case 'welcome':
        this.page = new Welcome(this);
        this.currentPage = 'welcome';
        break;
      case 'settings':
        this.page = new Settings(this);
        this.currentPage = 'settings';
        break;
      default:
        break;
    }
  }

  clearScreen() {
    this.ctx.fillStyle = COLORS.BLUE2
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  mainLoop (timer, page) {
    this.timer.beginFrame()
    this.clearScreen()
    this.page.update()
    this.page.render()
    this.timer.endFrame()
    setTimeout(() => {
      this.mainLoop()
    }, this.timer.shouldDelay)
  }
}
