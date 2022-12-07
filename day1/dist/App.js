"use strict";
const seconds = document.querySelector(".seconds > input[type=number]");
const minutes = document.querySelector(".minutes > input[type=number]");
const settings = document.querySelector(".settings");
const start = document.querySelector(".start");
// boolean to check if timer is running
let isRunning = false;
let intervalId;
// add event listener to start button
start.addEventListener("click", () => {
    if (!isRunning) {
        startTimer();
    }
    else {
        stopTimer();
    }
});
//settings is selected
settings.addEventListener("click", () => {
    if (isRunning) {
        stopTimer();
    }
    seconds.disabled = seconds.disabled ? false : true;
    minutes.disabled = minutes.disabled ? false : true;
});
//start timer
async function startTimer() {
    console.log("Starting timer...");
    isRunning = true;
    //toggle start text to stop
    start.innerHTML = "Stop";
    //disable settings and minutes from being changed
    seconds.disabled = true;
    minutes.disabled = true;
    //total time in seconds
    let totalTime = parseInt(seconds.value) + parseInt(minutes.value) * 60;
    intervalId = setInterval(() => {
        let sec = parseInt(seconds.value);
        let min = parseInt(minutes.value);
        //calculate seconds and minutes from total and pad with 0 if needed
        seconds.value =
            (totalTime % 60).toString().length === 1
                ? "0" + (totalTime % 60).toString()
                : (totalTime % 60).toString();
        minutes.value =
            Math.floor(totalTime / 60).toString() === "0"
                ? "00"
                : Math.floor(totalTime / 60).toString();
        if (totalTime === 0) {
            stopTimer();
            console.log("Time's up!");
        }
        totalTime--;
        console.log("Current time is: " + minutes.value + ":" + seconds.value);
    }, 1000);
}
//stop timer
async function stopTimer() {
    console.log("Stopping timer...");
    clearInterval(intervalId);
    start.innerHTML = "Start";
    isRunning = false;
}
