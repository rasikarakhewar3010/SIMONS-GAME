let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = 0; // Variable to track the highest score
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game has started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = []; // Reset user sequence for the new level
    level++;
    h2.innerHTML = `Level ${level}`;
    
    // Randomly choose a button
    let randIdx = Math.floor(Math.random() * 4); // Should be * 4, not * 3
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Update high score if the current level is higher than the high score
        if (level > highScore) {
            highScore = level;
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br> Highest score: <b>${highScore}</b><br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        
        reset(); // Call reset when game is over
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
