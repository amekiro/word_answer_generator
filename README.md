# WORDLE ANSWER GENERATOR README

## Scope of project
The files in this repository were created to generate possible words that fit the criteria of the hiddle word in Wordle based on letters that are allowed and not allowed. generator.js was the first iteration of the project, but required too many updates from the user. run.js was later created to always start a new iteration of the word generator.

## How to run the JavaScript code
1. Node.js and a command line application such as GitBash is required to run the code.
2. Once the directory containing this README and run.js is selected, run "$node run.js" in the command line.
3. Upon running the command, a dictionary with 5 letter words is generated, and a random word from the dictionary is recommended as your first Wordle guess. The command line will ask if the word you chose is the hidden word.

    - If the chosen word is the hidden word, the command will end the generator.
    - If the chosen word is **not** the hidden word, the command will repeat the following steps until either the hidden word is found or the dictionary runs out of words

        1. Ask for new letters that are not found in the hidden word (gray letters)
        2. Ask for the specific letter found in each space, if known (green letters)
        3. Ask for letters found in the hidden word, but positioning as not been determined yet (yellow)

            - If a new letter has been identified, the command will also ask for letters that around not found in each space

        4. Filter the dictionary to meet the above criteria and generate an updated dictionary. A new word is recommended for the next step, and the command will ask if the new word is the hidden word.