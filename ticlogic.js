var count = 0;

function startGame() {
    document.Turn = "X";

    setMessage(document.Turn + " starts first");
}
function setMessage(msg) {
    document.getElementById("message").innerText = msg;
}
function nextMove(square) {
    count++;
    if (square.innerText == "") {
    square.innerText = document.Turn;
    switchTurns();
    } else {
        setMessage("That block is taken");
    }
}
function switchTurns() {
    if (checkWinner(document.Turn)){
        setMessage(document.Turn + " Won");
        var rem = document.getElementsByTagName("td");
        for ( let i = 0; i < rem.length; i++ ){
                rem[i].removeAttribute("onclick");
        }
        document.getElementById("reset").style.display = "inline";
    } else if ( count == 9 ){
        noWinner();
    } else {
        if (document.Turn == "X") {
            document.Turn = "O";
        } else {
            document.Turn = "X";
        }
        setMessage (document.Turn + " turn is next");
    }
}

function noWinner(){
    setMessage("The cat won");
    document.getElementById("reset").style.display = "inline";
}

function checkWinner(move) {
    var game = false;
    if (checkBox(1, 2, 3, move) ||
        checkBox(4, 5, 6, move) ||
        checkBox(7, 8, 9, move) ||
        checkBox(1, 4, 7, move) ||
        checkBox(2, 5, 8, move) ||
        checkBox(3, 6, 9, move) ||
        checkBox(1, 5, 9, move) ||
        checkBox(3, 5, 7, move)){
        game  = true;
    }
    return game;
}
function checkBox(a, b, c, move) {
    var game = false;
    if (getBox(a) == move && getBox(b) == move && getBox(c) == move){
        game = true;
    }
    return game;
}
function getBox(number) {
    return document.getElementById("s" + number).innerHTML;
}

document.getElementById("reset").addEventListener("click", function(){
    window.location.href = "index.html";
})