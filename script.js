function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (operator === "+") {
    return add(a, b);
  }
  if (operator === "-") {
    return subtract(a, b);
  }
  if (operator === "×") {
    return multiply(a, b);
  }
  if (operator === "÷" && b === 0) return "Error";

  if (operator === "÷") {
    return divide(a, b);
  }
}

let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;

const display = document.querySelector(".display");
display.textContent = "0";
const buttons = document.querySelectorAll(".buttons button, .zero-container button");

function updateDisplay(value) {
  if (shouldResetDisplay) {
    display.textContent = `${value}`;
    shouldResetDisplay = false;
  } else {
    display.textContent =
      display.textContent === "0" ? value : display.textContent + value;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (!isNaN(value) || value === ".") {
      updateDisplay(value);
    } else if (["+", "-", "×", "÷"].includes(value)) {
      firstNumber = display.textContent;
      shouldResetDisplay = true;
      operator = value;
      console.log(value);
      console.log(`firstnum: ${firstNumber}`);
    } else if (value === "=") {
      secondNumber = display.textContent;
      console.log(`secondnum: ${secondNumber}`);
      display.textContent = operate(firstNumber, secondNumber, operator);
      console.log(`result:${display.textContent}`);
      shouldResetDisplay = true;
    } else if (value === "±") {
      let currentValue = display.textContent;

      if (currentValue === "0") return;

      if (currentValue.startsWith("-")) {
        display.textContent = currentValue.slice(1);
      } else {
        display.textContent = "-" + currentValue;
      }
    } else if (value === "C") {
      shouldResetDisplay = true;
      updateDisplay("0");
      firstNumber = "";
      secondNumber = "";
    } else if (value === "←") {
      display.textContent = display.textContent.slice(0, -1) || "0";
    }

  });
});
