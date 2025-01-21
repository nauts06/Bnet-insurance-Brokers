// References to display elements
const historyDisplay = document.getElementById("history");
const currentCalculationDisplay = document.getElementById("current-calculation");
const historyList = document.getElementById("history-list");

// Calculator state
let currentInput = "";
let calculationHistory = [];
let lastOperator = "";
let pastCalculations = [];

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
  addToHistory(calculationHistory.join(" ") + " = " + result);
  currentInput = result.toString();
  calculationHistory = [];
  updateDisplay();
}

// Add to history
function addToHistory(calculation) {
  pastCalculations.push(calculation);
  const li = document.createElement("li");
  li.textContent = calculation;
  historyList.appendChild(li);
}

// Handle clear button
function clearCalculation() {
  currentInput = "";
  calculationHistory = [];
  updateDisplay();
}

// Handle keyboard input
function handleKeyboardInput(event) {
  const { key } = event;
  if (!isNaN(key)) {
    handleNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleOperator(key);
  } else if (key === "=" || key === "Enter") {
    calculate();
  } else if (key === "C" || key === "c") {
    clearCalculation();
  }
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

document.addEventListener("keydown", handleKeyboardInput);
