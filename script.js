$(document).ready(function () {
  $(".cell").click(function () {
    var pos = $(this).attr('id');
    if (TTT.valid(pos)) {
      $(this)
        .removeClass("cell")
        .addClass(TTT.player)
        .addClass(TTT.player + "-bg-color")
        .text(TTT.player.toUpperCase());
      TTT.move(pos);
    };
  });

  $("#yes").click(function () {
    $("#light").toggle();
    $("#fade").toggle();
    $("#turn").toggle();
    TTT.resetBoard();
  });

  $("#no").click(function () {
    $("#play-again").toggle();
    $("#winner").toggle();
    if (TTT.player == "o") $("#thanks").addClass("player-o");
    $("#thanks").toggle();
  });
});