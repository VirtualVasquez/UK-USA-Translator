
//US1
//US2
//US3
//US4
//US5
//US6
//US7 - done
//US8
//US9
//US10

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
const aTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9](\,|\.|\?|\!)?$/
const bTimeRegex = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]).[0-5][0-9](\,|\.|\?|\!)?$/
let keyFound;
let valueFound;
let targetIndex;
let finalTranslation;

const textInput = document.getElementById("text-input");
const localeSelect = document.getElementById("locale-select");//american-to-british || british-to-american//
const translatedSentence = document.getElementById("translated-sentence")
const errorMsg = document.getElementById("error-msg");
const translateBtn = document.getElementById("translate-btn");
const clearBtn = document.getElementById("clear-btn");


function translateAtoB(string){  
 
  
 let lowercase = string.toLowerCase();
 let queryKeys = Object.keys(databaseAB);
 for (let i = 0; i < queryKeys.length; i++){
    if (lowercase.indexOf(queryKeys[i]) !== -1){
      keyFound = queryKeys[i];
      valueFound = americanOnly[keyFound];
      targetIndex = (lowercase.indexOf(keyFound))
      console.log("Key Found: " + keyFound + " | targetIndex: " + targetIndex +  " | Value Found: " + valueFound)//working
    }    
  }
}


//a-to-b translations working, but need to target div, and iterate over each function for input string
// function aOnly(string){
//   let lowercase = string.toLowerCase();
//   let queryKeys = Object.keys(americanOnly);
//   for (let i = 0; i < queryKeys.length; i++){
//     if (lowercase.indexOf(queryKeys[i]) !== -1){
//       keyFound = queryKeys[i];
//       valueFound = americanOnly[keyFound];
//       targetIndex = (lowercase.indexOf(keyFound))
//       console.log("Key Found: " + keyFound + " | Value Found: " + valueFound)//working
//     }    
//   }
// }

// function aToBSpelling(string){
//   let lowercase = string.toLowerCase();
//   let queryKeys = Object.keys(americanToBritishSpelling);
//   for (let i = 0; i < queryKeys.length; i++){
//     if (lowercase.indexOf(queryKeys[i]) !== -1){
//       keyFound = queryKeys[i];
//       valueFound = americanToBritishSpelling[keyFound];
//       targetIndex = (lowercase.indexOf(keyFound))
//       console.log("Key Found: " + keyFound + " | Value Found: " + valueFound)//working
//     }    
//   }
// }

// function aToBTitle(string){
//   let lowercase = string.toLowerCase();
//   let queryKeys = Object.keys(americanToBritishTitles);
//   for (let i = 0; i < queryKeys.length; i++){
//     if (lowercase.indexOf(queryKeys[i]) !== -1){
//       keyFound = queryKeys[i];
//       valueFound = americanToBritishTitles[keyFound];
//       targetIndex = (lowercase.indexOf(keyFound))
//       console.log("Key Found: " + keyFound + " | Value Found: " + valueFound)//working
//     }    
//   }
// }

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
      let colInd= strArr[i].indexOf(".");
      let timeArr = strArr[i].split("");
      timeArr.splice(colInd, 1, ":");
      strArr[i] = timeArr.join("");
      // console.log(strArr.join(" ")); //working
      finalTranslation = strArr.join(" ");
      return console.log(finalTranslation)
    }    
  }
}

function handleError(){
  return errorMsg.innerHTML = "Error: No text to translate."
}


function handleTranslate(){
  if(localeSelect.value == "american-to-british"){
    //look for any american words that match any in the input
    //if found, return british version
  }
  if(localeSelect.value == "british-to-american"){
    //look for british words that match your any in the input
    //if found, return american version
  }
}

//US7//
function handleClear(){
  return textInput.value ='', translatedSentence.value ='', errorMsg.value = '';  
}
//EUS7//


document.addEventListener("click", function(event){
  
  if(event.target.matches("#clear-btn")){
    handleClear()
  }
  
  if(event.target.matches("#translate-btn")){
    timeAToB(textInput.value);
  }
  
})


try {
  module.exports = {

  }
} catch (e) {}
