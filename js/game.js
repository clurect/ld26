define(function() {
    function Game() {
        var CANVAS_WIDTH = 480;
        var CANVAS_HEIGHT = 320;
        var keys = {};
        var player;
        var canvas;
        var canvasElement;
        var FPS = 30;
        var text;
        var sprites;
        this.DrawInterval = 1000 / FPS;
        this.Initialize = function(where) {
            console.log('init');
            sprites = new Image();
            //sprites.src = 'sprites.png';
            canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
            canvasElement.attr("id","myCanvas");
            canvas = canvasElement.get(0).getContext("2d");
            canvasElement.appendTo(where);
            //text = $.getJSON('textObject.json', function (json) { return json; });
           
            player = {
                game: this,
                color: "#00A",
                x: 220,
                y: 270,
                width: 32,
                height: 32,
                draw: function() {
                    canvas.fillStyle = this.color;
                    
                    canvas.fillRect(this.x, this.y, this.width, this.height);
                },
                update: function(){}
            };
            morphyGuy = {
                game: this,
                color: "#00A",
                colors: [{value: 5, increase: true},
                         {value: 50, increase: true},
                         {value: 125, increase: true}],
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
                update: function(){
                    this.colors.forEach(function(item){
                        if(item.increase)
                          item.value+=this.colorIncrement;
                        else
                          item.value-=this.colorIncrement;

                        if(item.value>=this.colorLimitHigh)//may need to subtract some more if we get a weird flash
                          item.increase = false;
                        else if(item.value<=this.colorLimitLow)//may need to add some more if we get a weird flash
                          item.increase = true;
                          //if(item.value>255||item.value<0){debugger;}
                    }, this);
                    console.log(this.color);//if(isNaN(this.colors[0].value)){debugger;clearInterval(this.game.intervalHook)};
                    this.color = "#" + this.colors.map(function(item){return item.value.toString(16);}).join("");
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
            if (keys[38]) player.y -= 5;
            if (keys[40]) player.y += 5;
            
            morphyGuy.update();
        };

        this.Draw = function() {
            canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            player.draw();
            //text.draw();
            morphyGuy.draw()
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
