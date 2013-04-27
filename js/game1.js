var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;
var x = 50;
var y = 50;
    
var FPS = 30;


$(document).ready(function(){
    
    
    var keys = {};
    
    var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
    var canvas = canvasElement.get(0).getContext("2d");
    
    var player = {
      color: "#00A",
      x: 220,
      y: 270,
      width: 32,
      height: 32,
      draw: function() {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
      }
    };
    function update(){
        if (keys[37]) player.x-= 5;
        if (keys[39]) player.x+= 5;
        if (keys[38]) player.y-= 5;
        if (keys[40]) player.y+= 5;
        
    }
    
    function draw(){
      canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      player.draw();
      canvas.fillStyle = "#000"; // Set color to black
      canvas.fillText("Sup Bro!", x, y);
    }
        //Lets add the keyboard controls now
	$(document).keydown(function(e){
		keys[e.which] = true;
		//The snake is now keyboard controllable
	});
    $(document).keyup(function(e) {
        keys[e.which] = false;
    });
$('#start-button').button().click(function (event) {
    $(this).button('disable');
    event.preventDefault();
    canvasElement.appendTo('#games');
    setInterval(function() {
        update();
        draw();
    }, 1000/FPS);
    
});
});