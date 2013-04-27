define(function() {
    function Player() {
        var color = "#00A";
        var state = this.state = 'falling';
        var x = this.x = 220;
        var y = this.y = 270;
        var dx = 0;
        var dy = 0;
        var jumpHeight = this.jumpHeight = 100;
        var jumpOrigin = this.jumpOrigin = 0;
        var width = 32;
        var height = this.height = 32;
        this.draw = function(canvas) {
            canvas.fillStyle = color;

            canvas.fillRect(this.x, this.y, width, height);
        };
        this.update = function(keys) {};
    }

    return Player;
});