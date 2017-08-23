// wait for the DOM to finish loading
console.log("js is linked");

$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function

  // draw either O or X on div box
  // and board check where player X or O has marked
  // by the div's id, which will be used as the
  // index to set that board[index] value
  var draw = "O";
  var box = $('.box');
  var alert = $('.alert');
  var board = [0,1,2,3,4,5,6,7,8];
  var play = 9;
  var gameEnd = false;
  // Used bubbling to handle event instead of 
  // individual boxes.
  alert.html("It is now player O's turn");
  $("#board").on("click",".box", function() {
		// Proceed if it wasnt clicked before
		// by checking if theres an id already
		// assigned. If not clicked, highlight, 
		// mark, and draw div. Alert user and
		// check for win 
		if($(this).attr("data-id"))return;
		if(gameEnd) return;
		if(draw === "O"){
			$(this).addClass("paint-o");
			$(this).attr("data-id", "O");
			$(this).html("O");
			board[$(this).attr("id")] = "O";
			draw = "X";
			alert.html("It is now player X's turn");
			checkWin(board, "O");

		} else if( draw ==="X") {
			$(this).addClass("paint-x");
			$(this).attr("data-id", "X");
			$(this).html("X");
			board[$(this).attr("id")] = "X";
			draw = "O";
			alert.html("It is now player O's turn");
			checkWin(board, "X");
		}

	}); 

  	function checkWin(list, player){
		// The list of all possible winning condition
		// 	[[0,1,2],[3,4,5],[6,7,8],
		// 	[0,3,6],[1,4,7],[2,5,8],
		// 	[0,4,8],[2,4,6]];
		play--;
		if((list[0] ===list[1] && list[0] ===list[2]) ||
			(list[3] ===list[4] && list[3] ===list[5]) ||
			(list[6] ===list[7] && list[6] ===list[8]) ||
			(list[0] ===list[3] && list[0] ===list[6]) ||
			(list[1] ===list[4] && list[1] ===list[7]) ||
			(list[2] ===list[5] && list[2] ===list[8]) ||
			(list[0] ===list[4] && list[0] ===list[8]) ||
			(list[2] ===list[4] && list[2] ===list[6]) ) 
		{
			/* If it matches any of the winning condition
			display winning message and disable player's
			ability to mark further. */
			console.log(player + " win");
			alert.html("Player " + player + " wins!");
			alert.append(`<hr>Please press reset button to play again.`);
			gameEnd = true;
			
		}
		// If no one has after filling out 9 squares
		// display draw message and disable player's marking ability
		if(play === 0){
			alert.html("Its a draw!");
			alert.append(`<hr>Please press reset button to play again.`);
			gameEnd = true;
		}
	};

	// A button that reset all relevant global state,
	// remove attribute, class, and value so they can be
	// seen and play as new. 
	$('.reset-btn').on('click',reset);
	function reset() {
		board = [0,1,2,3,4,5,6,7,8];
		box.removeAttr("data-id");
		box.removeClass("paint-o paint-x");
		alert.html("It is now player X's turn");
		box.html("");
		play = 9;
		gameEnd = false;
		draw = "X";
	}

});
