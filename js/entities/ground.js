define(function () {
    "use strict";

    function Ground() {
        var color = "#040",
            height = 32,
            x = 0;

        this.y = 0;

        this.Draw = function (canvas) {
            canvas.fillStyle = color;

            canvas.fillRect(x, this.y, this.width, height);//temp 'this'
        };
    }

    return Ground;
});
