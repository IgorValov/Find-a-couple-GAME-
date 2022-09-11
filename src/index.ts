import "./style.css";
const easy: HTMLElement | null = document.querySelector(".easy");
const medium: HTMLElement | null = document.querySelector(".medium");
const hard: HTMLElement | null = document.querySelector(".hard");
const start: HTMLElement | null = document.querySelector(".start");
const containerStatus: HTMLElement | null =
    document.querySelector(".container__status");
const containerGame: HTMLElement | null =
    document.querySelector(".container__game");
let titleGameStatus: HTMLElement | null = document.querySelector(
    ".title__game-status"
);
let statusGame = "easy";
let myCards: HTMLElement | null = document.getElementById("container");
let resultsArray: string[] = [];
let counter = 0;
let seconds = 0;
let tens = 0;
let tries = 0;
let appendTens: HTMLElement | null = document.getElementById("tens");
let appendSeconds: HTMLElement | null = document.getElementById("seconds");
let clone;
let cards: string[];
let Interval: string | number | undefined;

if (easy) {
    easy.onclick = function gameMode() {
        statusGame = "easy";
        console.log(statusGame);
    };
}
if (medium) {
    medium.onclick = function gameMode() {
        statusGame = "medium";
        console.log(statusGame);
    };
}
if (hard) {
    hard.onclick = function gameMode() {
        statusGame = "hard";
        console.log(statusGame);
    };
}
if (start) {
    start.onclick = function start() {
        debugger;
        if (containerGame) {
            containerGame.classList.toggle("hidden");
        }
        if (containerStatus) {
            containerStatus.classList.toggle("hidden");
        }
        let Interval = setInterval(startTimer, 10);
        console.log(statusGame);
        let images: string[] = [];
        if (statusGame === "easy") {
            images = ["1", "2", "3", "4", "5", "6"];
        } else if (statusGame === "medium") {
            images = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ];
        } else if (statusGame === "hard") {
            images = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
            ];
        }

        clone = images.slice(0); // duplicate array
        cards = images.concat(clone); // merge to arrays
        shuffle(cards);

        for (let i = 0; i < cards.length; i++) {
            let card = document.createElement("div");
            card.dataset.item = cards[i];
            card.dataset.view = "card";
            card.className = "flipped";
            if (myCards) {
                myCards.appendChild(card);
            }
            card.onclick = function () {
                if (
                    card.className != "flipped" &&
                    card.className != "correct"
                ) {
                    card.className = "flipped";
                    let result = card.dataset.item;
                    if (result) {
                        resultsArray.push(result);
                    }
                    clearInterval(Interval);
                    Interval = setInterval(startTimer, 10);
                }

                if (resultsArray.length > 1) {
                    if (resultsArray[0] === resultsArray[1]) {
                        check("correct");
                        counter++;
                        statusGameWin();
                        resultsArray = [];
                    } else {
                        check("reverse");
                        resultsArray = [];
                        console.log(tries);
                        clearInterval(Interval);
                        let winImage = document.querySelector(".win__image");
                        let loseImage = document.querySelector(".lose__image");
                        if (winImage) {
                            winImage.classList.toggle("hidden");
                        }
                        if (loseImage) {
                            loseImage.classList.toggle("hidden");
                        }
                        if (timeResult) {
                            timeResult.textContent = seconds + "." + tens;
                        }
                        if (titleResult) {
                            titleResult.textContent = "Вы проиграли!";
                        }
                        if (resultDiv) {
                            resultDiv.style.display = "block";
                        }
                    }
                }
            };
            setTimeout(() => check("reverse"), 5000);
        }
    };
}

// Shufffel function
function shuffle(o: string[]) {
    console.log(o);
    for (
        let j, x, i = o.length;
        i;
        j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
}

window.onload = function () {
    let span = document.getElementById("triesid");
    let tries = 0;
    if (span) {
        span.innerHTML = tries.toString();
    }
    document.body.onclick = function (e) {
        e = e || event;
        let target: HTMLElement | null =
            (e.target as HTMLElement) || e.srcElement;
        if (target) {
            if (target.className != "flipped") return;
        }
        tries++;
        if (span) {
            span.innerHTML = Math.floor(tries / 2).toString();
        }
    };
};
function startTimer() {
    tens++;

    if (tens < 9) {
        if (appendTens) {
            appendTens.innerHTML = "0" + tens;
        }
    }

    if (tens > 9) {
        if (appendTens) {
            appendTens.innerHTML = tens.toString();
        }
    }

    if (tens > 99) {
        seconds++;
        if (appendSeconds) {
            appendSeconds.innerHTML = "0" + seconds;
        }
        tens = 0;
        if (appendTens) {
            appendTens.innerHTML = "0" + 0;
        }
    }

    if (seconds > 9) {
        if (appendSeconds) {
            appendSeconds.innerHTML = seconds.toString();
        }
    }
}

let check = function (className: string) {
    let x = document.getElementsByClassName("flipped");

    setTimeout(function () {
        for (let i = x.length - 1; i >= 0; i--) {
            x[i].className = className;
        }
    }, 500);
};
const resultDiv = document.getElementById("zatemnenie");
const timeResult = document.querySelector(".timeResult");
const winLose = document.querySelector(".win__lose");
const titleResult = document.querySelector(".title__result");
let statusGameWin = function () {
    if (statusGame === "easy" && counter === 6) {
        win();
    } else if (statusGame === "medium" && counter === 12) {
        win();
    } else if (statusGame === "hard" && counter === 18) {
        win();
    }
};
let win = function () {
    clearInterval(Interval);
    if (timeResult) {
        timeResult.textContent = seconds + "." + tens;
    }
    if (resultDiv) {
        resultDiv.style.display = "block";
    }
};
