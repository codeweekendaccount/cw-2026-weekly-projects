
function generateSesret() {
    return Math.floor(Math.random() * 100) + 1;
}

function startGame() {
    let secretNumber = generateSesret()

    console.log(secretNumber)

    let attemps = 5;

    let userGuess;

    while (attemps > 0) {
        userGuess = Number(prompt("Guess the number"))

        if (isNaN(userGuess)) {
            alert("Invalid input");
            continue;
        }

        if (userGuess < secretNumber) {
            alert("Very low")
        } else if (userGuess > secretNumber) {
            alert("Very high")
        } else {
            alert("Congratulations, You were right")
            break;
        }

        attemps -= 1;
    }

}

startGame()