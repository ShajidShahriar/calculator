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
let singleOperation = false;

const display = document.querySelector(".display");
display.textContent = "0";
const buttons = document.querySelectorAll(
  ".buttons button, .zero-container button"
);

function updateDisplay(value) {
  if (shouldResetDisplay || display.textContent ==="Error") {
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
    if (!isNaN(value)) {
      updateDisplay(value);
      return;
    }

    if (value === ".") {
      if (display.textContent.includes(".")) return;
      updateDisplay(value);
      return;
    }

    if (["+", "-", "×", "÷"].includes(value)) {
      firstNumber = display.textContent;
      shouldResetDisplay = true;
      singleOperation = true;
      operator = value;

      document.querySelectorAll(".operator").forEach((btn)=> btn.classList.remove("active-operator"))

      button.classList.add("active-operator")
      console.log(`firstnum:${firstNumber}`);
      console.log(`secondnum:${secondNumber}`);
      console.log(`singleoperation:${singleOperation}`);
    }

    if (value === "=") {
      if (singleOperation) {
        secondNumber = display.textContent;
      } else {
        firstNumber = display.textContent;
      }

      let result = operate(firstNumber, secondNumber, operator);
      display.textContent = result;
      console.log(`result:${result}`);
      shouldResetDisplay = true;
      singleOperation = false;
      console.log(`firstnum:${firstNumber}`);
      console.log(`secondnum:${secondNumber}`);
      console.log(`singleoperation:${singleOperation}`);
      document.querySelectorAll(".operator").forEach((btn)=> btn.classList.remove("active-operator"))

      if (result === "Error") {
        firstNumber = "";
        operator = "";
        secondNumber = "";
      }
    }

    if (value === "±") {
      let currentValue = display.textContent;

      if (currentValue === "0") return;

      if (currentValue.startsWith("-")) {
        display.textContent = currentValue.slice(1);
      } else {
        display.textContent = "-" + currentValue;
        console.log(`firstnum:${firstNumber}`);
        console.log(`secondnum:${secondNumber}`);
        console.log(`singleoperation:${singleOperation}`);
      }
    }
    if (value === "C") {
      shouldResetDisplay = true;
      updateDisplay("0");
      firstNumber = "";
      secondNumber = "";
      console.log(`firstnum:${firstNumber}`);
      console.log(`secondnum:${secondNumber}`);
      console.log(`singleoperation:${singleOperation}`);
      document.querySelectorAll(".operator").forEach((btn)=> btn.classList.remove("active-operator"))

    }
    if (value === "←") {
      display.textContent = display.textContent.slice(0, -1) || "0";
      console.log(`firstnum:${firstNumber}`);
      console.log(`secondnum:${secondNumber}`);
      console.log(`singleoperation:${singleOperation}`);
    }
  });
});
