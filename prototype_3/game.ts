import * as PIXI from "pixi.js";
import { UI } from "./interface";

import backgroundImage from "./images/background_nl.png";


export class Game {

    pixi: PIXI.Application;
    loader: PIXI.Loader;
    background: PIXI.Sprite;
    interface : UI;

    constructor() {
        this.pixi = new PIXI.Application({
            width: screen.width,
            height: screen.height
        });
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader
            .add("backgroundTexture", backgroundImage)
        document.body.appendChild(this.pixi.view)

        this.loader.load(() => this.doneLoading());
    }


    doneLoading() {
        //Background
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        this.pixi.stage.addChild(this.background);

        //UI
        this.interface = new UI(this);
        this.pixi.stage.addChild(this.interface);

        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        this.pixi.ticker.add((delta) => this.update(delta));
    }


    update(delta: number) {
        this.interface.update(delta);
    }
}