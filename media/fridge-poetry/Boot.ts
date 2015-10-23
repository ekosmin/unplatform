///<reference path="phaser/typescript/phaser.d.ts"/>
module Main {

    export class Boot extends Phaser.State {

        preload() {

        }

        create() {

            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            this.game.state.start('Preloader', true, false);
        }

    }

}