const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const hintBtn = document.getElementById("hintBtn");
const feedback = document.getElementById("feedback");
const attemptsText = document.getElementById("attempts");
const bestScoreText = document.getElementById("bestScore");
const difficultySelect = document.getElementById("difficulty");
const hintBox = document.getElementById("hintBox");

let secretNumber;
let attempts;
let maxRange;
let hintHistory = [];

// Initialize
startGame();

// Events
submitBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", startGame);
difficultySelect.addEventListener("change", startGame);
hintBtn.addEventListener("click", showHints);

// Enable submit only if input has value
guessInput.addEventListener("input", () => {
    submitBtn.disabled = guessInput.value.trim() === "";
});

// Enter key support
guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !submitBtn.disabled) {
        checkGuess();
    }
});

function startGame() {
    maxRange = Number(difficultySelect.value);
    secretNumber = Math.floor(Math.random() * (maxRange + 1));
    attempts = 0;
    hintHistory = [];

    feedback.textContent = `Guess a number between 0 and ${maxRange}`;
    attemptsText.textContent = "";
    bestScoreText.textContent = "";
    hintBox.textContent = "";
    guessInput.value = "";
    submitBtn.disabled = true;

    showBestScore();
}

function checkGuess() {
    const rawValue = guessInput.value.trim();

    if (rawValue === "") {
        feedback.textContent = "❌ Please enter a number first.";
        return;
    }

    const guess = Number(rawValue);

    if (Number.isNaN(guess) || guess < 0 || guess > maxRange) {
        feedback.textContent = `❌ Enter a valid number (0–${maxRange})`;
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        feedback.textContent = "🎉 Correct! You won!";
        submitBtn.disabled = true;
        saveBestScore();
    } else if (guess < secretNumber) {
        const hint = `📉 ${guess} is too low`;
        feedback.textContent = hint;
        hintHistory.push(hint);
    } else {
        const hint = `📈 ${guess} is too high`;
        feedback.textContent = hint;
        hintHistory.push(hint);
    }

    attemptsText.textContent = `Attempts: ${attempts}`;
    guessInput.value = "";
    submitBtn.disabled = true;
    guessInput.focus();
}

function showHints() {
    if (hintHistory.length === 0) {
        hintBox.textContent = "No hints yet.";
        return;
    }

    hintBox.innerHTML =
        "<strong>Hints:</strong><br>" +
        hintHistory.map((h, i) => `${i + 1}. ${h}`).join("<br>");
}

function saveBestScore() {
    const key = `bestScore_${maxRange}`;
    const best = localStorage.getItem(key);

    if (!best || attempts < best) {
        localStorage.setItem(key, attempts);
    }

    showBestScore();
}

function showBestScore() {
    const key = `bestScore_${maxRange}`;
    const best = localStorage.getItem(key);

    bestScoreText.textContent = best
        ? `Best score (${maxRange}): ${best} attempts`
        : `Best score (${maxRange}): None yet`;
}
