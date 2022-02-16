
// Get keyboard input
// Display input to current 5 letters
// Check guess 
// Colour/animation of guess
// Wrong or right guess after 6 attempts

document.addEventListener('keydown', (event) => {    
    // Check if the user is guessing
    if (event.code === "Enter" && guessArray.length === 5) {
        guessedWord = guessArray.join("");
        guessedWord.toLowerCase();
        console.log(guessedWord); 

        if (guessedWord === randomWord) {
            console.log("You win");
        } else {
            console.log("Nope");
        }
    }

    if (event.code === "Backspace") {
        guessArray.splice(keyIndex - 1, 1, "");   
        keyIndex--;
        updateText();
    }

    // Stop any key press which arent alphanumerical
    if (event.code.substring(0, 3) !== "Key") {
        return;
    }

    // Insert keypress into word guess array
    guessArray.splice(keyIndex, keyIndex - 1, event.key);
    updateText();
    keyIndex++;
})

// Get list of words and select one at random
const wordData = words;
let randomWord;
let i; 
i = Math.floor(Math.random() * wordData.length);
randomWord = wordData[i];
randomWord = randomWord.toLowerCase();
console.log(randomWord);

const maxAttempts = 6;
let currentAttempts = 0;
let guessedWord = ""; 
let guessArray = ["", "", "", "", ""]; 
let keyIndex = 0;

const rowElem = document.getElementById("1").children; 

function updateText () {
    for (let i = 0; i < rowElem.length; i++) {
        rowElem[i].innerHTML = guessArray[i];
    }
}

