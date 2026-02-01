const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const feedback = document.getElementById("feedback");
const attemptsText = document.getElementById("attempts");
const bestScoreText = document.getElementById("bestScore");
const difficultySelect = document.getElementById("difficulty");

let secretNumber;
let attempts;
let maxRange;

// Initialize game
startGame();

// Events
submitBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", startGame);

// Enter key support
guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkGuess();
    }
});

function startGame() {
    maxRange = Number(difficultySelect.value);
    secretNumber = Math.floor(Math.random() * (maxRange + 1));
    attempts = 0;

    feedback.textContent = `Guess a number between 0 and ${maxRange}`;
    attemptsText.textContent = "";
    guessInput.value = "";
    submitBtn.disabled = false;

    showBestScore();
}

function checkGuess() {
    const guess = Number(guessInput.value);

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
        feedback.textContent = "📉 Too low";
    } else {
        feedback.textContent = "📈 Too high";
    }

    attemptsText.textContent = `Attempts: ${attempts}`;
    guessInput.value = "";
    guessInput.focus();
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
