"use strict";
const tipAmountField = document.querySelector("#tip-amount");
const perPersonTotalField = document.querySelector("#total-per-person");
const billAmountInput = document.querySelector("#bill-amount");
const numOfPeopleInput = document.querySelector("#number-of-people");
//select by id
const fivePercentBtn = document.querySelector("#five-percent");
const tenPercentBtn = document.querySelector("#ten-percent");
const fifteenPercentBtn = document.querySelector("#fifteen-percent");
const twentyPercentBtn = document.querySelector("#twenty-percent");
const calculateBtn = document.querySelector("#calculate");
//add event listeners
fivePercentBtn.addEventListener("click", () => {
    calculateTip(5);
});
tenPercentBtn.addEventListener("click", () => {
    calculateTip(10);
});
fifteenPercentBtn.addEventListener("click", () => {
    calculateTip(15);
});
twentyPercentBtn.addEventListener("click", () => {
    calculateTip(20);
});
calculateBtn.addEventListener("click", () => {
    calculateTotalPerPerson();
});
//calculate tip amount
//tip amount = bill amount * tip percent
function calculateTip(tipPercent) {
    //update text field
    tipAmountField.innerText = ((tipPercent / 100) *
        billAmountInput.value).toFixed(2);
    calculateTotalPerPerson();
}
//calculate total per person
function calculateTotalPerPerson() {
    const billAmount = Number(billAmountInput.value);
    const tipAmount = Number(tipAmountField.innerText);
    perPersonTotalField.innerText = ((billAmount + tipAmount) /
        numOfPeopleInput.value).toFixed(2);
}
