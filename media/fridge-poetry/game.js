var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="phaser/typescript/phaser.d.ts"/>
var Main;
(function (Main) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Main.Boot = Boot;
})(Main || (Main = {}));
///<reference path="phaser/typescript/phaser.d.ts"/>
var Main;
(function (Main) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.load.image('button', 'button.png');
        };
        Preloader.prototype.create = function () {
            this.game.state.start('Level', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Main.Preloader = Preloader;
})(Main || (Main = {}));
///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="Level.ts"/>
var Main;
(function (Main) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(level, x, y) {
            _super.call(this, level.game, x, y, 'button', 0);
            this.level = level;
            this.width = this.width / 8;
            this.height = this.height / 8;
            this.inputEnabled = true;
            this.events.onInputDown.add(this.advanceSlide, this);
        }
        Button.prototype.advanceSlide = function () {
            var sorted = Main.Level.textObjs.sort(function (a, b) {
                var x = a.x;
                var y = b.x;
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            var sentence = "";
            for (var i = 0; i < sorted.length; i++) {
                var ele = sorted[i];
                if (ele.y > this.level.game.height / 2) {
                    sentence += ele.text + " ";
                }
            }
            document["poetryDone"] = "true";
            document["poetrySentence"] = sentence;
        };
        return Button;
    })(Phaser.Sprite);
    Main.Button = Button;
})(Main || (Main = {}));
///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="Button.ts"/>
var Main;
(function (Main) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.apply(this, arguments);
        }
        Level.prototype.create = function () {
            this.game.stage.backgroundColor = '#777777';
            Level.game = this.game;
            var group = this.game.add.group();
            group.add(new Main.Button(this, this.game.width / 2, this.game.height - 100));
            Level.loadWords();
        };
        Level.createWords = function (words) {
            if (words.length == 1) {
                // for testing
                words = Level.defaultWords;
            }
            var style = { font: "32px Arial", fill: "#FFFFFF", align: "left", wordWrap: true, wordWrapWidth: this.game.width };
            var currentX = 0;
            var currentY = 0;
            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                var text = this.game.add.text(0, 0, word, style, this.words);
                this.textObjs.push(text);
                this.placeText(text, currentX, currentY);
                currentX = text.x + text.width;
                currentY = text.y;
                text.inputEnabled = true;
                text.input.enableDrag();
            }
        };
        Level.loadWords = function () {
            var searchString = window.location.search.substring(1);
            Level.readFile(searchString);
        };
        Level.readFile = function (link) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    if (request.status == 200 || request.status == 0) {
                        Level.createWords(request.responseText.split(" "));
                    }
                    else {
                        console.log("Failed to fetch words list");
                        Level.createWords(Level.defaultWords);
                    }
                }
            };
            request.open("GET", link, true);
            request.send();
        };
        Level.placeText = function (text, currentX, currentY) {
            if (currentX + text.width > this.game.width - 10) {
                text.x = 10;
                text.y = currentY + text.height + 10;
            }
            else {
                text.x = currentX + 10;
                text.y = currentY;
            }
        };
        Level.defaultWords = ['there', 'was', 'one', 'URL', 'parameter', 'so', 'this', 'default', 'list', 'was', 'used', 'instead'];
        Level.textObjs = [];
        return Level;
    })(Phaser.State);
    Main.Level = Level;
})(Main || (Main = {}));
///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="Level.ts"/>
var Main;
(function (Main) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, Game.WIDTH, Game.HEIGHT, Phaser.AUTO, 'content', null);
            this.state.add('Boot', Main.Boot, false);
            this.state.add('Preloader', Main.Preloader, false);
            this.state.add('Level', Main.Level, false);
            this.state.start('Boot');
        }
        Game.WIDTH = 1050;
        Game.HEIGHT = 500;
        return Game;
    })(Phaser.Game);
    Main.Game = Game;
    window.onload = function () {
        var game = new Game();
    };
})(Main || (Main = {}));
//# sourceMappingURL=game.js.map