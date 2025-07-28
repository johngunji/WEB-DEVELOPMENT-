let a = Math.floor(Math.random() * 101); // random number 0-100
let guessCount = 0;
let min = 0, max = 100;

document.getElementById("submitBtn").addEventListener("click", function() {
    let b = document.getElementById("guessinput");
    let guess = Number(b.value);
    guessCount++;

    if (guess === a) {
        document.getElementById("para").textContent = "🎉 Congrats! You guessed it right.";
    } else if (guess > a && guess <= max && guess >= min) {
        max = guess;
        document.getElementById("para").textContent = `Too high! Guess between ${min} and ${max}`;
    } else if (guess < a && guess >= min && guess < max) {
        min = guess;
        document.getElementById("para").textContent = `Too low! Guess between ${min} and ${max}`;
    } else {
        document.getElementById("para").textContent = `⛔ Invalid guess. Enter a number between ${min} and ${max}`;
    }

    document.getElementById("result").textContent = `Attempts: ${guessCount}`;
    b.value = ""; // clear input
});
