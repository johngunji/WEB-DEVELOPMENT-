const submitBtn = document.getElementById("submitBtn");
const guessInput = document.getElementById("guessInput");
const feedback = document.getElementById("feedback");
const attemptsText = document.getElementById("attempts");

const secretNumber = Math.floor(Math.random() * 101);
let attempts = 0;

submitBtn.addEventListener("click", () => {
    const guess = Number(guessInput.value);

    if (Number.isNaN(guess) || guess < 0 || guess > 100) {
        feedback.textContent = "❌ Enter a valid number between 0 and 100.";
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        feedback.textContent = "🎉 Correct! You guessed the number!";
        attemptsText.textContent = `Attempts: ${attempts}`;
        submitBtn.disabled = true;
    } else if (guess < secretNumber) {
        feedback.textContent = "📉 Too low. Try again.";
    } else {
        feedback.textContent = "📈 Too high. Try again.";
    }

    attemptsText.textContent = `Attempts: ${attempts}`;
    guessInput.value = "";
    guessInput.focus();
});
