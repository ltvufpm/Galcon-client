import { PLANETS_COUNT, SPEED, POWER_VALUES } from "../Utils";

class User {
    constructor() {
        this.playerName = localStorage.getItem('playerName') || 'Player';
        this.planetColor = localStorage.getItem('planetColor') || 0;
        this.power = +localStorage.getItem('power') || POWER_VALUES.indexOf(0.5);
        this.planetsCount = localStorage.getItem('planetsCount') || PLANETS_COUNT.indexOf(10);
        this.speed = localStorage.getItem('speed') || 'normal';
    }

    setPlayerName(name) {
        this.playerName = name;
        localStorage.setItem('playerName', name);
    }

    setPlanetColor(colorIndex) {
        this.planetColor = colorIndex;
        localStorage.setItem('planetColor', colorIndex);
    }

    setPower(powerIndex) {
        this.power = powerIndex;
        localStorage.setItem('power', powerIndex);
    }

    setPlanetsCount(planetsIndex) {
        this.planetsCount = planetsIndex;
        localStorage.setItem('planetsCount', planetsIndex);
    }

    getPlanetsCount() {
        return PLANETS_COUNT[this.planetsCount] || 10;
    }

    setSpeed(key) {
        this.speed = Object.keys(SPEED)[key];
        localStorage.setItem('speed', this.speed);
    }
}

export default new User();