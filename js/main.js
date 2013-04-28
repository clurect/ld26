(function () {
    "use strict";
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var game;
$(document).ready(function () {
    "use strict";

    require(["js/game.js"], function (Game) {
        $("#start-button").button("enable");
        $("#start-button").button().click(function (event) {
            $(this).button("disable");
            $("#stop-button").button("enable");
            event.preventDefault();
            game = new Game();
            game.Initialize("#game");
        });
        $("#stop-button").button().click(function (event) {
            event.preventDefault();
            $(this).button("disable");
            game.running = false;
            game.canvasElement.parentNode.removeChild(game.canvasElement);
            game.canvasElement = null;
            game = null;
            $("#start-button").button("enable");
        });
    });
});
