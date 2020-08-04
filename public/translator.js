import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';
let spellingKeys = Object.keys(americanToBritishSpelling)
let americanKeys = Object.keys(americanOnly).concat(spellingKeys);
let britishKeys = Object.keys(britishOnly).concat(Object.keys(swap(americanToBritishSpelling)));
let titleKeys = Object.keys(americanToBritishTitles);
let b2aTitles = swap(americanToBritishTitles);
let b2aTitleKeys = Object.keys(b2aTitles);
const americanDB = {
  ...americanOnly,
  ...americanToBritishSpelling
}
const britishDB = {
  ...britishOnly,
  ...swap(americanToBritishSpelling)
}
const textInput = document.getElementById("text-input");
const localeSelect = document.getElementById("locale-select");//american-to-british || british-to-american//
const translatedSentence = document.getElementById("translated-sentence")
const errorMsg = document.getElementById("error-msg");
const aTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9](\,|\.|\?|\!)?$/
const bTimeRegex = new RegExp(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]).[0-5][0-9](\,|\.|\?|\!)?$/)

//GENERAL FUNCTIONS//
function swap(obj){
  var ret = {};
  for(var key in obj){
    ret[obj[key]] = key;
  }
  return ret;
}
function handleError(){
  translatedSentence.innerHTML ="";
  return errorMsg.innerHTML = "Error: No text to translate."
}
function handleNoMatch(){
  return translatedSentence.innerHTML = "Everything looks good to me!";
}
function handleClear(){
  textInput.value = '';
  translatedSentence.innerHTML = '';
  errorMsg.innerHTML = '';
}
function upZero(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function highlight(string){
  return '<span class="highlight">' + string + '</span>'
}
// END GENERAL FUNCTIONS//


function A2B (string){
  let raw = string;
  let formatted = string;
  let strSplit = string.split(" ")
  //includes A-ONLY and SPELLING | excludes TIME and TITLE
  for( let i = 0; i < americanKeys.length; i++){
    if(string.includes(americanKeys[i])){
      let britWord = americanDB[americanKeys[i]];
      raw = raw.replace(americanKeys[i],britWord);
      formatted = formatted.replace(americanKeys[i],highlight(britWord))
    }
  }
  //TITLE only
  for(let i = 0; i < titleKeys.length;i++){
    if(string.includes(upZero(titleKeys[i]))){
      raw = raw.replace(upZero(titleKeys[i]), upZero(americanToBritishTitles[titleKeys[i]]))
      formatted = formatted.replace(upZero(titleKeys[i]), highlight(upZero(americanToBritishTitles[titleKeys[i]])))
    }
  }
  //TIME ONLY
  for(let i = 0; i < strSplit.length; i++){
    if(strSplit[i].includes(":")){
      let britTime = strSplit[i].replace(":", ".");
      raw = raw.replace(strSplit[i], britTime);
      formatted = formatted.replace(strSplit[i], highlight(britTime));
    }
  }
  if(raw == string){
    return handleNoMatch();
  }
  translatedSentence.innerHTML = formatted;
  return [raw, formatted]
}
function B2A (string){
  let raw = string;
  let formatted = string;
  let strSplit = string.split(" ")
  //includes B-ONLY and SPELLING | excludes TIME and TITLE
  for( let i = 0; i < britishKeys.length; i++){
    if(string.match(`\\b${britishKeys[i]}\\b`)){
      let usaWord = britishDB[britishKeys[i]];
      raw = raw.replace(britishKeys[i],usaWord);
      formatted = formatted.replace(britishKeys[i],highlight(usaWord))
    }
  }
  //TITLE only
  for(let i = 0; i < b2aTitleKeys.length;i++){
    let titleRegex = new RegExp(`\\b${b2aTitleKeys[i]}\\b`, 'i')
    if(string.match(titleRegex)){
      raw = raw.replace(upZero(b2aTitleKeys[i]), upZero(b2aTitles[b2aTitleKeys[i]]))
      formatted = formatted.replace(upZero(b2aTitleKeys[i]), highlight(upZero(b2aTitles[b2aTitleKeys[i]])))
    }
  }
  //TIME ONLY
  for(let i = 0; i < strSplit.length; i++){
    if(bTimeRegex.test(strSplit[i])){
      let usaTime = strSplit[i].replace(".", ":");
      raw = raw.replace(strSplit[i], usaTime);
      formatted = formatted.replace(strSplit[i], highlight(usaTime));
    }
  }
  if(raw == string){
    return handleNoMatch();
  }
  translatedSentence.innerHTML = formatted;
  return [raw, formatted]
}

//ULTIMATE TRANSLATOR FUNCTION//
function handleTranslate(string){
  if (string == ''){
    return handleError();
  }
  if(localeSelect.value == "american-to-british"){
    A2B(string);
  }
  if(localeSelect.value == "british-to-american"){
    B2A(string);
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
    A2B,
    B2A,
    handleTranslate
  }
} catch (e) {}
