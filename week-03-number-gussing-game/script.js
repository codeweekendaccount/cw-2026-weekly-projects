// This function generates the secret number (between 1 and 100).
function generateSecret() {
    return Math.floor(Math.random() * 100) + 1;
}

// This function is responsible for getting input from the user, 
function getUserGuess(attemptsLeft) {
    const input = prompt(
        `Guess the number (1-100)\nAttempts left: ${attemptsLeft}`
    );

    // Convert the input (which is always a string) into a number
    return Number(input);
}

function evaluateGuess(guess, secret) {
    if (guess > secret) return "high";
    if (guess < secret) return "low";
    return "correct";
}


function startGame() {
    const secret = generateSecret();

    // For development/debugging only, in a real game we wouldn't reveal this to users
    console.log("The secret is " + secret + ", keep it secret");

    // Number of times user can guess to find the secret
    let attempts = 5;

    while (attempts > 0) {

        const guess = getUserGuess(attempts);

        // Validating the input from user, 
        if (isNaN(guess)) {
            alert("Please enter a valid number");

            // skip current round if the the input was not a number
            continue;
        }

        const result = evaluateGuess(guess, secret);

        if (result === "correct") {
            alert(`Correct! The number was ${secret}`);

            // If the guess was correct, we end the game immediately
            // we stop the function here so nothing else runs after winning
            return;
        }

        alert(result === "low" ? "Too Low" : "Too High");

        attempts--;
    }

    // If the loop ends, it means the user ran out of attempts
    alert(`Game Over! The secret number was ${secret}`);
}


startGame();