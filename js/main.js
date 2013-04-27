$(document).ready(function(){
    require(["./js/game.js"], function(Game) {
        $('#start-button').button().click(function(event) {
            $(this).button('disable');
            event.preventDefault();
            console.log("click");
            var game = new Game();
            game.Initialize('#games');
            game.intervalHook = setInterval(function () { game.RunGameLoop() }, game.DrawInterval);
        });
    });
});