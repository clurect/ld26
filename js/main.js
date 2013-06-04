var game;

(function () {
    "use strict";
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function toggleMuteSfx(enable) {
    "use strict";
    if (enable) {
        game.muteSfx = false;
        $("#mute-sfx-button").button().html("&#x266A;");
    } else {
        game.muteSfx = true;
        $("#mute-sfx-button").button().html("X");
    }
}

$(document).ready(function () {
    "use strict";

    var progresstext = $("#progresstext");
    var progressbar = $("#progressbar");
    progressbar.progressbar({
        value: false,
        change: function () {
            progresstext.text(progressbar.progressbar("value") + "%");
        },
        complete: function () {
            progresstext.text("Complete!");
            progressbar.hide();
        }
    });
    var changeProgressFunc = function (value) {
        progressbar.progressbar("value", value);
    };

    require(["js/game.js"], function (Game) {
        $("input[type=submit], button").button().click(function (event) {
            event.preventDefault();
        });
        $("#start-button").button("enable");
        $("#start-button").button().click(function () {
            $(this).button("disable");
            progressbar.show();
            game = new Game();
            game.Initialize("#game", changeProgressFunc);

            //Initialize the Mute button
            toggleMuteSfx(true);

            $("#stop-button").button("enable");
            $("#mute-sfx-button").button("enable");
        });
        $("#mute-sfx-button").button().html("&#x266A;");
        $("#stop-button").button().click(function () {
            $(this).button("disable");
            $("#mute-sfx-button").button("disable");
            game.running = false;
            game.canvasElement.parentNode.removeChild(game.canvasElement);
            game.canvasElement = null;
            game = null;
            $("#start-button").button("enable");
        });
        $("#mute-sfx-button").button().click(function () {
            toggleMuteSfx(game.muteSfx);
        });
    });
});