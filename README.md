# 🎯 Number Guessing Game (JavaScript)

A feature-rich Number Guessing Game built using **HTML, CSS, and Vanilla JavaScript**, deployed as a static site on Render.

This project goes beyond a basic guessing game by implementing **state management, input validation, custom difficulty settings, hint history, and persistent best scores**.

🔗 **Live Demo:** https://guesssssssing-game.onrender.com  
📦 **Tech Stack:** HTML • CSS • JavaScript • Render

---

## 🚀 Features

### Difficulty Modes
- **Easy:** 0 – 100  
- **Medium:** 0 – 500  
- **Hard:** 0 – 1000  
- **Custom Mode:** User-defined min and max range

### Game Mechanics
- Random number generation with correct range handling
- Attempts counter
- Input validation (empty, out-of-range, invalid values blocked)
- Submit button enabled only when input is valid

### Hint System
- Generates hints (`Too Low / Too High`) based on guesses
- Hint history stored per game
- Toggle button to **Show / Hide Hints**
- Hints reset on restart or difficulty change

### Persistence
- Best score stored using `localStorage`
- Separate best scores per difficulty and custom range

### UX & Accessibility
- Keyboard (Enter key) support
- Restart game functionality
- Responsive, clean UI
- Clear feedback messages

---

## 🛠️ Project Structure
├── index.html
├── style.css
└── guess.js


---

## 🧠 What I Learned

- Managing UI state vs application state
- Correct use of `Math.random()` with dynamic ranges
- Handling edge cases in user input
- DOM manipulation and event-driven programming
- Persisting data using `localStorage`
- Debugging logical bugs that appear “random”

---

## 📌 Possible Improvements

- Difficulty-based attempt limits
- Animated hint expansion
- Game statistics dashboard
- Modular JavaScript architecture

---

## 👤 Author

Built by John Gunji
B.Tech CSE Student  
Learning by building real projects.

