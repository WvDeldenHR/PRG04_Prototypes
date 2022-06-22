import * as PIXI from "pixi.js";
import { Player } from "./player";

import backgroundImage from "./images/background_nl.png";
import playerImage from "./images/spacecraft.png";


export class Game {

    pixi: PIXI.Application;
    loader: PIXI.Loader;
    background: PIXI.Sprite;
    player: Player;

    constructor() {
        this.pixi = new PIXI.Application({
            width: screen.width,
            height: screen.height
        });
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader
            .add("backgroundTexture", backgroundImage)
            .add("playerTexture", playerImage);
        document.body.appendChild(this.pixi.view)

        this.loader.load(() => this.doneLoading());
    }


    doneLoading() {
        //Background
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        this.pixi.stage.addChild(this.background);

        //Player
        this.player = new Player(this, this.loader.resources["playerTexture"].texture!);
        this.pixi.stage.addChild(this.player);

        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        this.pixi.ticker.add((delta) => this.update(delta));
    }


    update(delta: number) {
        this.player.update(delta);
    }
}