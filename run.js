// Set up initial dictionary
let words = require("random-words");
words = words.wordList.filter(word => word.length == 5);
let dict = [...words, "olive", "inert", "askew", "larva", "forgo"];

const prompt = require("prompt-sync")();

console.log("Here is our dictionary! Select a word from the list:");
console.log(dict);
console.log();
console.log("We recommend \"" + dict[Math.floor(Math.random() * dict.length)] + "\" from the list");

let success = false;
let ban = [];
let known = [null, null, null, null, null];
let unknown = [];
let exclude = [[], [], [], [], []];

while (success == false) {
    success = prompt("Was your word (your word or our recommended word) the hidden word (Y/N)? ").toLowerCase() == "y" ? true : false;
    console.log();

    if (success) {
        break;
    }

    // Remove words with unknown letters
    console.log("Let's filter out words with letters not found in the hidden word.");

    let question = "What new letters have been identified as not in the hidden word? ";

    if (ban.length > 0) question += "The following letters have already been identified: " + ban.join("; ") + ". "; 

    let letters = prompt(question).toLowerCase().replace(" and ","").split("").filter(letter => letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122);
    console.log();

    ban = [...ban, ...letters];

    dict = dict.filter(word => {
        for (let letter = 0; letter < 5; letter++) {
            if (letters.indexOf(word[letter]) > -1) {
                return false;
            }
        }

        return true;
    })

    // Remove words missing key letters (known space)
    console.log("Let's filter out words that do not have known letters in a corresponding position.");

    for (let space = 0; space < 5; space++) {
        if (known[space]) {
            // Letter has been identified
            console.log(`You previously indicated that the letter in space ${space + 1} is ${known[space]}.`);
        } else {
            // Letter has not been identified
            let input = prompt(`What letter is found in space ${space + 1}? If this is not known, keep this blank and press enter: `).toLowerCase();

            if (input.length == 1 && input.charCodeAt(0) >= 97 && input.charCodeAt(0) <= 122) known[space] = input;
        }
    }

    dict = dict.filter(word => {
        let confirm = true;
        for (let space = 0; space < 5; space++) {
            if (known[space] && word[space] != known[space]) {
                confirm = false;
            }
        }
        return confirm;
    });

    // Remove words missing key letters (unknown space)
    console.log();
    console.log("There may be some additional letters that the hidden word has, but its position is not known yet. Let's remove the words missing those letters.");

    question = "What new letters have been identified in the hidden word? ";

    let kwu = [...known.filter(space => space != null), ...unknown];
    kwu = kwu.filter((letter, index, kwu) => kwu.indexOf(letter) == index);

    if (known.filter(space => space != null).length > 0 || unknown.length > 0) question += "The following letters have already been identified: " + kwu.join("; ") + ". "; 

    letters = prompt(question).toLowerCase().replace(" and ","").split("").filter(letter => letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122);
    console.log();

    dict = dict.filter(word => {
        let addWord = true

        for (let letter = 0; letter < letters.length; letter++) {
            if (word.indexOf(letters[letter]) == -1) {
                addWord = false;
                break;
            }
        }
        return addWord;
    })

    unknown = [...unknown, ...letters];

    // Remove words where key letter does not exist in the corresponding space
    if (unknown.length > 0) {
        console.log(`You previously indicated that the letters (${unknown.length == 1 ? unknown[0] : unknown.join("; ")}) should be somewhere in the hidden word.`);

        for (let space = 0; space < 5; space++) {
            if (known[space]) {
                console.log(`You have already identified the letter in space ${space + 1} is ${known[space].toUpperCase()}.`);
            } else {
                question = `Of the identified letters above, what new letters should not be in space ${space + 1}? If this is not known, keep this blank and press enter. `;

                if (exclude[space].length > 0) {
                    question += `You previously indicated that these letters should not be in this space: ${exclude[space].join(";")}. `;
                }

                let input = prompt(question).toLowerCase().split("").filter(letter => letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122);

                exclude[space] = [...exclude[space], ...input];
            }
        }

        console.log();
    }

    dict = dict.filter(word => {
        for (let space = 0; space < 5; space ++) {
            if (exclude[space].indexOf(word[space]) > -1) {
                return false;
            }
        }

        return true;
    })


    // Post updated dictionary
    if (dict.length == 0) {
        break;
    }

    console.log("Let's try another word. Here is the updated dictionary:")
    console.log(dict);
    console.log("We recommend \"" + dict[Math.floor(Math.random() * dict.length)] + "\" from the list");
}

if (success) {
    console.log("Congratulations on completing Wordle! This generator will now end.");
} else if (dict.length == 0) {
    console.log("Unfortunately my dictionary does not have the hidden word. You're on your own now. Good luck!");
}