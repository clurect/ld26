(function () {
    "use strict";
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var game;
$(document).ready(function () {
    "use strict";

    var progresstext = $("#progresstext");
    var progressbar = $("#progressbar");
    progressbar.progressbar({
      value: false,
      change: function() {
        progresstext.text(progressbar.progressbar("value")+"%");
      },
      complete: function() {
        progresstext.text("Complete!");
        progressbar.hide();
      }
    });
    var changeProgressFunc = function(value) {
      progressbar.progressbar("value", value);
    };

    require(["js/game.js"], function (Game) {
        $("#start-button").button("enable");
        $("#start-button").button().click(function (event) {
            progressbar.show();
            $(this).button("disable");
            $("#stop-button").button("enable");
            event.preventDefault();
            game = new Game();
            game.Initialize("#game", changeProgressFunc);
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
