import * as Phaser from 'phaser';
import Sprite = Phaser.GameObjects.Sprite;

const GAME_HEIGHT: number = 600;
const GAME_WIDTH: number = 800;

export interface IGalconGame {
	start(): void;
}

export class GalconGame implements IGalconGame{
	private readonly _gameConfig: GameConfig = {
		type: Phaser.AUTO,
		width: GAME_WIDTH,
		height: GAME_HEIGHT,
		parent: 'root',
		scene: {
			preload: function() {
				this.load.image('preloader', './img/galcon-preloader.jpg');
			},
			create: function () {
				const logo: Sprite = this.add.sprite(GAME_WIDTH/2, GAME_HEIGHT/2, 'preloader');
				logo.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
			},
		}
	};
	private static _instance: IGalconGame = undefined;
	private _game: Phaser.Game;

	private constructor() { };

	static instance(): IGalconGame {
		if (!this._instance) {
			this._instance = new GalconGame();
		}
		return this._instance;
	}

	start(): void {
		this._game = new Phaser.Game(this._gameConfig);
	}
}