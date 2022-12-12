"use strict";
const menuItems = [
    {
        name: "French Fries with Ketchup",
        price: 223,
        image: "plate__french-fries.png",
        alt: "French Fries",
        count: 0,
    },
    {
        name: "Salmon and Vegetables",
        price: 512,
        image: "plate__salmon-vegetables.png",
        alt: "Salmon and Vegetables",
        count: 0,
    },
    {
        name: "Spaghetti Meat Sauce",
        price: 782,
        image: "plate__spaghetti-meat-sauce.png",
        alt: "Spaghetti with Meat Sauce",
        count: 0,
    },
    {
        name: "Bacon, Eggs, and Toast",
        price: 599,
        image: "plate__bacon-eggs.png",
        alt: "Bacon, Eggs, and Toast",
        count: 0,
    },
    {
        name: "Chicken Salad with Parmesan",
        price: 698,
        image: "plate__chicken-salad.png",
        alt: "Chicken Salad with Parmesan",
        count: 0,
    },
    {
        name: "Fish Sticks and Fries",
        price: 634,
        image: "plate__fish-sticks-fries.png",
        alt: "Fish Sticks and Fries",
        count: 0,
    },
];
const menu = document.querySelector("ul.menu");
const renderMenu = (menuItems) => {
    let menuString = menuItems
        .map((menuItem, index) => {
        const dollars = Math.floor(menuItem.price / 100);
        const cents = menuItem.price % 100;
        return `
      <li>
        <div class="plate">
          <img
            src="images/${menuItem.image}"
            alt="${menuItem.alt}"
            class="plate"
          />
        </div>
        <div class="content">
          <p class="menu-item">${menuItem.name}</p>
          <p class="price">${dollars}.${cents}</p>
          ${menuItem.count > 0
            ? `<button class="in-cart" onClick=addToCartOnClick()>
          <img src="images/check.svg" alt="Check" />
          In Cart
        </button>`
            : `<button class="add" onClick=addToCartOnClick()>
       Add To Cart
      </button>`}
        </div>
      </li>;
    `;
    })
        .join("");
    menu.innerHTML = menuString;
};
function addToCartOnClick() {
    console.log("add to cart button clicked");
    renderMenu(menuItems);
}
renderMenu(menuItems);
