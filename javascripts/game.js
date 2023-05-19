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
    incorrect
    correct
    MAX_GUESSES = 6;
    word
    guessedLetters
  
  does:
    keyup event listner for alph letters

        check if guessed character is in the word
          yes: reveal all matching characters
              increment correct
              check if correct === the unique letters in word
                yes: gameOver(win)
                no: 
                  check if correct + incorrect < max
                    yes: continue
                    no: gameOver(lose)

          no: add to guessedLetters
              increment incorrect
              drops apple

  revealLetter
    
  gameOver: 
    win message/ background
    unbind key event
    display play again

  play again link:
    "#replay"
    preventDefault
    new Game()


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
        this.changeMessage('Sorry no more words');
        return this;
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
      this.enableKeyEvent();
      this.MAX_GUESSES = 6;
      
    },

    enableKeyEvent() {
      document.addEventListener("keyup", this.gameEngine.bind(this));
    },

    gameEngine(e) {
      const guess = e.key;
        
      if ((guess).match(/[^a-z]/) || this.guessedLetters.includes(guess)) {
         return;
      }
      
      if ((this.word).includes(guess)) {
        //reveal matching
        this.correct++;
        if (this.correct === this.word.length) {
          this.gameOver(true);
          return;
        }
      } else {
        this.incorrect++;
        this.guessedLetters.push(guess);
        //drops apple
      }

      if (this.correct + this.incorrect === this.MAX_GUESSES) {
        this.gameOver(false)
      }
    },

    gameOver(win) {
      if (win) {
        this.changeMessage('win');
      } else {
        this.changeMessage('loose');
      }

      // document.removeEventListener("keyup", this.gameEngine);
      // <a id="replay" href="#">Play another</a>
    }
  };

  new Game();
});