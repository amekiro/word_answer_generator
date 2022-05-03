let words = require("random-words");

const genDict = (words, exclude="") => { exclude = exclude.split("");

    let dict = words.filter(word => word.length == 5).filter(word => {
        for (let letter = 0; letter < 5; letter++) {
            if (exclude.indexOf(word[letter]) > -1) {
                return false;
            }
        }

        return true;
    })

    return dict;
}

const known = (dict, letters) => {
    dict = dict.filter(word => {
        let confirm = true;
        for (let space = 0; space < 5; space++) {
            if (letters[space] && word[space] != letters[space]) {
                confirm = false;
            }
        }
        return confirm;
    });

    return dict
}

const unknown = (dict, include) => {
    include = include.split("");

    dict = dict.filter(word => {
        let addWord = true

        for (let letter = 0; letter < include.length; letter++) {
            if (word.indexOf(include[letter]) == -1) {
                addWord = false;
                break;
            }
        }
        return addWord;
    })

    return dict;
}

const exclude = (dict, letters) => {
    dict = dict.filter(word => {
        for (let space = 0; space < 5; space ++) {
            let letterSet = letters[space].split("");
            if (letterSet.indexOf(word[space]) > -1) {
                return false;
            }
        }

        return true;
    })

    return dict;
}

let dict = genDict([...words.wordList, "olive", "inert", "askew", "zesty", "trash"], "udiowtench"); // Set initial dictionary and enter letters not in the final word
dict = known(dict, [, "a", , , ]); // Filter dictionary for words with known placement for certain letters
dict = unknown(dict, "r"); // Filter dictionary for words that have the listed letters
dict = exclude(dict, ["r", "", "", "", "r"]); // Filter dictionary to exclude words with letters in ruled out placements

console.log(dict);