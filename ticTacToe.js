(function (root) {
  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function () {
    var self = this;

    this.player = Game.marks[0];
    this.otherPlayer = function () {
      return (this.player == "x" ? "o" : "x")
    };

    this.board = this.makeBoard();
  };

  Game.marks = ["x", "o"];

  Game.prototype.diagonalWinner = function () {
    var game = this;

    var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
    var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos[0]][pos[1]] === mark;
        });
      };

      var won = _([diagonalPositions1, diagonalPositions2]).any(didWinDiagonal);

      if (won) winner = mark;
    });

    return winner;
  };

  Game.prototype.horizontalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (i) {
        return _(indices).every(function (j) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.makeBoard = function () {
    return _.times(3, function (i) {
      return _.times(3, function (j) {
        return null;
      });
    });
  };

  Game.prototype.resetBoard = function () {
    $('.x').removeClass('x').removeClass('x-bg-color').addClass('cell').text('');
    $('.o').removeClass('o').removeClass('o-bg-color').addClass('cell').text('');
    this.board = this.makeBoard()
  };

  Game.prototype.move = function (strCoords) {
    var pos = eval(strCoords);

    this.placeMark(pos);

    if (this.winner()) {
      $("#turn").toggle();
      $(".white_content").toggle();
      $(".black_overlay").toggle();

      if (this.player == "x") {
        $("#winner").removeClass("player-o").text("player 1 has won!");
        $("#play-again").addClass("player-o");
        $(".click").removeClass("x-bg-color");
      }
      else {
        $("#winner").addClass("player-o").text("player 2 has won!");
        $("#play-again").removeClass("player-o");
        $(".click").addClass("x-bg-color");
      };
    }
    else if (_(_(this.board).flatten()).every()) {
      $("#turn").toggle();
      $(".white_content").toggle();
      $(".black_overlay").toggle();
      $("#winner").removeClass("player-o").text("Game is a draw.");
      $("#play-again").addClass("player-o");
      $(".click").removeClass("x-bg-color");
    }
    else {
      this.switchPlayer();
    }
    return true;
  };

  Game.prototype.placeMark = function (pos) {
    this.board[pos[0]][pos[1]] = this.player;
  };

  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
      $("#turn").addClass("player-o").text("player 2's turn");
    }
    else {
      this.player = Game.marks[0];
      $("#turn").removeClass("player-o").text("player 1's turn");
    };
  };

  Game.prototype.valid = function (strCoords) {
    // Check to see if the co-ords are on the board and the spot is empty.
    var pos = eval(strCoords);

    function isInRange (pos) {
      return (0 <= pos) && (pos < 3);
    };

    return _(pos).all(isInRange) && _.isNull(this.board[pos[0]][pos[1]]);
  };

  Game.prototype.verticalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (j) {
        return _(indices).every(function (i) {
          return game.board[i][j] === mark;
        });
      });

      if (won) winner = mark;
    });

    return winner;
  };

  Game.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };
})(this);

var TTT = new this.TTT.Game();