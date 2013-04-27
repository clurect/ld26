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
        $("#stop-button").button("disable");
        $("#start-button").button("enable");
        $("#start-button").button().click(function (event) {
            $(this).button("disable");
            $("#stop-button").button("enable");
            event.preventDefault();
            game = new Game();
            game.Initialize("#games");
            game.intervalHook = setInterval(function () { game.RunGameLoop(); }, game.DrawInterval);
        });
        $("#stop-button").button().click(function (event) {
            event.preventDefault();
            $(this).button("disable");
            clearInterval(game.intervalHook);
            game.canvasElement.parentNode.removeChild(game.canvasElement);
            game.canvasElement = null;
            game = null;
            $("#start-button").button("enable");
        });
    });
});
