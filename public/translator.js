import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

let americanKeys = Object.keys(americanOnly);
let britishKeys = Object.keys(britishOnly);
let titleKeys = Object.keys(americanToBritishTitles);
let spellingKeys = Object.keys(americanToBritishSpelling)
const aTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/ //(\,|\.|\?|\!)?

const americanDB = {
  ...americanOnly,
  ...americanToBritishSpelling,
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


function a2b (string){
  let preRaw = string;
  let preFormatted = string;
?  //includes A-ONLY and SPELLING | excludes TIME and TITLE
  for( let i = 0; i < americanKeys.length; i++){
    if(string.includes(americanKeys[i])){
      let britWord = americanDB[americanKeys[i]];
      preRaw = preRaw.replace(americanKeys[i],britWord);
      preFormatted = preFormatted.replace(americanKeys[i],highlight(britWord)))
    }
  }
  //TITLE only
  for(let i = 0; i < titleKeys.length;i++){
    if(string.includes(upZero(titleKeys[i]))){
      matches.push(titleKeys[i]);
    }
  }
  //TIME ONLY

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
  rawTranslation, finalTranslation = '';
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
    console.log(databaseBA);
    handleTranslate(textInput.value);
  } 
})
//END EVENT LISTENERS//

try {
  module.exports = {
  }
} catch (e) {}
