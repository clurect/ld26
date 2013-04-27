define(function () {
    "use strict";

    function MorphyGuy() {

        var color = "#00A",
            colors = [
                { value: 5, increase: true },
                { value: 50, increase: true },
                { value: 125, increase: true }
            ],
            colorIncrement = 3,
            colorLimitHigh = 245,
            colorLimitLow = 5,
            x = 220,
            y = 240,
            width = 32,
            height = 32;

        this.draw = function (canvas) {
            canvas.fillStyle = color;

            canvas.fillRect(x, y, width, height);
        };

        this.update = function () {
            colors.forEach(function (item) {
                if (item.increase) {
                    item.value += colorIncrement;
                } else {
                    item.value -= colorIncrement;
                }

                if (item.value >= colorLimitHigh) {
                    //may need to subtract some more if we get a weird flash
                    item.increase = false;
                } else if (item.value <= colorLimitLow) {
                    //may need to add some more if we get a weird flash
                    item.increase = true;
                }
            }, this);

            color = "#" + colors.map(function (item) {
                var hexStr = item.value.toString(16);
                if (hexStr.length === 1) {
                    hexStr = "0" + hexStr;
                }
                return hexStr;
            }).join("");
        };
    }

    return MorphyGuy;
});
