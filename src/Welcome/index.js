import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  COLORS,
  isPointInsideArea
} from '../Utils';

import Base from '../Base';
import { TouchableRect } from '../Touchable';

const ww = SCREEN_WIDTH / 2;
const wh = SCREEN_HEIGHT / 2;

export default class Welcome extends Base {
  constructor (parent) {
    super(parent);

    this.touchables = [
      new TouchableRect(this.ctx, ww - 100, wh + 200, 200, 70, 'START GAME', this.handleStartGameBtnPressed.bind(this))
    ];
  }

  render() {
    this.renderLogo();
    for (const touchable of this.touchables) touchable.draw();
  }

  handleStartGameBtnPressed() {
    this.parent.goToPage('game');
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
}
