function calculate() {
  if (isValidOperation()) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.querySelector(
      'input[name="operation"]:checked'
    ).value;
    let result;

    switch (operation) {
      case "add":
        result = num1 + num2;
        break;
      case "subtract":
        result = num1 - num2;
        break;
      case "multiply":
        result = num1 * num2;
        break;
      case "divide":
        result = num1 / num2;
        break;
    }
    document.getElementById("result").value = result;
  }
}

const firstNumInput = document.querySelector("#num1");
const secondNumInput = document.querySelector("#num2");

function toggleErrorIndicator(input, type) {
  if (type === true) {
    if (!input.classList.contains("border-red-500")) {
      input.classList.add("border-red-500", "border-2", "outline-red-500");
    }
  } else {
    input.classList.remove("border-red-500", "border-2", "outline-red-500");
  }
}

function isValidOperation() {
  const inputs = document.querySelectorAll("input[type='text']:not(#result)");
  console.log(inputs);
  let allInputValidated = true;
  inputs.forEach((input) => {
    allInputValidated = validateInput(input) && allInputValidated;
  });

  let operationValidated = validateOperation();
  return allInputValidated && operationValidated;
}

function validateInput(input) {
  const inputValue = input.value;
  let hasErrorInInput = false;
  const inputErrorNotifier = input
    .closest("div")
    .querySelector('p[id$="-error"]');
  if (isNaN(inputValue) || inputValue === "") {
    hasErrorInInput = true;
    if (inputValue === "") {
      inputErrorNotifier.textContent = "This field can not be empty!";
    } else {
      inputErrorNotifier.textContent =
        "Invalid value! Please using a number for this field!";
    }
  } else {
    inputErrorNotifier.textContent = "";
  }
  if (hasErrorInInput) {
    inputErrorNotifier.classList.remove("hidden");
    toggleErrorIndicator(input, true);
  } else {
    inputErrorNotifier.classList.add("hidden");
    toggleErrorIndicator(input);
  }
  return !hasErrorInInput;
}

function validateOperation() {
  console.log("hjo");

  const operation = document.querySelector("input[type='radio']:checked");

  if (operation === null) {
    document.querySelector("#operation-error").classList.remove("hidden");
    return false;
  } else {
    const operationError = document.querySelector("#operation-error");
    if (!operationError.classList.contains("hidden")) {
      operationError.classList.add("hidden");
    }
    return true;
  }
}

firstNumInput.addEventListener("focusout", () => {
  validateInput(firstNumInput);
});

secondNumInput.addEventListener("focusout", () => {
  validateInput(secondNumInput);
});

document.querySelectorAll("input[type='radio']").forEach((input) => {
  input.addEventListener("input", () => {
    validateOperation();
  });
});
