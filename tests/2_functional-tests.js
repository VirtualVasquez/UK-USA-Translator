/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

let Translator;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    Translator = require('../public/translator.js');
  });

  suite('Function ____()', () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", done => {
        const textInput = document.getElementById('text-input');
        const translatedSentence = document.getElementById('translated-sentence');
        const output = 'freeCodeCamp is my <span class="highlight">favourite</span>';
  
        let input = textInput.value = "freeCodeCamp is my favorite";
        Translator.handleTranslate(input);
        assert.strictEqual(translatedSentence.innerHTML, output);
      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
        const textInput = document.getElementById('text-input');
        const translatedSentence = document.getElementById('translated-sentence');
        const output = 'Everything looks good to me!';
  
        let input = textInput.value = "Nothing to see here";
        Translator.handleTranslate(input);
        assert.strictEqual(translatedSentence.innerHTML, output);
        done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
        const textInput = document.getElementById('text-input');
        const errorMsg = document.getElementById('error-msg');
        const output = 'Error: No text to translate.';
  
        let input = textInput.value = "";
        Translator.handleTranslate(input);
        assert.strictEqual(errorMsg.innerHTML, output);
        done();
    });

  });

  suite('Function ____()', () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
        const textInput = document.getElementById('text-input');
        const errorMsg = document.getElementById('error-msg');
        const translatedSentence = document.getElementById('translated-sentence');
        Translator.handleClear();
        assert.equal(textInput.innerHTML, "");
        assert.equal(errorMsg.innerHTML, "");
        assert.equal(translatedSentence.innerHTML, "")
        done();
    });

  });

});
