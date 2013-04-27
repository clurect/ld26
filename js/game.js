define(function() {
    function Game() {
        var CANVAS_WIDTH = 480 * 1.5;
        var CANVAS_HEIGHT = 320 * 1.5;
        var keys = {};
        var player;
        var canvas;
        var canvasElement;
        var FPS = 30;
        var sprites;
        var ground;
        var morphyGuy;
        this.DrawInterval = 1000 / FPS;
        this.Initialize = function(where) {
            console.log('init');
            sprites = new Image();
            //sprites.src = 'sprites.png';
            //canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
            canvasElement = document.createElement("canvas");
            canvasElement.id = "myCanvas";
            canvasElement.width = CANVAS_WIDTH;
            canvasElement.height = CANVAS_HEIGHT;
            canvas = canvasElement.getContext("2d");
            $(where).get(0).appendChild(canvasElement);
            this.canvasElement = canvasElement;
            //text = $.getJSON('textObject.json', function (json) { return json; });
            ground = {
                color: "#040",
                width: CANVAS_WIDTH,
                height: 32,
                x: 0,
                y: CANVAS_HEIGHT - 32,
                draw: function() {
                    canvas.fillStyle = this.color;

                    canvas.fillRect(this.x, this.y, this.width, this.height);
                }
            };
            player = {
                game: this,
                color: "#00A",
                state: 'falling',
                x: 220,
                y: 270,
                dx: 0,
                dy: 0,
                jumpHeight: 100,
                jumpOrigin:0,
                width: 32,
                height: 32,
                draw: function() {
                    canvas.fillStyle = this.color;

                    canvas.fillRect(this.x, this.y, this.width, this.height);
                },
                update: function() {}
            };
            morphyGuy = {
                game: this,
                color: "#00A",
                colors: [{
                    value: 5,
                    increase: true
                }, {
                    value: 50,
                    increase: true
                }, {
                    value: 125,
                    increase: true
                }],
                colorIncrement: 3,
                colorLimitHigh: 245,
                colorLimitLow: 5,
                x: 220,
                y: 240,
                width: 32,
                height: 32,
                draw: function() {
                    canvas.fillStyle = this.color;

                    canvas.fillRect(this.x, this.y, this.width, this.height);
                },
                update: function() {
                    this.colors.forEach(function(item) {
                        if (item.increase) item.value += this.colorIncrement;
                        else item.value -= this.colorIncrement;

                        if (item.value >= this.colorLimitHigh) //may need to subtract some more if we get a weird flash
                        item.increase = false;
                        else if (item.value <= this.colorLimitLow) //may need to add some more if we get a weird flash
                        item.increase = true;
                    }, this);

                    this.color = "#" + this.colors.map(function(item) {
                        var hexStr = item.value.toString(16);
                        if (hexStr.length == 1) hexStr = "0" + hexStr;
                        return hexStr;
                    }).join("");
                }
            };
            this.LoadContent();
        };
        this.LoadContent = function() {
            // load content – graphics, sound etc.
            // since all content is loaded run main game loop
            // Calls RunGameLoop method every ‘draw interval’
        };
        this.RunGameLoop = function() {
            this.Update();
            this.Draw();
        };

        this.Update = function() {
            if (keys[37]) player.x -= 5;
            if (keys[39]) player.x += 5;
            if (keys[38] && player.state !== 'falling' && player.state !== 'jumping') {
                player.state = "jumping";
                player.jumpOrigin = player.y+player.height;
            }
            if (player.state === 'jumping') {
                player.y -= 10;
            }
            if (player.jumpOrigin - player.jumpHeight >= player.y)
                player.state = 'falling';
            if (player.y + player.height >= ground.y) {
                player.y += 0;
                player.state = '';
            }
            else {
                player.y += 5; //gravity!
            }
            morphyGuy.update();
        };

        this.Draw = function() {
            canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            player.draw();
            
            morphyGuy.draw();
            ground.draw();
            canvas.fillStyle = "#000"; // Set color to black

        };
        $(document).keydown(function(e) {
            //console.log(e.which);
            keys[e.which] = true;
        });
        $(document).keyup(function(e) {
            keys[e.which] = false;
        });
    }
    return (Game);
});
