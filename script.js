// References to display elements
const historyDisplay = document.getElementById("history");
const currentCalculationDisplay = document.getElementById("current-calculation");

// Calculator state
let currentInput = "";
let calculationHistory = [];
let lastOperator = "";

// Update display
function updateDisplay() {
  currentCalculationDisplay.textContent = currentInput || "0";
  historyDisplay.textContent = calculationHistory.join(" ");
}

// Handle number button clicks
function handleNumber(value) {
  currentInput += value;
  updateDisplay();
}

// Handle operator button clicks
function handleOperator(value) {
  if (currentInput === "" && calculationHistory.length === 0) return;
  if (currentInput !== "") {
    calculationHistory.push(currentInput);
    currentInput = "";
  }
  calculationHistory.push(value);
  lastOperator = value;
  updateDisplay();
}

// Handle equal button
function calculate() {
  if (currentInput !== "") {
    calculationHistory.push(currentInput);
  }
  const result = eval(calculationHistory.join(" "));
  currentInput = result.toString();
  calculationHistory = [];
  updateDisplay();
}

// Handle clear button
function clearCalculation() {
  currentInput = "";
  calculationHistory = [];
  updateDisplay();
}

// Button click events
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    if (button.classList.contains("number")) {
      handleNumber(value);
    } else if (button.classList.contains("operator")) {
      handleOperator(value);
    } else if (button.classList.contains("action")) {
      if (value === "=") {
        calculate();
      } else if (value === "C") {
        clearCalculation();
      }
    }
  });
});
