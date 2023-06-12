"use strict";
const TAX_RATE = 0.1; // 10% tax rate
//menu items
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
//cart items
let cartItems = [];
const menu = document.querySelector("ul.menu");
const renderMenu = () => {
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
          <p class="price">$${dollars}.${cents}</p>
          ${menuItem.count > 0
            ? `<button class="in-cart">
          <img src="images/check.svg" alt="Check" />
          In Cart
        </button>`
            : `<button class="add" onClick=addToCartOnClick(${index})>
       Add To Cart
      </button>`}
        </div>
      </li>;
    `;
    })
        .join("");
    menu.innerHTML = menuString;
};
function addToCartOnClick(index) {
    console.log("adding item " + index + " to cart");
    menuItems[index].count++;
    //add only if not already in cart
    if (!cartItems.includes(menuItems[index])) {
        cartItems.push(menuItems[index]);
    }
    renderCart(cartItems);
}
const cart = document.querySelector("ul.cart-summary");
function renderCart(cartItems) {
    console.log("rendering cart");
    const cartString = cartItems
        .map((menuItem, index) => {
        //if item is not in cart, don't render it
        if (menuItem.count <= 0)
            return "";
        const totalPrice = menuItem.price * menuItem.count;
        const dollars = Math.floor(totalPrice / 100);
        const cents = totalPrice % 100;
        return `<li>
    <div class="plate">
      <img
        src="images/${menuItem.image}"
        alt="${menuItem.alt}"
        class="plate"
      />
      <div class="quantity">${menuItem.count}</div>
    </div>
    <div class="content">
      <p class="menu-item">${menuItem.name}</p>
      <p class="price">${menuItem.price}</p>
    </div>
    <div class="quantity__wrapper">
      <button class="decrease" onClick="decreaseQuantity(${index})">
        <img src="images/chevron.svg" />
      </button>
      <div class="quantity">${menuItem.count}</div>
      <button class="increase" onClick="increaseQuantity(${index})">
        <img src="images/chevron.svg" />
      </button>
    </div>
    <div class="subtotal">$${dollars}.${cents}</div>
  </li>`;
    })
        .join("");
    cart.innerHTML = cartString;
    renderMenu();
    renderTotals();
}
//render totals at bottom of cart
const subtotal = document.querySelector(".amount.price.subtotal");
const tax = document.querySelector(".amount.price.tax");
const total = document.querySelector(".amount.price.total");
function renderTotals() {
    const subtotalAmt = cartItems
        .map((menuItem) => {
        return menuItem.count * menuItem.price;
    })
        .reduce((total, currentItem) => total + currentItem);
    let taxAmt = ((TAX_RATE * subtotalAmt) / 100).toFixed(2);
    subtotal.innerHTML = "$" + convertToDollarsAndCents(subtotalAmt).toFixed(2);
    tax.innerHTML = "$" + taxAmt;
    total.innerHTML =
        "$" +
            convertToDollarsAndCents(subtotalAmt + Number(taxAmt) * 100).toFixed(2);
}
// decreaseQuantity
function decreaseQuantity(index) {
    console.debug("decreasing quantity of item " + index);
    menuItems[index].count--;
    renderCart(menuItems);
}
// increaseQuantity
function increaseQuantity(index) {
    console.debug("increasing quantity of item " + index);
    menuItems[index].count++;
    renderCart(menuItems);
}
renderMenu();
//helper function to convert cents to dollars and cents
//convert unformated number to dollars and cents
//eg 223 to 2.23
function convertToDollarsAndCents(total) {
    const dollars = Math.floor(total / 100);
    const cents = Math.round(total % 100);
    let dollarsAndCents = "";
    if (cents < 10)
        dollarsAndCents = dollars + "." + "0" + cents;
    else
        dollarsAndCents = dollars + "." + cents;
    //dollarsAndCents to number
    const dollarsAndCentsAsNumber = Number(dollarsAndCents);
    dollarsAndCentsAsNumber.toFixed(2);
    return Number(dollarsAndCentsAsNumber);
}
