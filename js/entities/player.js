define(function () {
    "use strict";

    function Player() {
        var color = "#00A",
            width = 32,
            height = this.height = 32;

        this.state = "falling";
		this.dx = 0;
		this.dy = 0;
        this.x = 220;
        this.y = 270;
        this.jumpHeight = 100;
        this.jumpOrigin = 0;

        this.draw = function (canvas, sprites) {
            canvas.fillStyle = color;
			canvas.drawImage(sprites, 0, 0, 32, 32, this.x, this.y, width, height);
			
        };

        this.update = function (/*keys*/) {
			this.x += this.dx;
			this.y += this.dy;
		};
    }

    return Player;
});
