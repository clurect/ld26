define(function () {
    "use strict";

    function Player() {
        var color = "#00A",
            width = 32,
            height = this.height = 32;

        this.state = "falling";
        this.x = 220;
        this.y = 270;
        this.jumpHeight = 100;
        this.jumpOrigin = 0;

        this.draw = function (canvas) {
            canvas.fillStyle = color;

            canvas.fillRect(this.x, this.y, width, height);
        };

        this.update = function (/*keys*/) {};
    }

    return Player;
});
