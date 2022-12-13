//select all keys
let keys = document.querySelectorAll(".key");

//add event listener to each key
keys.forEach((key) => {
  //add event listener to white key
  let whiteNote = key.querySelector(".white-key") as HTMLDivElement;
  if (whiteNote == null) return;
  whiteNote.addEventListener("click", () => {
    playAudio(whiteNote);
  });

  //add listener to black key
  let blackNote = key.querySelector(".black-key") as HTMLDivElement;
  if (blackNote == null) return;
  blackNote.addEventListener("click", () => {
    playAudio(blackNote);
  });
});

//play audio function
function playAudio(note: HTMLElement) {
  let audio = new Audio(`./assets/audio/piano/${note.dataset.note}.mp3`);
  audio.play();
}
