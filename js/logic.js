let start = document.querySelectorAll("td");
let choices = [];
let topScore = 0;
var overScore;

if (localStorage.getItem("OverallScore") == null) {
    overScore = 0;
} else {
    overScore = JSON.parse(localStorage.getItem("OverallScore"));
}

let overPlace = document.getElementById("localWin");

function displayScore() {
    overPlace.innerText = overScore
}

displayScore();

function makeArr(run) {

    let list = [];

    for (let i = 0; i < 50; i++) {
        let num1 = Math.ceil(Math.random() * 5);
        let num2 = Math.ceil(Math.random() * 4);
        let both = [num1, num2];
        list.push(both);
    };

    if (run) {
        removeDup(list)
    } else {
        quickRemove(list)
    }

};

makeArr(true);

function quickRemove(ar) {
    console.log(choices.length);
    document.getElementById("currentScore").innerText = choices.length;
    for (let v in start) {
        start[v].innerText = "."
    }
    removeDup(ar)
}

function removeDup(ar) {

    var count = 1;

    for (let i = 0; i < ar.length; i++) {

        let str = `${ar[i][0]}-${ar[i][1]}`;
        var some = document.getElementById(str);

        if (some.innerText == "." && count < 10) {
            some.innerText = count
            count++
        }

    }

}


function correct() {
    choices.push(1)
    document.getElementById("currentScore").innerText = choices.length;
    topScore = (choices.length > topScore) ? choices.length : topScore;
    getTopScore()
    checkWin();
    console.log(choices.length)
    for (let e in start) {
        start[e].style.color = "black"
    }
}

function incorrect() {
    topScore = (choices.length > topScore) ? choices.length : topScore;
    getTopScore();
    choices = [];
    document.getElementById("currentScore").innerText = choices.length + 1;
    makeArr(false)
    getTopScore();
    for (let e in start) {
        start[e].style.color = "white"
    }
}

function getTopScore() {
    document.getElementById("topScore").innerText = topScore;
}

function checkWin() {
    if (choices.length == 9) {
        overScore++;
        localStorage.setItem("OverallScore", JSON.stringify(overScore))
        topScore = 0;
        displayScore();
    }
}

for (let v in start) {
    start[v].addEventListener("click", () => {
        if (+start[v].innerText == choices.length + 1) {
            correct();
        } else {
            incorrect();
        }

    })
}