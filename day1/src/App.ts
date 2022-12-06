async function startTimer() {
  console.log("Starting timer...");
}


const seconds = document.querySelector("seconds");
const minutes = document.querySelector("minutes");

const settings = document.querySelector("settings");
const start = document.querySelector("start");



// boolean to check if timer is running
let isRunning: boolean = false;

// add event listener to start button
start.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    startTimer();
  }
}
