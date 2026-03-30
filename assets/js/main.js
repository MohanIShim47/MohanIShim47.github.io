function calculate() {
  const input = document.getElementById("calc-input").value;
  try {
    document.getElementById("calc-result").innerText = eval(input);
  } catch {
    document.getElementById("calc-result").innerText = "Error";
  }
}