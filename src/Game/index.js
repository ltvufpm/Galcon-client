import {
  euclidDist,
  PLANET_SIZE,
  getPlanetColors,
  COLORS,
  SCREEN_WIDTH,
  isPointInsideCircle
} from '../Utils'
import { PlanetManager } from '../Planet/PlanetManager';
import DummyPlayer from '../DummyPlayer'
import Ship from '../Ship/index'
import Base from '../Base'
import { TouchableImage } from '../Touchable'

export default class Game extends Base {
  constructor (parent) {
    super(parent)
    this.ctx.colors = getPlanetColors()
    this.planets = PlanetManager.generatePlanets(10, 50, this.ctx, this.canvas)
    this.ongoingShips = [];
    this.fromPlanets = [];
    this.victory = null
    this.dummy = new DummyPlayer(this)
    this.power = 0.5;
    this.setOriginPlayerPlanets(2)

    this.touchables = [
      new TouchableImage(this.ctx, SCREEN_WIDTH - 125, 5, 'cogs', this.handleCogsClicked.bind(this)),
      new TouchableImage(this.ctx, SCREEN_WIDTH - 80, 8, 'redo', this.handleRedoClicked.bind(this), 25),
      new TouchableImage(this.ctx, SCREEN_WIDTH - 40, 5, 'sign-out', this.handleSignOutClicked.bind(this)),
    ];
  }
  setOriginPlayerPlanets (playerCount) {
    for (let i = 0; i < playerCount; i++) {
      this.planets[i].number = 50
      this.planets[i].side = i + 1
    }
  }
  handleCogsClicked() {}
  handleRedoClicked() {
    this.parent.goToPage('game', true);
  }
  handleSignOutClicked() {
    this.parent.goToPage('welcome');
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
    if (playerDomainCount[1] === 0) this.victory = 'Dummy wins'
    else if (playerDomainCount[2] === 0) this.victory = 'Player wins'
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
    // this.renderHalfCommand()
    this.renderVictory()
    this.renderPower()
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
    this.ctx.fillStyle = this.ctx.colors[1].fill
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('Player', 10, 20)

    this.ctx.fillStyle = COLORS.PINK
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('vs.', 110, 20)

    this.ctx.fillStyle = this.ctx.colors[2].fill
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('Dummy', 160, 20)
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
  renderPower () {
    this.ctx.fillStyle = COLORS.GRAY1
    this.ctx.font = '25px Courier'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(`${this.power * 100}%`, 10, 740)
  }
  updatePower() {
    this.power += 0.25;
    if (this.power > 1) {
      this.power = 0;
    }
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
