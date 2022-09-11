/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");

var easy = document.querySelector(".easy");
var medium = document.querySelector(".medium");
var hard = document.querySelector(".hard");
var start = document.querySelector(".start");
var containerStatus = document.querySelector(".container__status");
var containerGame = document.querySelector(".container__game");
var titleGameStatus = document.querySelector(".title__game-status");
var statusGame = "easy";
var myCards = document.getElementById("container");
var resultsArray = [];
var counter = 0;
var seconds = 0;
var tens = 0;
var tries = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var clone;
var cards;
var Interval;
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
        if (containerGame) {
            containerGame.classList.toggle("hidden");
        }
        if (containerStatus) {
            containerStatus.classList.toggle("hidden");
        }
        var Interval = setInterval(startTimer, 10);
        console.log(statusGame);
        var images;
        if (statusGame === "easy") {
            images = ["1", "2", "3", "4", "5", "6"];
        }
        else if (statusGame === "medium") {
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
        }
        else if (statusGame === "hard") {
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
            clone = images.slice(0); // duplicate array
            cards = images.concat(clone); // merge to arrays
        }
        shuffle(cards);
        var _loop_1 = function (i) {
            var card = document.createElement("div");
            card.dataset.item = cards[i];
            card.dataset.view = "card";
            card.className = "flipped";
            if (myCards) {
                myCards.appendChild(card);
            }
            card.onclick = function () {
                if (card.className != "flipped" &&
                    card.className != "correct") {
                    card.className = "flipped";
                    var result = card.dataset.item;
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
                    }
                    else {
                        check("reverse");
                        resultsArray = [];
                        console.log(tries);
                        clearInterval(Interval);
                        var winImage = document.querySelector(".win__image");
                        var loseImage = document.querySelector(".lose__image");
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
            setTimeout(function () { return check("reverse"); }, 5000);
        };
        for (var i = 0; i < cards.length; i++) {
            _loop_1(i);
        }
    };
}
// Shufffel function
function shuffle(o) {
    for (var j = void 0, x = void 0, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
        ;
    return o;
}
window.onload = function () {
    var span = document.getElementById("triesid");
    var tries = 0;
    if (span) {
        span.innerHTML = tries.toString();
    }
    document.body.onclick = function (e) {
        e = e || event;
        var target = e.target || e.srcElement;
        if (target) {
            if (target.className != "flipped")
                return;
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
var check = function (className) {
    var x = document.getElementsByClassName("flipped");
    setTimeout(function () {
        for (var i = x.length - 1; i >= 0; i--) {
            x[i].className = className;
        }
    }, 500);
};
var resultDiv = document.getElementById("zatemnenie");
var timeResult = document.querySelector(".timeResult");
var winLose = document.querySelector(".win__lose");
var titleResult = document.querySelector(".title__result");
var statusGameWin = function () {
    if (statusGame === "easy" && counter === 6) {
        win();
    }
    else if (statusGame === "medium" && counter === 12) {
        win();
    }
    else if (statusGame === "hard" && counter === 18) {
        win();
    }
};
var win = function () {
    clearInterval(Interval);
    if (timeResult) {
        timeResult.textContent = seconds + "." + tens;
    }
    if (resultDiv) {
        resultDiv.style.display = "block";
    }
};

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map