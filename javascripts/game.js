/*
OBJECTIVE
guessa word game: the user is presented with a series of blank spaces to represent characters in a word that the user is guessing

user incorrect a letter via keyboard: 
`guesses` incremented
  correct: all instances of letter are filled in
  incorrec: an apple falls from the tree

win: all letters in word are guessed, guesses < 7
  - background blue
  - congrats message
  - `play another` link displays

loose: still have not filled in letters, guesses === 6
  - background red
  - sorry message
  - `play another` link displays

words array: 
  - contains words
  - each used worder removed

play another:
  - reset apples
  - empty word and guesses area
  - new word 
  - if no words left: display message


core concepts:
  randomWord
  - array of words
  - pcik random one
  - return it
  - delete from array
  - return undefined when no words are left
  maybe use an IIFE when initializing game to return a funciton that has access to the array

  resetGame
  - new word
    if undefined:
      - red background
      - words all gone message
  - new apples
  - empty areas
  - guesses = 0

  Game
  has: 
    guesses
    MAX_GUESSES = 6;
    word
    revealedChars
    guessedChars
  
  does:
    checks if guessed character is in the word
      yes: reveals correct character
      no: adds to guessedChars
          drops apple
    
    checks that there are still guesses left

*/
document.addEventListener("DOMContentLoaded", e => {
  let tree = document.querySelector("#tree");
  let message = document.querySelector("#message");
  let letters = document.querySelector("#spaces");
  let guesses = document.querySelector("#guesses");


  let randomWord = (function() {
    let words = ['potato', 'hiking', 'chicken', 'cat'];
          
    function getRandomIndex() {
      return Math.floor(Math.random() * words.length);
    }
        
    return function() {
      return words.splice(getRandomIndex(), 1)[0];
    }
  })();

  function Game() {
    this.word = randomWord().split('');
      if (this.word === undefined) {
        console.log('Sorry no more words');
        return;
      }
    this.incorrect = 0;
    this.correct = 0;
    this.guessedLetters = [];
    this.init();
  }

  Game.prototype = {
    createBlanks() {
      let spaces = (new Array(this.word.length + 1)).join("<span></span>");
  
      let spans = letters.querySelectorAll("span");
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });
  
      letters.insertAdjacentHTML('beforeend', spaces);
      this.spaces = document.querySelectorAll("#spaces span");
    },

    changeMessage(text) {
      message.innerText = text;
    },
    
    init() {
      this.createBlanks();
    },
  };

  new Game();
});