const tipAmountField = document.querySelector(
  "#tip-amount"
)! as HTMLFormElement;

const perPersonTotalField = document.querySelector(
  "#total-per-person"
)! as HTMLFormElement;

const billAmountInput = document.querySelector(
  "#bill-amount"
)! as HTMLFormElement;

const numOfPeopleInput = document.querySelector(
  "#number-of-people"
)! as HTMLFormElement;

//select by id
const fivePercentBtn = document.querySelector(
  "#five-percent"
)! as HTMLInputElement;
const tenPercentBtn = document.querySelector(
  "#ten-percent"
)! as HTMLInputElement;
const fifteenPercentBtn = document.querySelector(
  "#fifteen-percent"
)! as HTMLInputElement;

const twentyPercentBtn = document.querySelector(
  "#twenty-percent"
)! as HTMLInputElement;

const calculateBtn = document.querySelector("#calculate")! as HTMLInputElement;

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
function calculateTip(tipPercent: number) {
  //update text field
  tipAmountField.innerText = (
    (tipPercent / 100) *
    billAmountInput.value
  ).toFixed(2);
  calculateTotalPerPerson();
}

//calculate total per person
function calculateTotalPerPerson() {
  const billAmount: number = Number(billAmountInput.value);
  const tipAmount: number = Number(tipAmountField.innerText);

  perPersonTotalField.innerText = (
    (billAmount + tipAmount) /
    numOfPeopleInput.value
  ).toFixed(2);
}
