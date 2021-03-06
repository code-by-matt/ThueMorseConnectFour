// This boolean states whether or not the game has been won.
var didSomebodyWin = false;

// This number determines the color of the next piece to be played.
// The start() method sets this number to a random even integer between 2 and 10000,
// where evenness ensures that red and blue play the same number of times
// if the game fills the entire board.
var currentTurn;

// The game board has seven columns, each six squares in height.
// The top square of each column is number 0, and the numbers increase as you go down the column.
// The array below lists the bottom-most empty square in each column.
// At the beginning of a game, all squares are empty,
// so start() makes this array is all 5s.
var bottoms = [];

// This array keeps a record of all the moves made so far. Each move is identified by
// the number of the column it was played in. A value of -1 means that the game hasn't
// progressed that far yet, so start() makes this array all -1s.
var history = [];


// The following functions deal with calculating the color of the next few pieces
// to be played based on the value of currentTurn.
        
    // Given the turn number, returns the color of that turn.
    // The color is based on the Thue-Morse sequence.
    function color(turn) {

        // By the end of this loop, i is the number of 1s in the binary representation of turn.
        for (var i = 0; turn != 0; i++) {
            turn = turn & (turn - 1);
        }

        if (i % 2 ==0) {
            return "red";
        }
        else {
            return "blue";
        }
    }

    // Puts the colors of the next eight turns into the turn counter.
    function changeCounter() {
        for (var i = 0; i < 8; i++) {
            document.getElementsByClassName("smallSquare")
                .item(i + 1).style.backgroundColor = color(currentTurn + i);
        }
    }


// The following functions deal with checking if somebody won.
// In the following comments, the term "target piece"
// means "the topmost piece in the nth column."
// Note that these functions are always called at a point in time
// after a square got filled, but before the bottoms array is updated.
// Therefore, the square at bottoms[n] is actually filled with the most recent move.

    // Counts the number of pieces of the current turn's color directly west of the target piece.
    function west(n) {
        var level = bottoms[n];
        var count = 0;

        for (var i = 1; (n - i) >= 0; i++) {
            var square = document.getElementsByClassName("row").item(level)
                .getElementsByClassName("bigSquare").item(n - i);
            if (square.style.backgroundColor == color(currentTurn)) {
                count++;
            }
            else return count;
        }
        return count;
    }

    // Counts the number of pieces of the current turn's color directly east of the target piece.
    function east(n) {
        var level = bottoms[n];
        var count = 0;

        for (var i = 1; (n + i) <= 6; i++) {
            var square = document.getElementsByClassName("row").item(level)
                .getElementsByClassName("bigSquare").item(n + i);
            if (square.style.backgroundColor == color(currentTurn)) {
                count++;
            }
            else return count;
        }
        return count;
    }

    // Counts the number of pieces of the current turn's color directly south of the target piece.
    function south(n) {
        var level = bottoms[n];
        var count = 0;

        for (var i = 1; (level + i) <= 5; i++) {
            var square = document.getElementsByClassName("row").item(level + i)
                .getElementsByClassName("bigSquare").item(n);
            if (square.style.backgroundColor == color(currentTurn)) {
                count++;
            }
            else return count;
        }
        return count;
    }

    // Counts the number of pieces of the current turn's color directly northwest of the target piece.
    function northwest(n) {
        var level = bottoms[n];
        var count = 0;

        for (var i = 1; ((n - i) >= 0) && ((level - i) >= 0); i++) {
            var square = document.getElementsByClassName("row").item(level - i)
                .getElementsByClassName("bigSquare").item(n - i);
            if (square.style.backgroundColor == color(currentTurn)) {
                count++;
            }
            else return count;
        }
        return count;
    }

    // Counts the number of pieces of the current turn's color directly southeast of the target piece.
    function southeast(n) {
        var level = bottoms[n];
        var count = 0;

        for (var i = 1; ((n + i) <= 6) && ((level + i) <= 5); i++) {
            var square = document.getElementsByClassName("row").item(level + i)
                .getElementsByClassName("bigSquare").item(n + i);
            if (square.style.backgroundColor == color(currentTurn)) {
                count++;
            }
            else return count;
        }
        return count;
    }

    // Counts the number of pieces of the current turn's color directly northeast of the target piece.
    function northeast(n) {
        var level = bottoms[n];
        var count = 0;

        for (var i = 1; ((n + i) <= 6) && ((level - i) >= 0); i++) {
            var square = document.getElementsByClassName("row").item(level - i)
                .getElementsByClassName("bigSquare").item(n + i);
            if (square.style.backgroundColor == color(currentTurn)) {
                count++;
            }
            else return count;
        }
        return count;
    }

    // Counts the number pieces of the current turn's color directly southwest of the target piece.
    function southwest(n) {
        var level = bottoms[n];
        var count = 0;

        for (var i = 1; ((n - i) >= 0) && ((level + i) <= 5); i++) {
            var square = document.getElementsByClassName("row").item(level + i)
                .getElementsByClassName("bigSquare").item(n - i);
            if (square.style.backgroundColor == color(currentTurn)) {
                count++;
            }
            else return count;
        }
        return count;
    }

    // Checks if the target piece is part of a win.
    function checkWin(n) {
        var hz = west(n) + east(n) + 1;
        var vt = south(n) + 1;
        var dg = northwest(n) + southeast(n) + 1;
        var ad = northeast(n) + southwest(n) + 1;

        // Un-comment to see how close the target piece is to causing a win in each direction.
        // document.getElementById("hz").innerHTML = "horizontal: " + hz;
        // document.getElementById("vt").innerHTML = "vertical: " + vt;
        // document.getElementById("dg").innerHTML = "diagonal: " + dg;
        // document.getElementById("ad").innerHTML = "anti-diagonal: " + ad;

        return (hz >= 4) || (vt >= 4) || (dg >= 4) || (ad >= 4);
    }


// The following functions are directly called by the user.

    // Makes the game ready to start.
    function start() {

        // Clears the game board.
        for (var i = 0; i < 42; i++) {
            document.getElementsByClassName("bigSquare").item(i).style.backgroundColor = "white";
        }

        // Updates things.
        didSomebodyWin = false;
        document.getElementById("instructions").innerHTML =
            "Click on a column to drop in a piece. Upcoming pieces are shown below.";
        for (var i = 0; i < 7; i++) {
            bottoms[i] = 5;
        }
        currentTurn = 2 * (Math.floor(Math.random() * 5000) + 1);
        changeCounter();

        // Erases the entire history.
        for (var i = 0; i < 42; i++) {
            history[i] = -1;
        }

        // Un-comment to see the game history and the first value of currentTurn.
        // document.getElementById("turn").innerHTML = "first turn: " + currentTurn;
        // printHistory();
    }

    // Makes a move in the nth column.
    function dropPiece(n) {
        if (didSomebodyWin == false) {

            // Drops a piece of the current turn's color into the bottom-most empty square in the nth column.
            document.getElementsByClassName("row").item(bottoms[n])
                .getElementsByClassName("bigSquare").item(n)
                .style.backgroundColor = color(currentTurn);

            // Updates things.
            didSomebodyWin = checkWin(n);
            if (didSomebodyWin == true) {
                if (color(currentTurn) == "red") {
                    document.getElementById("instructions").innerHTML = "Red wins!";
                }
                if (color(currentTurn) == "blue") {
                    document.getElementById("instructions").innerHTML = "Blue wins!";
                }
            }
            bottoms[n]--;
            currentTurn++;
            changeCounter();

            // Writes the move to history.
            for (var i = 0; history[i] != -1; i++);
            history[i] = n;

            // Un-comment to see the game history.
            // printHistory();
        }
    }

    // Undoes the most recent move.
    function undo() {

        // Only works if history is nonempty.
        if (history[0] != -1) {

            // Clears the topmost nonempty square of the column in which the most recent piece was played.
            for (var i = 0; (history[i] != -1 && i < 42); i++);
            document.getElementsByClassName("row").item(bottoms[history[i - 1]] + 1)
                .getElementsByClassName("bigSquare").item(history[i - 1])
                .style.backgroundColor = "white";

            // Updates things.
            didSomebodyWin = false;
            document.getElementById("instructions").innerHTML =
                "Click on a column to drop in a piece. Upcoming pieces are shown below.";
            bottoms[history[i - 1]]++;
            currentTurn--;
            changeCounter();

            // Erases the most recent move from history.
            history[i - 1] = -1;

            // Un-comment to see the game history.
            // printHistory();
        }
    }

// This function is just for testing.
function printHistory() {
    document.getElementById("winThing").innerHTML = "win? " + didSomebodyWin;
    document.getElementById("hstry").innerHTML = " ";
    for (var i = 0; i < 42; i++) {
        document.getElementById("hstry").innerHTML += history[i] + " ";
    }
}
