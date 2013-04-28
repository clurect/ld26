define(["js/entities/player.js", "js/entities/morphyGuy.js", "js/entities/ground.js"],
        function (Player, MorphyGuy, Ground) {
    "use strict";

    function Game() {
        var CANVAS_WIDTH = 720,
            CANVAS_HEIGHT = 480,
            GRAVITY = 0.20,
            INITIAL_JUMP = -3.5;
        var keys = {};
        var player;
        var canvas;
        var canvasElement;
        var FPS = 30;
        var sprites;
        var ground;
        var morphyGuy;
        this.DrawInterval = 1000 / FPS;
        this.Initialize = function (where) {
            sprites = new Image();
            sprites.src = "img/spritesheet.png";
            canvasElement = document.createElement("canvas");
            canvasElement.id = "myCanvas";
            canvasElement.width = CANVAS_WIDTH;
            canvasElement.height = CANVAS_HEIGHT;
            canvas = canvasElement.getContext("2d");
            $(where).get(0).appendChild(canvasElement);
            this.canvasElement = canvasElement;
            //text = $.getJSON("textObject.json", function (json) { return json; });
            ground = new Ground();
            ground.width = CANVAS_WIDTH;
            ground.y = CANVAS_HEIGHT - 32;
            player = new Player();
            morphyGuy = new MorphyGuy();
            this.LoadContent();
        };
        this.LoadContent = function () {
            // load content – graphics, sound etc.
            // since all content is loaded run main game loop
            // Calls RunGameLoop method every ‘draw interval’
        };
        this.RunGameLoop = function () {
            this.Update();
            this.Draw();
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

			player.update();
            morphyGuy.update(keys);
        };

        this.Draw = function () {
            canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            player.draw(canvas, sprites);

            morphyGuy.draw(canvas);
            ground.draw(canvas);
            canvas.fillStyle = "#000"; // Set color to black

        };
        $(document).keydown(function (e) {
            //console.log(e.which);
            keys[e.which] = true;
        });
        $(document).keyup(function (e) {
            keys[e.which] = false;
        });
    }
    return (Game);
});
