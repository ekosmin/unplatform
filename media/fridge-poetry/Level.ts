///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="Button.ts"/>
module Main {

    export class Level extends Phaser.State {

        public static words: Phaser.Group;
        private static defaultWords: string[] = ['there', 'was', 'one', 'URL', 'parameter', 'so', 'this', 'default',
            'list', 'was', 'used', 'instead'];
        private static game: Phaser.Game;
        public static textObjs: Phaser.Text[] = [];

        create() {
            this.game.stage.backgroundColor = '#777777';
            Level.game = this.game;

            var group = this.game.add.group();
            group.add(new Button(this, this.game.width/2, this.game.height - 100));

            Level.loadWords();
        }

        private static createWords(words: string[]): void {
            if (words.length == 1) {
                // for testing
                words = Level.defaultWords;
            }

            var style: {} = {font: "32px Arial", fill: "#FFFFFF", align: "left",
                wordWrap: true, wordWrapWidth: this.game.width};
            var currentX: number = 0;
            var currentY: number = 0;

            for (var i: number = 0; i < words.length; i++) {
                var word: string = words[i];
                var text: Phaser.Text = this.game.add.text(0, 0, word, style, this.words);
                this.textObjs.push(text);
                this.placeText(text, currentX, currentY);
                currentX = text.x + text.width;
                currentY = text.y;
                text.inputEnabled = true;
                text.input.enableDrag();
            }
        }

        private static loadWords(): void {
            var searchString: string = window.location.search.substring(1);
            Level.readFile(searchString);
        }

        private static readFile(link: string): void {
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.onreadystatechange = function()
            {
                if (request.readyState == 4)
                {
                    if (request.status == 200 || request.status == 0) {
                        Level.createWords(request.responseText.split(" "));
                    } else {
                        console.log("Failed to fetch words list");
                        Level.createWords(Level.defaultWords);
                    }
                }
            };
            request.open("GET", link, true);
            request.send();
        }

        private static placeText(text: Phaser.Text, currentX: number, currentY: number): void {
            if (currentX + text.width > this.game.width - 10) {
                text.x = 10;
                text.y = currentY + text.height + 10;
            } else {
                text.x = currentX + 10;
                text.y = currentY;
            }
        }

    }

}