import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

const databaseAB = {
  ...americanOnly,
  ...britishOnly,
  ...americanToBritishSpelling
}

const aTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/ //(\,|\.|\?|\!)?
const bTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]).[0-5][0-9]$/ //(\,|\.|\?|\!)?
let keyFound;
let valueFound;
let startIndex;
let endIndex;
let rawTranslation;
let finalTranslation;

const textInput = document.getElementById("text-input");
const localeSelect = document.getElementById("locale-select");//american-to-british || british-to-american//
const translatedSentence = document.getElementById("translated-sentence")
const errorMsg = document.getElementById("error-msg");

//GENERAL FUNCTIONS//
function handleError(){
  translatedSentence.innerHTML ="";
  return errorMsg.innerHTML = "Error: No text to translate."
}
function handleNoMatch(){
  return translatedSentence.innerHTML = "Everything looks good to me!";
}
function handleClear(){
  keyFound, valueFound, startIndex, endIndex, rawTranslation, finalTranslation ='';
  textInput.value = '';
  translatedSentence.innerHTML = '';
  errorMsg.innerHTML = '';
}
function capitalizeFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// END GENERAL FUNCTIONS//

//A-TO-B TRANSLATION FUNCTIONS//
function timeAToB(string){
  let strArr = string.split(" ");
  let timeArr;
  for (let i = 0; i < strArr.length; i++){
    if (aTimeRegex.test(strArr[i])){
      let colInd= strArr[i].indexOf(":");
      timeArr = strArr[i].split("");
      timeArr.splice(colInd, 1, ".");
      // strArr[i] =  '<span class="highlight">' + timeArr.join("") + '</span>';
      strArr[i] = timeArr.join("");
      rawTranslation = strArr.join(" ");
      strArr[i] =  '<span class="highlight">' + timeArr.join("") + '</span>';
      finalTranslation = strArr.join(" ");
      console.log([rawTranslation, finalTranslation])
      return [rawTranslation, finalTranslation];    }    
  }
}
function stringAToB(string){
 let queryKeys = Object.keys(databaseAB); // in A->B, we need to match Key
 for (let i = 0; i < queryKeys.length; i++){
    if (string.indexOf(queryKeys[i]) !== -1){
      keyFound = queryKeys[i];
      valueFound = databaseAB[keyFound];
      startIndex = string.indexOf(keyFound);
      endIndex = startIndex + keyFound.length
      rawTranslation =  string.replace(keyFound, valueFound)
      valueFound = '<span class="highlight">' + databaseAB[keyFound] + '</span>';
      finalTranslation = string.replace(keyFound, valueFound);
      console.log([rawTranslation, finalTranslation])
      return [rawTranslation, finalTranslation];
    }    
  }
}
function titleAToB(string){
  let lowercase = string.toLowerCase(); 
  let queryKeys = Object.keys(americanToBritishTitles); 
  for (let i = 0; i < queryKeys.length; i++){
     if (lowercase.indexOf(queryKeys[i]) !== -1){
       keyFound = queryKeys[i];
       startIndex = lowercase.indexOf(keyFound);
       endIndex = startIndex + keyFound.length;
       valueFound = capitalizeFirstLetter(americanToBritishTitles[keyFound])
       rawTranslation = string.replace(capitalizeFirstLetter(keyFound), valueFound)
       valueFound = '<span class="highlight">' + valueFound + '</span>';
       finalTranslation = string.replace(capitalizeFirstLetter(keyFound), valueFound);
       console.log([rawTranslation, finalTranslation])
       return [rawTranslation, finalTranslation];
     }    
   }
}
function translateAToB(string){ 
 timeAToB(string);
 if(finalTranslation !== ""){
  return translatedSentence.innerHTML = finalTranslation;
 }
 stringAToB(string);
 if(finalTranslation !== ""){
    return translatedSentence.innerHTML = finalTranslation;
 }
 titleAToB(string);
 if(finalTranslation !== ''){
  return translatedSentence.innerHTML = finalTranslation;
 }
 handleNoMatch();
}
//END A-TO-B TRANSLATION FUNCTIONS//

//B-TO-A TRANSLATION FUNCTIONS//
function timeBToA(string){
  let strArr = string.split(" ");
  let timeArr;
  for (let i = 0; i < strArr.length; i++){
    if (bTimeRegex.test(strArr[i])){
      let perInd= strArr[i].indexOf(".");
      let timeArr = strArr[i].split("");
      timeArr.splice(perInd, 1, ":");
      strArr[i] = timeArr.join("");
      rawTranslation = strArr.join(" ");
      strArr[i] = '<span class="highlight">' + timeArr.join("") + '</span>';
      finalTranslation = strArr.join(" ");
      console.log([rawTranslation, finalTranslation])
      return [rawTranslation, finalTranslation];
    }    
  }
}
function getKeyByValue(object, value){
  return Object.keys(object).find(key => object[key] === value);
}
function stringBToA(string){
  let queryValues = Object.values(databaseAB); // in B->A, we need to match value

 for (let i = 0; i < queryValues.length; i++){
    if (string.indexOf(queryValues[i]) !== -1){
      valueFound = queryValues[i];
      startIndex = string.indexOf(valueFound);
      endIndex = startIndex + valueFound.length;
      keyFound = getKeyByValue(databaseAB, valueFound);
      rawTranslation = string.replace(valueFound, keyFound)
      keyFound = '<span class="highlight">' + keyFound + '</span>';
      finalTranslation = string.replace(valueFound, keyFound);
      console.log([rawTranslation, finalTranslation])
      return [rawTranslation, finalTranslation];
    }    
  }
}
function titleBToA(string){
  let lowercase = string.toLowerCase(); //keys:values are all lowercase
  let queryValues = Object.values(americanToBritishTitles); // in B->A, we need to match value

  for (let i = 0; i < queryValues.length; i++){
    if (lowercase.indexOf(queryValues[i]) !== -1){
      valueFound = queryValues[i];
      startIndex = string.indexOf(capitalizeFirstLetter(valueFound));
      endIndex = startIndex + valueFound.length;
      keyFound = capitalizeFirstLetter(getKeyByValue(americanToBritishTitles, valueFound));
      rawTranslation = string.replace(capitalizeFirstLetter(valueFound), keyFound);
      keyFound = '<span class="highlight">' + keyFound + '</span>';
      finalTranslation = string.replace(capitalizeFirstLetter(valueFound), keyFound);
      console.log([rawTranslation, finalTranslation])
      return [rawTranslation, finalTranslation];
    }    
  }
}
function translateBToA(string){
 timeBToA(string);
 if(finalTranslation !== ''){
   return translatedSentence.innerHTML = finalTranslation;
 }
 stringBToA(string)
 if(finalTranslation !== ''){
  return translatedSentence.innerHTML = finalTranslation;
 }
 titleBToA(string)
 if(finalTranslation !== ''){
  return translatedSentence.innerHTML = finalTranslation;
 }
 handleNoMatch(); 
}
//END B-TO-A TRANSLATION FUNCTIONS//


//ULTIMATE TRANSLATOR FUNCTION//
function handleTranslate(string){
  if (string == ''){
    return handleError();
  }
  keyFound,valueFound,startIndex,endIndex,rawTranslation, finalTranslation = '';
  if(localeSelect.value == "american-to-british"){
    translateAToB(string);
  }
  if(localeSelect.value == "british-to-american"){
    translateBToA(string);
  }
}
//END ULTIMATE TRANSLATOR FUNCTION//

//EVENT LISTENERS//
document.addEventListener("click", function(event){
  if(event.target.matches("#clear-btn")){
    handleClear()
  }
  if(event.target.matches("#translate-btn")){
    handleTranslate(textInput.value);
  } 
})
//END EVENT LISTENERS//

try {
  module.exports = {
    handleError,
    handleNoMatch,
    handleClear,
    capitalizeFirstLetter,
    timeAToB,
    stringAToB,
    titleAToB,
    translateAToB,
    timeBToA,
    getKeyByValue,
    stringBToA,
    titleBToA,
    translateBToA
  }
} catch (e) {}