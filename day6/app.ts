const sliderBtn = document.querySelector("#priceRange") as HTMLElement;

// add listener to slider
sliderBtn.addEventListener("input", (event: Event) => {
  updatePrice(event);
});

function updatePrice(event: Event) {
  let target = event.target as HTMLInputElement;
  let value = target.value;

  //to dollars and cents
  let dollars = Math.floor(parseInt(value) / 100)
    .toString()
    .padStart(2, "0");
  let cents = (parseInt(value) % 100).toString().padStart(2, "0");
  let price = document.querySelector("#price") as HTMLElement;
  price.innerHTML = `${dollars}.${cents}`;
}
