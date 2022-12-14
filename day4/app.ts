//select all keys
let keys = document.querySelectorAll(".key") as NodeListOf<HTMLDivElement>;

//mouse event listener
keys.forEach((key) => {
  //mouse event
  key.addEventListener("click", (e: MouseEvent) => {
    addJiggle(e);
  });
});

//listen for key press
document.addEventListener("keydown", (e: KeyboardEvent) => {
  addJiggle(e);
});

function addJiggle(e: MouseEvent | KeyboardEvent) {
  let key = new EventTarget() as HTMLDivElement;

  //check if event is mouse or keyboard
  if (e instanceof MouseEvent) {
    e = e as MouseEvent;
    //get clicked element
    let clickedElement = e.target as HTMLElement;

    key = document.querySelector(
      `.key[data-key="${clickedElement.dataset.key}"]`
    ) as HTMLDivElement;
  } else if (e instanceof KeyboardEvent) {
    e = e as KeyboardEvent;
    key = document.querySelector(
      `.key[data-key="${e.key.toUpperCase()}"]`
    ) as HTMLDivElement;
  }

  if (key && key.classList.contains("jiggle")) {
    key.classList.remove("jiggle");
    //select random key
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    //add wiggle class
    randomKey.classList.add("jiggle");
  }
}
