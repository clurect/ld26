define(function () {
    "use strict";

    function Ground() {
        var color = "#040";
        this.height = 32;
        this.x = 0;

        this.y = 0;

        this.Draw = function (canvas) {
            canvas.fillStyle = color;

            canvas.fillRect(this.x, this.y, this.width, this.height);//temp 'this'
        };
    }

    return Ground;
});
