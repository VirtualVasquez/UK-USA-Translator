import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';
let spellingKeys = Object.keys(americanToBritishSpelling)
let americanKeys = Object.keys(americanOnly).concat(spellingKeys);
let britishKeys = Object.keys(britishOnly);
let titleKeys = Object.keys(americanToBritishTitles);

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
function lowZero(string){
  return string.charAt(0).toLowerCase() + string.slice(1);
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
  
    //if time target
      //push literatl translation to raw,
      //push html span to formatted
    //... if title
    //... ifword/spelling
    //ELSE push splitString[i] to both arrays

//function take string b2a
  //establish two arrays: one raw, one formatted
  //split string
  //forloop split string
    //if time target
      //push literal translation to raw,
      //push html span to formatted
    //... if title
    //... ifword/spelling
    //ELSE push splitString[i] to both arrays



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
  }
} catch (e) {}
