define(function () {
    "use strict";

    function Player() {
        var LEFT = 0, RIGHT = 1;

        var color = "#00A",
            sprites;
        this.width = 32;
        this.height = 32;
        this.state = "jumping";
        this.dx = 0;
        this.dy = 0;
        this.x = 220;
        this.y = 270;
        this.jumpHeight = 100;
        this.facing = RIGHT;

        this.LoadContent = function () {
            sprites = new Image();
            sprites.src = "img/spritesheet.png";
        };

        this.Draw = function (canvas) {
            canvas.fillStyle = color;

            var scaleH = (this.facing === LEFT ? -1 : 1),
                posX = (this.facing === LEFT ? -this.width : 0);

            canvas.save();
            canvas.translate(this.x, this.y);
            canvas.scale(scaleH, 1);
            canvas.drawImage(sprites, 0, 0, 32, 32,
                    posX, 0, this.width, this.height);
            canvas.restore();
        };

        this.Update = function (/*keys*/) {
            this.x += this.dx;
            this.y += this.dy;

            if (this.dx < 0 && this.state === "grounded") {
                this.facing = LEFT;
            } else if (this.dx > 0 && this.state === "grounded") {
                this.facing = RIGHT;
            }
        };
    }

    return Player;
});
