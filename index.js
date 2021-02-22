var outputText = document.getElementById('outputText');
var inputText = document.getElementById('inputText');
var howManyChance = document.getElementById('howManyChance');
var changeNames = document.getElementById('changeNames');



var wordLists = [nouns, adjectives, verbs]; // not including names. we treat those differently


function changeWords(){

    var story = inputText.value || "Hello, Nick and Sarah. We will test wether this story is good for our program to change into another funny and more silly and goofy story using the word lists that we have pulled from the internet. OK here we go. We will try it! Hope it works out well."

 
    storyArray = story.split(" ");
    for (let i = 0; i < storyArray.length; i++) {
        const word = storyArray[i];
        // get the word without any punctuation or anything
        var wordWithoutPunctuation = /[a-z]+/i.exec(word)[0];
        var lowercased = wordWithoutPunctuation.toLowerCase();

        // do a name check
        if (changeNames.checked){
            for (let j = 0; j < names.length; j++) {
                const name = names[j];
                if ( lowercased == name.toLowerCase() ){
                    storyArray[i] = "<span style='color: green'>"+randy("name")+"</span>";
                }
            }    
        }
        

        // check for matches in the non-name word lists
        for (let j = 0; j < wordLists.length; j++) {
            const wordlist = wordLists[j];
            for (let k = 0; k < wordlist.length; k++) {
                const wordFromList = wordlist[k];

                // Does this word exist in this wordlist? 
                if ( lowercased == wordFromList && Math.random() < howManyChance.value ){ 
                    // DO: save the punctuation and capitalization to add it to the new word

                    // if it does, we can switch it with another random word from the same list
                    storyArray[i] = "<span style='color: red'>"+randy(wordlist)+"</span>";

                }

            }
        }
    }

    outputText.innerHTML = "<p>"+story +
    "</p>#############################################################<p>"
    +storyArray.join(" ")+"</p>";
}

document.getElementById("changeGo").addEventListener('click', changeWords)




