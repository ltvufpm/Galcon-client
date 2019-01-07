class User {
    constructor() {
        this.playerName = localStorage.getItem('playerName') || 'Player';
        this.planetColor = localStorage.getItem('planetColor') || 0;
        this.power = localStorage.getItem('power') || POWER_VALUES.indexOf(0.5);
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
}

export default new User();