import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  COLORS,
  PLANET_COLORS,
  POWER_VALUES,
  PLANETS_COUNT,
  SPEED
} from '../Utils';

import Input from '../Input';
import ColorSelector from '../Selector/ColorSelector';
import TextSelector from '../Selector/TextSelector';

import Base from '../Base';
import { TouchableRect } from '../Touchable';
import User from '../User';

const ww = SCREEN_WIDTH / 2;
const wh = SCREEN_HEIGHT / 2;

export default class Settings extends Base {
  constructor (parent) {
    super(parent);

    const height = 200;

    this.touchables = [
      new TouchableRect(this.ctx, ww - 100, wh + 200, 200, 70, 'START GAME', this.handleStartGameBtnPressed.bind(this)),
      new Input(this.ctx, 400, height, 'Name: ', User.playerName, User.setPlayerName.bind(User)),
      new ColorSelector(this.ctx, 'Planet Color:', 400, height + 50, PLANET_COLORS, User.planetColor, User.setPlanetColor.bind(User)),
      new TextSelector(this.ctx, 'Default Power:', 400, height + 150, POWER_VALUES.map(item => `${item * 100}%`), User.power, User.setPower.bind(User)),
      new TextSelector(this.ctx, 'Planets Count:', 400, height + 200, PLANETS_COUNT, User.planetsCount, User.setPlanetsCount.bind(User), 40),
      new TextSelector(this.ctx, 'Speed:', 400, height + 250, Object.keys(SPEED), Object.keys(SPEED).indexOf(User.speed), User.setSpeed.bind(User), 80)
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
    this.ctx.drawImage(logo, ww - 93, 56);
  }
}
