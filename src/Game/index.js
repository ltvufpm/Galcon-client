import {
  euclidDist,
  PLANET_SIZE,
  getPlanetColors,
  COLORS,
  SCREEN_WIDTH,
  POWER_VALUES,
  isPointInsideCircle
} from '../Utils'
import {
  addRecord
} from '../Utils/storage'
import { PlanetManager } from '../Planet/PlanetManager';
import DummyPlayer from '../DummyPlayer'
import Ship from '../Ship/index'
import Base from '../Base'
import {
  TouchableImage,
  TouchableText
} from '../Touchable'
import User from '../User';


export default class Game extends Base {
  constructor (parent) {
    super(parent)
    this.ctx.colors = getPlanetColors(User.planetColor)
    this.planets = PlanetManager.generatePlanets(User.getPlanetsCount(), 50, this.ctx, this.canvas)
    this.ongoingShips = []
    this.fromPlanets = [];
    this.victory = null
    this.dummy = new DummyPlayer(this);
    this.powerIndex = User.power;
    this.power = POWER_VALUES[this.powerIndex];
    this.setOriginPlayerPlanets(2)

    this.touchables = [
      new TouchableImage(this.ctx, SCREEN_WIDTH - 125, 5, 'cogs', this.handleCogsClicked.bind(this)),
      new TouchableImage(this.ctx, SCREEN_WIDTH - 80, 8, 'redo', this.handleRedoClicked.bind(this), 25),
      new TouchableImage(this.ctx, SCREEN_WIDTH - 40, 5, 'sign-out', this.handleSignOutClicked.bind(this)),
      new TouchableText(this.ctx, 10, 740, `${this.power * 100}%`, this.updatePower.bind(this))
    ];
  }
  setOriginPlayerPlanets (playerCount) {
    for (let i = 0; i < playerCount; i++) {
      this.planets[i].number = 50
      this.planets[i].side = i + 1
    }
  }
  handleRedoClicked() {
    this.parent.goToPage('game', true);
  }
  handleSignOutClicked() {
    this.parent.goToPage('welcome');
  }
  handleCogsClicked() {
    this.parent.goToPage('settings');
  }
  renderManagementPanel() {
    for (const touchable of this.touchables) touchable.draw();
  }
  update () {
    if (this.victory) return

    this.updateVictory()
    this.updateOngoingShips()
    this.updatePlanets()

    let command = this.dummy.performFrameTurn()
    if (command) this.executeCommand(command)
  }

  updateVictory () {
    let playerDomainCount = [0, 0, 0]
    for (let i = 0; i < this.planets.length; i++) {
      playerDomainCount[this.planets[i].side]++
    }
    if (playerDomainCount[1] === 0) {
      this.victory = 'Dummy wins'
      addRecord('Dummy', playerDomainCount[2])
    }
    else if (playerDomainCount[2] === 0) {
      this.victory = `${User.playerName} wins`
      addRecord(User.playerName, playerDomainCount[1])

    }
    else this.victory = null
  }
  updateOngoingShips () {
    this.marchShips()
    this.checkShipsArrival()
    this.removeFinishedShips()
  }
  updatePlanets () {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].grow()
    }
  }
  marchShips () {
    for (let i = 0; i < this.ongoingShips.length; i++) {
      this.ongoingShips[i].march()
    }
  }

  checkShipsArrival () {
    for (let i = 0; i < this.ongoingShips.length; i++) {
      this.ongoingShips[i].checkArrival()
    }
  }
  removeFinishedShips () {
    let remainingShips = []
    for (let i = 0; i < this.ongoingShips.length; i++) {
      let t = this.ongoingShips[i]
      if (!t.finished) remainingShips.push(t)
    }
    this.ongoingShips = remainingShips
  }
  render () {
    this.renderSides()
    this.renderplanets()
    this.renderOngoingShips()
    this.renderVictory()
    this.renderManagementPanel()
  }
  renderplanets () {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].render()
    }
  }
  renderOngoingShips () {
    for (let i = 0; i < this.ongoingShips.length; i++) {
      this.ongoingShips[i].render()
    }
  }

  renderSides () {
    let tw = this.ctx.measureText(User.playerName).width;
    this.ctx.fillStyle = this.ctx.colors[1].fill
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(User.playerName, 10, 20)

    this.ctx.fillStyle = COLORS.PINK
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('vs.', tw + 20, 20)

    tw += this.ctx.measureText('vs.').width;

    this.ctx.fillStyle = this.ctx.colors[2].fill
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('Dummy', tw + 25, 20)
  }
  renderVictory () {
    if (this.victory) {
      this.ctx.fillStyle = COLORS.PURPLE0
      this.ctx.font = '57px Courier'
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillText(
        this.victory,
        this.canvas.width / 2,
        this.canvas.height / 2
      )
    }
  }
  updatePower() {
    this.powerIndex += 1;
    if (this.powerIndex >= POWER_VALUES.length) this.powerIndex = 0;
    this.power = POWER_VALUES[this.powerIndex];
    this.touchables[3].setText(`${this.power * 100}%`);
  }
  executeCommand (command) {
    if (!this.power) return;
    for (let i = 0; i < command.originIndexes.length; i++) {
      let s = this.planets[command.originIndexes[i]]
      let ship = new Ship(
        command.originIndexes[i],
        command.destIndex,
        this.planets,
        this.ctx,
        this.canvas,
        this.power
      )
      this.ongoingShips.push(ship)
      s.number *= (1 - this.power);
    }
  }
  mouseClick (x, y) {
    super.mouseClick(x, y);

    const selectedPlanet = this.getPlanetByPoint(x, y);

    if(!selectedPlanet) return;

    if(selectedPlanet.side !== 1) {
      if(this.fromPlanets.length === 0) return;

      return this.attach(selectedPlanet);
    }

    if(selectedPlanet.isSelected) {
      selectedPlanet.unSelect();
      this.fromPlanets = this.fromPlanets.filter(p => p.id !== selectedPlanet.id);

      return;
    }

    selectedPlanet.select();
    this.fromPlanets = this.fromPlanets.concat(selectedPlanet);
  }

  mouseDoubleClick(x, y) {
    const selectedPlanet = this.getPlanetByPoint(x, y);

    if(!selectedPlanet || selectedPlanet.side !== 1) return;

    this.fromPlanets = this.planets.filter(p => p.side === 1);
    this.fromPlanets.forEach(p => p.select());
  }

  attach(destPlanet) {
    if (this.victory) return;

    const planetIds = this.planets.map(p => p.id);

    const originIndexes = this.fromPlanets
      .map(p => planetIds.indexOf(p.id));
    const destIndex = planetIds.indexOf(destPlanet.id);

    this.executeCommand({
      originIndexes,
      destIndex
    });

    this.fromPlanets.forEach(p => p.unSelect());
    this.fromPlanets = [];
  }

  getPlanetByPoint(x, y) {
    const planets = this.planets.filter(planet => isPointInsideCircle({x, y}, planet.place, planet.computeSize()));

    return planets.length > 0 && planets[0];
  }
}
