import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  COLORS,
  PLANET_COLORS,
  POWER_VALUES,
  PLANETS_COUNT,
  SPEED
} from '../Utils';
import {
  getStatistics
} from '../Utils/storage';

import Input from '../Input';
import ColorSelector from '../Selector/ColorSelector';
import TextSelector from '../Selector/TextSelector';

import Base from '../Base';
import { TouchableImage, TouchableRect } from '../Touchable'
import User from '../User';

const ww = SCREEN_WIDTH / 2;
const wh = SCREEN_HEIGHT / 2;

export default class Settings extends Base {
  constructor (parent) {
    super(parent);

    this.statistics = getStatistics();

    const height = 200;

    this.touchables = [
      new TouchableImage(this.ctx, SCREEN_WIDTH - 40, 5, 'sign-out', this.handleSignOutClicked.bind(this)),
    ];
  }

  handleSignOutClicked() {
    this.parent.goToPage('welcome');
  }

  renderHeadline() {
    this.ctx.fillStyle = COLORS.WHITE;
    this.ctx.font = '50px Courier'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('Statistics', 1024 / 2, 200);
  }

  renderTable () {
    const startY = 300;
    const startX = 1024 / 2 - 180;
    let offsetY = 0;

    const colorsPalette = [COLORS.PURPLE, COLORS.GREEN0, COLORS.BLUE0, COLORS.YELLOW];
    this.ctx.font = '36px Courier';
    this.ctx.fillStyle = COLORS.BLUE;
    this.ctx.textAlign = 'left';

    this.statistics.forEach((record, i) => {
      this.ctx.fillStyle = colorsPalette[i % colorsPalette.length]
      this.ctx.fillText(record.user, startX, startY + offsetY);
      this.ctx.fillText(record.value, startX + 300, startY + offsetY);
      offsetY += 50;
    })
  }

  render() {
    this.renderLogo();
    this.renderHeadline()
    this.renderTable()
    this.touchables.forEach(touchable => touchable.draw())
  }

  handleStartGameBtnPressed() {
    this.parent.goToPage('game');
  }

  renderLogo() {
    const logo = document.getElementById('logo')
    this.ctx.drawImage(logo, ww - 93, 56);
  }
}
