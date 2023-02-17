"use strict";
//select all keys
let keys = document.querySelectorAll(".key");
//mouse event listener
keys.forEach((key) => {
    //mouse event
    key.addEventListener("click", (e) => {
        addJiggle(e);
    });
});
//listen for key press
document.addEventListener("keydown", (e) => {
    addJiggle(e);
});
function addJiggle(e) {
    let key = new EventTarget();
    //check if event is mouse or keyboard
    if (e instanceof MouseEvent) {
        e = e;
        //get clicked element
        let clickedElement = e.target;
        key = document.querySelector(`.key[data-key="${clickedElement.dataset.key}"]`);
    }
    else if (e instanceof KeyboardEvent) {
        e = e;
        key = document.querySelector(`.key[data-key="${e.key.toUpperCase()}"]`);
    }
    if (key && key.classList.contains("jiggle")) {
        key.classList.remove("jiggle");
        //select random key
        let randomKey = keys[Math.floor(Math.random() * keys.length)];
        //add wiggle class
        randomKey.classList.add("jiggle");
    }
}
