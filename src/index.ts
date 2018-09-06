import { GalconGame, IGalconGame } from './app/galcon-game';

window.onload = () => {
	const galconGame: IGalconGame = GalconGame.instance();
	galconGame.start();
};