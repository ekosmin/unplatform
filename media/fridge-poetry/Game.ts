///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="Level.ts"/>
module Main {

    export class Game extends Phaser.Game {

        public static WIDTH = 1050;
        public static HEIGHT = 500;

        constructor() {

            super(Game.WIDTH, Game.HEIGHT, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Level', Level, false);

            this.state.start('Boot');

        }

    }

    window.onload = ( )=> {
        var game = new Game();
    }

}