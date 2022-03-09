// Get list of words and select one at random
const wordData = words;
let randomWord;
let i; 
i = Math.floor(Math.random() * wordData.length);
randomWord = wordData[i];
randomWord = randomWord.toUpperCase();
console.log(randomWord);

const maxAttempts = 5;
let currentAttempts = 0;
let guessedWord = ""; 
let guessArray = ["", "", "", "", ""]; 
let keyIndex = 0;

// Keydown event
document.addEventListener('keydown', (event) => {        
    // Stop entering or deleting outside the array length; 
    if (guessArray.length < 0 || guessArray.length > 5) {
        return; 
    }
    
    // Check if the user is guessing
    if (event.code === "Enter" && guessArray.length === 5) {
        guessedWord = guessArray.join("");
        guessedWord.toUpperCase();

        if (guessedWord === randomWord) {
            Win();
        } else {
            // Reset vars for new attempt
            keyIndex = 0;
            currentAttempts++;
            CheckGuess();
            UpdateRow();
        }
    }

    // Delete letters
    if (event.code === "Backspace") {
        guessArray.splice(keyIndex - 1, 1, "");   
        keyIndex--;
        UpdateText();
    }

    // Stop any key press which arent alphanumerical
    if (event.code.substring(0, 3) !== "Key") {
        return;
    }

    // Insert keypress into word guess array
    // Pop empty to keep 5 length array, update visual text
    guessArray.splice(keyIndex, 0, event.key.toUpperCase());
    guessArray.pop();
    UpdateText();
    keyIndex++;
})

// Get row elements for guess
let rowElem = document.getElementById(currentAttempts.toString()).children; 

function UpdateRow() {
    rowElem = document.getElementById(currentAttempts.toString()).children; 
}

function UpdateText() {
    for (let i = 0; i < rowElem.length; i++) {
        rowElem[i].innerHTML = guessArray[i];
    }
}

function CheckGuess() {
    let randomWordCopy = [...randomWord];

    for (let i = 0; i < guessArray.length; i++) {
        // Check for correct placement
        // If correct, fill letter position with a blank so yellow letters work
        if (guessArray[i] === randomWordCopy[i]) {
            rowElem[i].classList.remove("non-active"); 
            rowElem[i].classList.add("active-correct");
            randomWordCopy[i] = '#';
            continue;
        }
        // Check for correct letter but wrong placement 
        else if (randomWordCopy.includes(guessArray[i]) && guessArray[i] !== randomWordCopy[i]) {
            rowElem[i].classList.remove("non-active"); 
            rowElem[i].classList.add("active-wrongplace");
            continue;
        } 
        // Wrong letter 
        else {
            rowElem[i].classList.remove("non-active"); 
            rowElem[i].classList.add("active-wrong");
        }
    }

    // Reset array for next guess
    guessArray = ["", "", "", "", ""]; 
}

function Win() {
    for (let i = 0; i < guessArray.length; i++) {
        rowElem[i].classList.remove("non-active"); 
        rowElem[i].classList.add("active-correct");
    }
}