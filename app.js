// Get list of words and select one at random
const wordData = words;
let randomWord;
let i = Math.floor(Math.random() * wordData.length);
randomWord = wordData[i];
randomWord = randomWord.toUpperCase();
console.log(randomWord);

const maxAttempts = 5;
let currentAttempts = 0;
let guessedWord = ""; 
let guessArray = [];
let keyIndex = 0;

// Keydown event
document.addEventListener('keydown', (event) => {     
    event.preventDefault();
    Input(event.code);   
});

// Keyboard functions 
const topKeyContainer = document.querySelector("#keyboard__container > #top"); 
const midKeyContainer = document.querySelector("#keyboard__container > #middle"); 
const botKeyContainer = document.querySelector("#keyboard__container > #bottom"); 

let topChildrenKey = topKeyContainer.querySelectorAll(":scope > .key");
topChildrenKey.forEach(item => { 
    item.addEventListener("click", function(event) {
        Input(item.id);
    }); 
});

let midChildrenKey = midKeyContainer.querySelectorAll(":scope > .key");
midChildrenKey.forEach(item => {
    item.addEventListener("click", (event) => {
        event.preventDefault();
        Input(item.id);
    }); 
});

let botChildrenKey = botKeyContainer.querySelectorAll(":scope > .key");
botChildrenKey.forEach(item => { 
    item.addEventListener("click", (event) => {
        event.preventDefault();
        Input(item.id);
    }); 
});

// Handle keyboard input
function Input(event) {
    // Stop entering or deleting outside the array length; 
    if (guessArray.length < 0 || guessArray.length > 5) {
        console.log("return here?");
        return; 
    }
    
    // Check if the user is guessing
    if (event === "Enter" && guessArray.length === 5) {
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
    if (event === "Backspace" ) { 
        guessArray.pop(); 
        keyIndex--;
        UpdateText();
    }

    // Stop any key press which arent alphanumerical
    if (event.substring(0, 3) !== "Key") {
        return;
    }

    // Insert keypress into word guess array
    // Pop empty to keep 5 length array, update visual text
    event = event.substring(3);
    event.toUpperCase();
    guessArray.push(event);
    UpdateText();
    keyIndex++;
}

// Get row elements for guess
let rowElem = document.getElementById(currentAttempts.toString()).children; 

// Change row after guess
function UpdateRow() {
    rowElem = document.getElementById(currentAttempts.toString()).children;
}

// Update inner text of row 
function UpdateText() {
   
    for (let i = 0; i < rowElem.length; i++) {
        if (guessArray[i] === undefined || guessArray[i] === "") {
            rowElem[i].childNodes[0].innerHTML = "";
        } else {
            rowElem[i].childNodes[0].innerHTML = guessArray[i]; 
        }
    }
}

function CheckGuess() {
    let randomWordCopy = [...randomWord];

    for (let i = 0; i < guessArray.length; i++) {
        // Check for correct placement
        if (guessArray[i] === randomWordCopy[i]) {
            rowElem[i].classList.remove("non-active"); 
            rowElem[i].classList.add("active-correct");
            // Update keyboard colour
            document.getElementById("Key" + guessArray[i]).classList.add("correct");

            // If correct, fill letter position with a blank so yellow letters work
            randomWordCopy[i] = '#';
            continue;
        }
        // Check for correct letter but wrong placement 
        else if (randomWordCopy.includes(guessArray[i]) && guessArray[i] !== randomWordCopy[i]) {
            rowElem[i].classList.remove("non-active"); 
            rowElem[i].classList.add("active-wrongplace");
            // Update keyboard colour
            document.getElementById("Key" + guessArray[i]).classList.add("wrong-place");
            
            // Check for multiple letters within array and enter blanks if there is
            var temp = randomWordCopy.indexOf(guessArray[i]); 
            randomWordCopy[temp] = '#';
            continue;
        } 
        // Wrong letter 
        else {
            rowElem[i].classList.remove("non-active"); 
            rowElem[i].classList.add("active-wrong");
            // Update keyboard colour
            document.getElementById("Key" + guessArray[i]).classList.add("wrong");
        }
    }

    // Check letters

    // Reset array for next guess 
    guessArray = [];
}

function Win() {
    for (let i = 0; i < guessArray.length; i++) {
        rowElem[i].classList.remove("non-active"); 
        rowElem[i].classList.add("active-correct");
    }

    let temp = document.querySelector(".win_screen");
    temp.classList.add("active");
}