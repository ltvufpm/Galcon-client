import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  COLORS,
  PLANET_COLORS,
  POWER_VALUES
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

    this.touchables = [
      new TouchableRect(this.ctx, ww - 100, wh + 200, 200, 70, 'START GAME', this.handleStartGameBtnPressed.bind(this)),
      new Input(this.ctx, 'center', 250, 'Name: ', User.playerName, User.setPlayerName.bind(User)),
      new ColorSelector(this.ctx, 'Planet Color:', 400, 300, PLANET_COLORS, User.planetColor, User.setPlanetColor.bind(User)),
      new TextSelector(this.ctx, 'Default Power:', 400, 400, POWER_VALUES, User.power, User.setPower.bind(User))
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
