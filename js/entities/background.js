define(function () {
    "use strict";

    function Background() {
        var color = "#91D7E8",
            sprite;
        this.x = 0;
        this.y = 0;

        this.LoadContent = function () {
            sprite = new Image();
            sprite.src = "img/background.png";
        };

        this.Draw = function (canvas) {
            canvas.fillStyle = color;

            canvas.drawImage(sprite, 0, 0);
        };
    }

    return Background;
});
