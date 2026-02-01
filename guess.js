const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const hintBtn = document.getElementById("hintBtn");
const feedback = document.getElementById("feedback");
const attemptsText = document.getElementById("attempts");
const bestScoreText = document.getElementById("bestScore");
const difficultySelect = document.getElementById("difficulty");
const hintBox = document.getElementById("hintBox");
const customRangeBox = document.getElementById("customRange");
const minLimitInput = document.getElementById("minLimit");
const maxLimitInput = document.getElementById("maxLimit");

let secretNumber;
let attempts;
let minRange = 0;
let maxRange = 100;
let hintHistory = [];
let hintsVisible = false;

startGame();

/* EVENTS */
submitBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", startGame);
difficultySelect.addEventListener("change", handleDifficultyChange);
hintBtn.addEventListener("click", toggleHints);

guessInput.addEventListener("input", () => {
    submitBtn.disabled = guessInput.value.trim() === "";
});

guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !submitBtn.disabled) checkGuess();
});

/* DIFFICULTY HANDLER */
function handleDifficultyChange() {
    if (difficultySelect.value === "custom") {
        customRangeBox.style.display = "block";
        feedback.textContent = "Set custom limits and restart.";
        submitBtn.disabled = true;
    } else {
        customRangeBox.style.display = "none";
        startGame();
    }
}

/* GAME INIT */
function startGame() {
    attempts = 0;
    hintHistory = [];
    hintsVisible = false;
    hintBox.textContent = "";
    hintBtn.textContent = "Show Hints";
    guessInput.value = "";
    submitBtn.disabled = true;

    if (difficultySelect.value === "custom") {
        minRange = Number(minLimitInput.value);
        maxRange = Number(maxLimitInput.value);

        if (
            Number.isNaN(minRange) ||
            Number.isNaN(maxRange) ||
            minRange >= maxRange
        ) {
            feedback.textContent = "❌ Invalid custom range.";
            return;
        }
    } else {
        minRange = 0;
        maxRange = Number(difficultySelect.value);
    }

    secretNumber =
        Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

    feedback.textContent = `Guess a number between ${minRange} and ${maxRange}`;
    attemptsText.textContent = "";

    showBestScore();
}

/* GAME LOGIC */
function checkGuess() {
    const raw = guessInput.value.trim();
    if (raw === "") return;

    const guess = Number(raw);
    if (Number.isNaN(guess) || guess < minRange || guess > maxRange) {
        feedback.textContent = `❌ Enter a number between ${minRange} and ${maxRange}`;
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        feedback.textContent = "🎉 Correct! You won!";
        submitBtn.disabled = true;
        saveBestScore();
        return;
    }

    const hint =
        guess < secretNumber
            ? `📉 ${guess} is too low`
            : `📈 ${guess} is too high`;

    feedback.textContent = hint;
    hintHistory.push(hint);

    attemptsText.textContent = `Attempts: ${attempts}`;
    guessInput.value = "";
    submitBtn.disabled = true;
}

/* HINT TOGGLE */
function toggleHints() {
    if (!hintsVisible) {
        hintBox.innerHTML =
            hintHistory.length === 0
                ? "No hints yet."
                : "<strong>Hints:</strong><br>" +
                  hintHistory.map((h, i) => `${i + 1}. ${h}`).join("<br>");
        hintBtn.textContent = "Hide Hints";
        hintsVisible = true;
    } else {
        hintBox.textContent = "";
        hintBtn.textContent = "Show Hints";
        hintsVisible = false;
    }
}

/* BEST SCORE */
function saveBestScore() {
    const key = `best_${minRange}_${maxRange}`;
    const best = localStorage.getItem(key);

    if (!best || attempts < best) {
        localStorage.setItem(key, attempts);
    }
    showBestScore();
}

function showBestScore() {
    const key = `best_${minRange}_${maxRange}`;
    const best = localStorage.getItem(key);

    bestScoreText.textContent = best
        ? `Best score (${minRange}–${maxRange}): ${best}`
        : `Best score (${minRange}–${maxRange}): None`;
}
