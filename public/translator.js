import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

const databaseAB = {
  ...americanOnly,
  ...britishOnly,
  ...americanToBritishSpelling,
  ...americanToBritishTitles
}
const aTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/ //(\,|\.|\?|\!)?
const bTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]).[0-5][0-9]$/ //(\,|\.|\?|\!)?
let keyFound;
let valueFound;
let startIndex;
let endIndex;
let finalTranslation;

const textInput = document.getElementById("text-input");
const localeSelect = document.getElementById("locale-select");//american-to-british || british-to-american//
const translatedSentence = document.getElementById("translated-sentence")
const errorMsg = document.getElementById("error-msg");

String.prototype.indexOfEnd = function(string) {
  var io = this.indexOf(string);
  return io == -1 ? -1 : io + string.length
}

String.prototype.replaceAt = function(initIndex, finIndex, replacement){
  if (initIndex >= this.length){
    return this.valueOf();
  }


  return this.substring(0, initIndex) + replacement + this.substring(finIndex);
}
function handleError(){
  return errorMsg.innerHTML = "Error: No text to translate."
}
function handleNoMatch(){
  return translatedSentence.innerHTML = "Everything looks good to me!";
}
function handleClear(){
  return textInput.value ='', translatedSentence.value ='', errorMsg.value = '';  
}
function timeAToB(string){
  let strArr = string.split(" ");
  let timeArr;
  for (let i = 0; i < strArr.length; i++){
    if (aTimeRegex.test(strArr[i])){
      let colInd= strArr[i].indexOf(":");
      let timeArr = strArr[i].split("");
      timeArr.splice(colInd, 1, ".");
      strArr[i] =  '<span class="highlight">' + timeArr.join("") + '</span>';
      finalTranslation = strArr.join(" ");
      return translatedSentence.innerHTML = finalTranslation;
    }    
  }
}
function timeBToA(string){
  let strArr = string.split(" ");
  let timeArr;
  for (let i = 0; i < strArr.length; i++){
    if (bTimeRegex.test(strArr[i])){
      let perInd= strArr[i].indexOf(".");
      let timeArr = strArr[i].split("");
      timeArr.splice(perInd, 1, ":");
      strArr[i] = '<span class="highlight">' + timeArr.join("") + '</span>';
      finalTranslation = strArr.join(" ");
      return translatedSentence.innerHTML = finalTranslation;
    }    
  }
}
function translateAToB(string){ 
 keyFound, valueFound, startIndex, endIndex, finalTranslation = '';
 if (textInput.value == ''){
   return handleError();
 }
//check if translation target is time, simpler target
 timeAToB(string);
 //stop here if that was it
 if(finalTranslation !== ''){
   return 
 }
 //move to A->B translation otherwise
 let lowercase = string.toLowerCase(); //keys:values are all lowercase
 let queryKeys = Object.keys(databaseAB); // in A->B, we need to match Key

 for (let i = 0; i < queryKeys.length; i++){
    if (lowercase.indexOf(queryKeys[i]) !== -1){
      keyFound = queryKeys[i];
      valueFound = '<span class="highlight">' + databaseAB[keyFound] + '</span>';
      startIndex = lowercase.indexOf(keyFound);
      endIndex = lowercase.indexOfEnd(keyFound);
      finalTranslation = string.replaceAt(startIndex, endIndex, valueFound);
      return translatedSentence.innerHTML = finalTranslation;
    }    
  }
  //if no match
  handleNoMatch();
}
function getKeyByValue(object, value){
  return Object.keys(object).find(key => object[key] === value);
}
function translateBToA(string){
 keyFound, valueFound, startIndex, endIndex, finalTranslation = '';
 if (textInput.value == ''){
   return handleError();
 }
//check if translation target is time, simpler target
 timeBToA(string);
 //stop here if that was it
 if(finalTranslation !== ''){
   return 
 }
 //move to B->A translation otherwise
 let queryValues = Object.values(databaseAB); // in B->A, we need to match value

 for (let i = 0; i < queryValues.length; i++){
    if (string.indexOf(queryValues[i]) !== -1){
      valueFound = queryValues[i];
      keyFound = '<span class="highlight">' + getKeyByValue(databaseAB, valueFound) + '</span>';
      startIndex = string.indexOf(valueFound);
      endIndex = string.indexOfEnd(valueFound);
      finalTranslation = string.replaceAt(startIndex, endIndex, keyFound);
      return translatedSentence.innerHTML = finalTranslation;
    }    
  }
  //if no match
  handleNoMatch(); 
}
function handleTranslate(string){
  if(localeSelect.value == "american-to-british"){
    translateAToB(string);
  }
  if(localeSelect.value == "british-to-american"){
    translateBToA(string);
  }
}

document.addEventListener("click", function(event){
  if(event.target.matches("#clear-btn")){
    handleClear()
  }
  if(event.target.matches("#translate-btn")){
    handleTranslate(textInput.value);
  } 
})

try {
  module.exports = {

  }
} catch (e) {}
