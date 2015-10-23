///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="Level.ts"/>
module Main {

    export class Button extends Phaser.Sprite {

        private level: Level;

        constructor(level: Level, x: number, y: number) {
            super(level.game, x, y, 'button', 0);
            this.level = level;
            this.width = this.width/8;
            this.height = this.height/8;

            this.inputEnabled = true;
            this.events.onInputDown.add(this.advanceSlide, this);
        }

        private advanceSlide(): void {
            var sorted: Phaser.Text[] = Level.textObjs.sort(function(a, b) {
                var x = a.x;
                var y = b.x;
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            var sentence: string = "";

            for (var i: number = 0; i < sorted.length; i++) {
                var ele: Phaser.Text = sorted[i];
                if (ele.y > this.level.game.height/2) {
                    sentence += ele.text + " ";
                }
            }

            document["poetryDone"] = "true";
            document["poetrySentence"] = sentence;
        }
    }
}