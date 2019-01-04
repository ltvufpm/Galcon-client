import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  COLORS,
  isPointInsideArea
} from '../Utils';

import Base from '../Base';

const ww = SCREEN_WIDTH / 2;
const wh = SCREEN_HEIGHT / 2;

export default class Welcome extends Base {
  constructor (parent) {
    super(parent);

    this.breackpoints = {
      startGameBtn : [
        { x:412, y:584 }, { x:612, y:654 }
      ]
    };

    this.mouseUpHandlers = {
      startGameBtn: this.handleStartGameBtnPressed.bind(this)
    };

    this.mouseMoveHandlers = {
      startGameBtn: this.handleStartGameBtnHover.bind(this)
    };

    this.startButtonColor = COLORS.RED;
    this.isStartBtnHover = false;
  }

  render() {
    this.renderLogo();
    this.renderStartButton();
  }

  update() {}

  mouseUp(x, y) {
    for (const key in this.breackpoints) {
      if (isPointInsideArea({ x, y }, this.breackpoints[key])) {
        if (this.mouseUpHandlers[key]) this.mouseUpHandlers[key]();
        return;
      }
    }
  }

  mouseMove(x, y) {
    for (const key in this.breackpoints) {
      if (isPointInsideArea({ x, y }, this.breackpoints[key])) {
        if (this.mouseMoveHandlers[key]) this.mouseMoveHandlers[key]();
        return;
      }
    }
    this.startButtonColor = COLORS.RED;
    this.isStartBtnHover = false;
  }

  handleStartGameBtnPressed() {
    this.parent.goToPage('game');
  }

  handleStartGameBtnHover() {
    const { RED, BLUE2, ...colors } = COLORS;

    if (!this.isStartBtnHover) {
      const keys  = Object.keys(colors);
      const index = Math.round(Math.random() * (keys.length - 1));
      
      this.startButtonColor = COLORS[keys[index]];
      this.isStartBtnHover = true;
    }
  }

  renderLogo() {
    const logo = document.getElementById('logo')
    this.ctx.drawImage(logo, ww - 93, wh - 56);
  }

  renderNameInput() {
    this.ctx.fillStyle = COLORS.BLUE3
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('Name', ww,  wh)
  }

  renderStartButton() {
    this.ctx.fillStyle = this.startButtonColor;
    this.ctx.fillRect(ww - 100, wh + 200, 200, 70)

    const textWidth = this.ctx.measureText('START GAME').width

    this.ctx.fillStyle = COLORS.WHITE
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('START GAME', ww - textWidth/2, wh + 235)
  }
}
