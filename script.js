$(document).ready(function () {
  $(".cell").click(function () {
    var pos = $(this).attr('id');
    if (TTT.valid(pos)) {
      $(this)
        .removeClass("cell")
        .addClass(TTT.player)
        .text(TTT.player.toUpperCase());
      TTT.move(pos);
    };
  });
});