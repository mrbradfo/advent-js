"use strict";
const sliderBtn = document.querySelector("#priceRange");
// add listener to slider
sliderBtn.addEventListener("input", (event) => {
    updatePrice(event);
});
function updatePrice(event) {
    let target = event.target;
    let value = target.value;
    //to dollars and cents
    let dollars = Math.floor(parseInt(value) / 100)
        .toString()
        .padStart(2, "0");
    let cents = (parseInt(value) % 100).toString().padStart(2, "0");
    let price = document.querySelector("#price");
    price.innerHTML = `${dollars}.${cents}`;
}
