// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
// document.querySelector("footer").innerHTML =
//   `${gameName} Game Created By Eslam Radwan`;

// Manage Words
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Finish",
  "Art",
  "hat",
  "key",
  "box",
  "ice",
  "book",
  "tree",
  "fish",
  "bird",
  "milk",
  "moon",
  "apple",
  "grape",
  "house",
  "chair",
  "table",
  "phone",
  "water",
  "light",
  "smile",
  "bread",
  "clock",
  "train",
  "plane",
  "beach",
  "river",
  "music",
  "heart",
  "dream",
  "green",
  "black",
  "orange",
  "yellow",
  "purple",
  "silver",
  "golden",
  "window",
  "garden",
  "school",
  "animal",
  "friend",
  "family",
  "market",
  "summer",
  "winter",
  "spring",
  "coffee",
  "butter",
  "cookie",
  "basket",
  "forest",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
const messageArea = document.querySelector(".message");

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = wordToGuess.length;
let currentTry = 1;
let numberOfHints = 2;

function generateInputs() {
  const inputsContainer = document.querySelector(".inputs");

  // Create Main Try Div
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    // Create Inputs
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }

  // Focus On First Input In First Try Element
  inputsContainer.children[0].children[1].focus();

  // Disable All Inputs Except Frist One
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input",
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  let inputsEmpty;
  inputs.forEach((input, index) => {
    // Convert Input To Uppercase
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      const nextInput = inputs[index + 1];
      if (!nextInput.disabled) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextIndex = currentIndex + 1;
        if (nextIndex < inputs.length) inputs[nextIndex].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) inputs[prevIndex].focus();
      }
      if (event.key === "Backspace") {
        const prevIndex = currentIndex - 1;
        inputs[currentIndex].value = "";
        if (!inputs[prevIndex].disabled) inputs[prevIndex].value = "";
        inputs[prevIndex].focus();
      }
      if (event.key === "Enter") {
        guessButton.click();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuessess);

function handleGuessess() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`,
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === actualLetter) {
      // Letter Is Correct And In Place
      inputField.classList.add("yes-in-place");
      inputField.disabled = true;
    } else if (wordToGuess.includes(letter) && letter !== "") {
      // Letter Is Correct But Not In Place
      inputField.classList.add("not-in-place");
      inputField.disabled = true;
      successGuess = false;
    } else {
      // Letter Not Correct
      inputField.classList.add("no");
      inputField.disabled = true;
      successGuess = false;
    }
  }

  // Check If User Win Or Lose
  if (successGuess) {
    messageArea.innerHTML = `You Win, The Word Is <span>${wordToGuess}</span> `;
    if (numberOfHints === 2) {
      messageArea.innerHTML += `<p>Congratz You Didn't Use Hints</p>`;
    }
    // Disable Guess Button
    guessButton.disabled = true;
    hintsButton.disabled = true;
  } else {
    if (currentTry < numberOfTries) {
      currentTry++;
      const nextTry = document.querySelector(`.try-${currentTry}`);
      const nextTryFields = nextTry.childNodes;
      nextTry.classList.remove("disabled-inputs");
      nextTryFields.forEach((input) => (input.disabled = false));
      nextTryFields[1].focus();
    } else {
      messageArea.innerHTML = `You Lose, The Word Is <span>${wordToGuess}</span>`;
      // Disable Guess Button
      guessButton.disabled = true;
      hintsButton.disabled = true;
    }
  }
}

// Handle Hints Logic
const hintsButton = document.querySelector(".hint");
let hintsNumber = document.querySelector(".hint span");
hintsNumber.innerHTML = numberOfHints;

hintsButton.addEventListener("click", getHint);

function getHint() {
  if (numberOfHints > 0) {
    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    const emptyEnabledInputs = Array.from(enabledInputs).filter(
      (input) => input.value === "",
    );
    if (emptyEnabledInputs.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
      const randomInput = emptyEnabledInputs[randomIndex];
      const actuaRandomlIndex = Array.from(enabledInputs).indexOf(randomInput);
      randomInput.value = wordToGuess[actuaRandomlIndex].toUpperCase();
      numberOfHints--;
      hintsNumber.innerHTML = numberOfHints;
    }
  }
  if (numberOfHints === 0) {
    hintsButton.disabled = true;
  }
}

// Handle Regenerate Button
const regenerateButton = document.querySelector(".regenerate");
regenerateButton.addEventListener("click", function () {
  window.location.reload();
});

window.onload = function () {
  generateInputs();
};
