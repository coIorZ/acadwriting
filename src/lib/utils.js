var nonSplitList = [];
var aRecord = [];         
//[0] nonSplitWord        (include escape characters for regex)
//[1] cleanNonSplitWord   (no escape characters)        
//[2] replacement         (crazy word not found in dictionary)
//[3] replaceWithMatch
//[4] match
aRecord = [" etc\\.,", " etc.,", "hd4ksutn83nFjq9skJASF5wxFX4DFiBVYtqepicn", false, null];
nonSplitList.push(aRecord);
aRecord = [" e\\.g\\.", " e.g.", "BS8K7gKG53xwaRCjygt87HK8hi876GJgvRDhggIv", false, null];
nonSplitList.push(aRecord);       
aRecord = ["\\(e\\.g\\.", "(e.g.", "dkd983hdi73h328HD83JHssDSFHH87h7Y8I75ddd", false, null];
nonSplitList.push(aRecord);                   
aRecord = [" i\\.e\\.", " i.e.", "tTrTTRGu6GU7LuytOHjy5hf65vJY57vjhght7FJH", false, null];
nonSplitList.push(aRecord);             
aRecord = ["\\(i\\.e\\.", "(i.e.", "dkvckvkvjJFNBYGVIdD8876Bjb876t8yh6TTJVCV", false, null];
nonSplitList.push(aRecord);                         
aRecord = [" et al\\.", " et al.", "CLhd76FjG76DrhgUy7tdftrJ7651325DF6FJNCJk", false, null];    
nonSplitList.push(aRecord); 

var nonSplitRegexList = [];
var replacementList = [];                
nonSplitRegexList.push(/Fig\. \w/g);
nonSplitRegexList.push(/fig\. \w/g);
nonSplitRegexList.push(/\.\.+/g);   
nonSplitRegexList.push(/\.\w/g);   //Previously: //nonSplitRegexList.push("\\.\\w");  WHICH WAS INCORRECT as it only matched the first match
nonSplitRegexList.push(/ \./g); //captures space followed by fullstop, as such a case also cannot be the end of a sentence.    
/*
        All these are not to be treated as end of a sentence?
        //use exact match for the below
        .etc
        e.g.
        i.e.
        et al.            
        
        
        //use regex match for the below
        Fig. 1  //regex with any number after "Fig. " how about alphabet...or combination "Fig. A1"            
                "Fig\\. \w" : find anything that has "Fig. " followed immediately by a alphanumeric character.
        fig. A  "fig\\. \w"
        .....   //one or more fullstops immediately after a fullstop
                "\\.\\.+" : find anything that has at least 2 consequtive fullstops
        .g      //one or more alphabets immediately after fullstop
                "\\.\w" : find anything that has any alphanumeric character immediately after a fullstop
        
        all the 5 cases below can be handles by the "\\.\w"
        p = .00
        .04 -.008 
        3.1                  //bullet numbering
        0.002                //decimal number            
        dx.doi.org           //website URL            
        
        C.W.                 //TRICKY ALSO ! BUT MAY BE HANDLED BY "\\.\w"
        James G. Donald      //names of people - tricky as immediately after fullstop is a space.. appear like a valid sentence!        
    */         

function replace_NonSplitWords_With_Crazy_Words(textContent) {            
  for(var i = 0; i < nonSplitList.length; i++) {                
    textContent = textContent.replace(new RegExp(nonSplitList[i][0], 'g'), nonSplitList[i][2]);                                                
  }            

  return textContent;
}            

function replace_Crazy_Word_With_NonSplitWord(inputSentence) {
  var replacement = "";
  for(var i = 0; i < nonSplitList.length; i++) {
    if(nonSplitList[i][3] == true) {
      replacement = nonSplitList[i][4];
    }
    else {
      replacement = nonSplitList[i][1];
    }
    inputSentence = inputSentence.replace(new RegExp(nonSplitList[i][2], 'g'), replacement);                
  }            

  return inputSentence;            

}

function splitToSentences(str) {
  var finalSentencesArray = [];

  if(!str) return finalSentencesArray;

  str = replace_NonSplitWords_With_Crazy_Words(str);                  

  str = replace_NonSplitRegexWords_With_Crazy_Words(str);

  var result = str.match( /([^.!?]+[.!?]+)|([^.!?]+$)/gi ); 

  /*
                /[^\.!\?]+[\.!\?]+/gi : Does not include the last word if the last word has no punctuation. Example in "Phrase 1. Phrase 2. Phrase 3", Phrase 3 is left out!
                /([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/gi : This one takes care of the above issue. So begin with this.
                */

  var finalSentence = null;

  var tempSentence = null;

  for(var i = 0; i < result.length; i++) {                
    tempSentence = replace_Crazy_Word_With_NonSplitRegexWord(result[i]);
    finalSentence = replace_Crazy_Word_With_NonSplitWord(tempSentence);
    //finalSentencesArray.push(finalSentence.trim()); // trim it then push into array
    finalSentencesArray.push(finalSentence); // Do not trim
    //console.log(i+1 + ': ' + finalSentence);                
  }            

  return finalSentencesArray;
}   

function replace_NonSplitRegexWords_With_Crazy_Words(textContent) {

  var matches = null;
  var oneCrazyWord = null;

  for(var i = 0; i < nonSplitRegexList.length; i++) {                
    matches = null;
    //try to match each element in the list...for every match for that particular element, 
    matches = textContent.match(nonSplitRegexList[i]);
    //console.log('Trying to match: ' + nonSplitRegexList[i]);

    if(matches != null) {
      //console.log("  Match found for " + nonSplitRegexList[i]);
      for(var c = 0; c < matches.length; c++) {
        //console.log("  Match : " + matches[c]);

        //create an entry in the replacement list ([0] the match, [1] the crazyword generated)
        oneCrazyWord = generateCrazyWord();
        replacementList.push(new Array(matches[c], oneCrazyWord));  
        //and at the same time replace (ONLY the first occurrence) in the textContent
        textContent = textContent.replace(matches[c], oneCrazyWord);
      }                    
    }    
    else {
      //console.log("No matches for " + nonSplitRegexList[i]);
    }
  }            
  //return the revised textContent
  return textContent;
}        


function replace_Crazy_Word_With_NonSplitRegexWord(aSentence) {            
  var patt = null;
  for (var i = 0; i < replacementList.length; i++) {

    patt = new RegExp(replacementList[i][1]);                
    if (patt.test(aSentence) == true) {
      aSentence = aSentence.replace(new RegExp(replacementList[i][1], 'g'), replacementList[i][0]);     
    }
  }
  return aSentence;
}

function randomIntFromInterval(min, max)
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}            
 

function generateCrazyWord() {
  var category = 0;  
  var alphanumericCharCode = null;
  var crazyWord = [];

  //Letting the crazy word be 40 characters long. This, along with a meaningless sequence of characters, should ensure its not found in the english dictionary.
  for(var i = 0; i < 40; i++) {              
                
    category = randomIntFromInterval(1, 3); //3 categories to choose from each time i generate a random alphanumeric character
                
    if (category == 1) { 
      // numeric (0-9)
      alphanumericCharCode = randomIntFromInterval(48, 57);
    }
    else {
      if (category == 2) {
        // upper alpha (A-Z)
        alphanumericCharCode = randomIntFromInterval(65, 90);
      }
      else {
        if (category == 3) {
          // lower alpha (a-z)
          alphanumericCharCode = randomIntFromInterval(97, 122);                            
        }
      }
    }
                    
    crazyWord[i] = String.fromCharCode(alphanumericCharCode);                
  }
            
  return crazyWord.join("");           //return the array as a string separated by no characters.
}

export {
  splitToSentences,
};
