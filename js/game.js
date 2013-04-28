define(["js/entities/player.js",
        "js/entities/sun.js",
        "js/entities/ground.js",
        "js/entities/background.js"],
    function (Player, Sun, Ground, Background) {
    "use strict";

    function Game() {
        this.running = true;
        var CANVAS_WIDTH = 720,
            CANVAS_HEIGHT = 480,
            GRAVITY = 0.20,
            INITIAL_JUMP = -3.5,
            keys = {},
            canvas,
            canvasElement,
            player,
            ground,
            background,
            sun;

        this.Initialize = function (where, changeProgressFunc) {
            changeProgressFunc(30);
            canvasElement = document.createElement("canvas");
            canvasElement.id = "myCanvas";
            canvasElement.width = CANVAS_WIDTH;
            canvasElement.height = CANVAS_HEIGHT;
            canvas = canvasElement.getContext("2d");
            $(where).get(0).appendChild(canvasElement);
            this.canvasElement = canvasElement;
            changeProgressFunc(50);
            //text = $.getJSON("textObject.json", function (json) { return json; });
            background = new Background();
            ground = new Ground();
            ground.width = CANVAS_WIDTH;
            ground.y = CANVAS_HEIGHT - 32;
            changeProgressFunc(60);
            player = new Player();
            changeProgressFunc(70);
            sun = new Sun();
            sun.width = Math.max(CANVAS_WIDTH, CANVAS_HEIGHT) * 0.1;
            sun.height = sun.width;
            sun.x = CANVAS_WIDTH * 0.8;
            sun.y = CANVAS_HEIGHT * 0.1;
            changeProgressFunc(85);
            this.LoadContent();
            changeProgressFunc(100);
            this.RunGameLoop();
        };
        this.LoadContent = function () {
            // load content – graphics, sound etc.
            player.LoadContent();
            background.LoadContent();
        };
        this.RunGameLoop = function () {
            this.Update();
            this.Draw();
            if (this.running) {
                window.requestAnimationFrame(_.bind(this.RunGameLoop, this));
            }
        };

        this.Update = function () {
            player.dx = 0;
            if (keys[37]) {
                player.dx = -5;
            }
            if (keys[39]) {
                player.dx = 5;
            }

            if (keys[38] && player.state !== "jumping") {
                player.state = "jumping";
                player.dy = INITIAL_JUMP;
            } else if (player.y + player.height >= ground.y) {
                player.y = ground.y - player.height;
                player.dy = 0;
                player.state = "grounded";
            } else {
                player.dy += GRAVITY;
            }

            player.Update();
            sun.Update(keys);
        };

        this.Draw = function () {
            canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            background.Draw(canvas);
            sun.Draw(canvas);
            ground.Draw(canvas);
            player.Draw(canvas);
            canvas.fillStyle = "#000"; // Set color to black

        };
        $(document).keydown(function (e) {
            keys[e.which] = true;
        });
        $(document).keyup(function (e) {
            keys[e.which] = false;
        });
    }
    return (Game);
});
