// Constants
const taxDiscount = 2570;

// DOM elements
const linesContainer = document.getElementById("linesContainer");

// Switch between modes
function switchMode(mode) {
  document.getElementById("singleInputMode").classList.toggle("hidden", mode !== 'single');
  document.getElementById("lineFieldsMode").classList.toggle("hidden", mode !== 'lines');
}

// Add a new line
function addLine() {
  const line = document.createElement("div");
  line.classList.add("line");
  line.innerHTML = `
    <input type="number" placeholder="Hodiny" class="hours" />
    <input type="number" placeholder="Sazba" class="hourRate" />
    <input type="number" placeholder="+ %" class="bonusPercent" />
    <button onclick="removeLine(this)">&#x2716;</button>
  `;
  linesContainer.appendChild(line);
}

// Remove a line
function removeLine(button) {
  button.parentElement.remove();
  calculateLineMode();
}

// Calculate single mode
function calculateSingleMode() {
  const x = parseFloat(document.getElementById("singleInputX").value);
  if (isNaN(x)) return alert("Zadejte platnou hrubou mzdu.");
  updateTable(x);
}

// Calculate line mode
function calculateLineMode() {
  const hoursTotal = document.querySelectorAll(".hours");
  const hourRateTotal = document.querySelectorAll(".hourRate");
  const bonusPercentCelkem = document.querySelectorAll(".bonusPercent");

  let totalSum = 0;
  hoursTotal.forEach((input, index) => {
    const hours = parseFloat(input.value) || 0;
    const hourRate = parseFloat(hourRateTotal[index].value) || 0;
    const bonus = parseFloat(bonusPercentCelkem[index].value) || 0;
    totalSum += hours * hourRate * (1 + bonus / 100);
  });

  if (totalSum) {
    updateTable(totalSum);
  } else {
    alert("Zadejte platné hodnoty.");
  }
}

// Update the results table
function updateTable(grossWage) {
  const ztpCheckbox = document.getElementById("ztpDiscount");
  const ztpDiscountValue = ztpCheckbox.checked ? 1345 : 0;
  const totalTaxDiscount = taxDiscount + ztpDiscountValue;

  const socialEmployee = grossWage * 0.071;
  const healthEmployee = grossWage * 0.045;
  const socialEmployer = grossWage * 0.248;
  const healthEmployer = grossWage * 0.09;
  const tax = Math.max(grossWage * 0.15 - totalTaxDiscount, 0);
  const netIncome = grossWage - socialEmployee - healthEmployee - tax;
  const totalEmployerCost = grossWage + socialEmployer + healthEmployer;

  document.getElementById("grossWage").innerText = grossWage.toFixed(2);
  document.getElementById("socialEmployee").innerText = socialEmployee.toFixed(2);
  document.getElementById("healthEmployee").innerText = healthEmployee.toFixed(2);
  document.getElementById("taxWithoutReduction").innerText = (grossWage * 0.15).toFixed(2);
  document.getElementById("taxWithReduction").innerText = tax.toFixed(2);
  document.getElementById("netIncome").innerText = netIncome.toFixed(2);
  document.getElementById("socialEmployer").innerText = socialEmployer.toFixed(2);
  document.getElementById("healthEmployer").innerText = healthEmployer.toFixed(2);
  document.getElementById("totalEmployerCost").innerText = totalEmployerCost.toFixed(2);
}

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
  // Default to single mode
  switchMode('single');
  
  // Add event listeners if not already in HTML
  document.getElementById("exportButton").addEventListener("click", exportToPDF);
}); 