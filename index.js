var outputText = document.getElementById('outputText');
var inputText = document.getElementById('inputText');
var howManyChance = document.getElementById('howManyChance');
var changeNames = document.getElementById('changeNames');



var wordLists = [nouns, adjectives, verbs]; // not including names. we treat those differently


function changeWords(){
    try{

        var story = inputText.value || "Hello, Nick and Sarah. We will test wether this story is good for our program to change into another funny and more silly and goofy story using the word lists that we have pulled from the internet. OK here we go. We will try it! Hope it works out well.";
    
        storyArray = story.split(" ");
        for (let i = 0; i < storyArray.length; i++) {
            var word = storyArray[i];
            var punctuation = '';
            var replaced = false; // did we replace this word?

            // get the word without any punctuation or anything
            var lastCharInWord = word[ word.length-1 ]
            if (lastCharInWord == '.' || lastCharInWord == "," || word[ word.length-1 ] == "!" || lastCharInWord == '?'){
                punctuation = word.substr(word.length-1, word.length);
            }



            var wordWithoutPunctuation = /[a-z]+/i.exec(word)[0];
            var lowercased = wordWithoutPunctuation.toLowerCase();

            // do a name check
            if (changeNames.checked){
                for (let j = 0; j < names.length; j++) {
                    const name = names[j];
                    if ( lowercased == name.toLowerCase() ){
                        storyArray[i] = "<span style='color: green'>"+randy("name")+"</span>";
                        replaced = true;
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
                        replaced = true;
                    }

                }
            }

            // add back any punctuation
            if (replaced){
                storyArray[i] += punctuation;
            }
        }
        var changedStory = storyArray.join(" ")

        outputText.innerHTML = "<p>"+story +
        "</p>#############################################################<p>"
        +changedStory+"</p>";

        if ('speechSynthesis' in window) {
            
            outputText.innerHTML +=
            "Rate: <input id='rate' value='1'/> from 0.1 to 10<br/>  "+
            "Pitch: <input id='pitch' value='2'/> from 0 to 2<br/>  "+
            "Volume : <input id='volume' value='1'/> from 0 to 1<br/>  "+
            "<button id='speak'>Speak the story, robot!</button>";
            var msg = new SpeechSynthesisUtterance();
        
            var changedStoryJustWords = changedStory.replace(/<[^>]*>?/gm, '');
            msg.text = changedStoryJustWords;
            msg.lang = 'en';
            document.getElementById('speak').addEventListener('click', function(){
                msg.volume = document.getElementById('volume').value || 1; // From 0 to 1
                msg.rate = document.getElementById('rate').value || 1; // From 0.1 to 10
                msg.pitch = document.getElementById('pitch').value || 2; // From 0 to 2
                speechSynthesis.speak(msg);
            })

           }else{
            outputText.innerHTML += "<span style='color: grey'>Sorry, your browser doesn't support the speech synthesis API !</span>"
           }


        

        
        


    }
    catch (error){
        outputText.innerHTML = "Sorry, I don't like the text you gave us. Try some other text. <p style='color: red'>"+error+"</p>";
    }


}

document.getElementById("changeGo").addEventListener('click', changeWords)








