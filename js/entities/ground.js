 define(function() {
    function Ground() {
        var color = "#040";
        var width = 0;
        var height = 32;
        var x = 0;
        var y = this.y = 0;
        this.draw = function(canvas) {
            canvas.fillStyle = color;

            canvas.fillRect(x, this.y, this.width, height);//temp 'this'
        };
    }

    return Ground;
});