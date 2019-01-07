import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  COLORS,
  isPointInsideArea
} from '../Utils';

import Input from '../Input';

import Base from '../Base';
import { TouchableRect } from '../Touchable';

const ww = SCREEN_WIDTH / 2;
const wh = SCREEN_HEIGHT / 2;

export default class Settings extends Base {
  constructor (parent) {
    super(parent);

    this.playerName = localStorage.getItem('playerName') || 'Player';

    this.touchables = [
      new TouchableRect(this.ctx, ww - 100, wh + 200, 200, 70, 'Settings', this.handleStartGameBtnPressed.bind(this)),
      new Input(this.ctx, 'center', 250, 'Name: ', this.playerName, this.handleSavePlayerName.bind(this))
    ];
  }

  render() {
    this.renderLogo();
    for (const touchable of this.touchables) touchable.draw();
  }

  handleSavePlayerName(name) {
    this.playerName = name;
    localStorage.setItem('playerName', name);
  }

  handleStartGameBtnPressed() {
    this.parent.goToPage('game');
  }

  renderLogo() {
    const logo = document.getElementById('logo')
    this.ctx.drawImage(logo, ww - 93, 56);
  }

  renderNameInput() {
    this.ctx.fillStyle = COLORS.BLUE3
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('Name', ww,  wh)
  }
}
