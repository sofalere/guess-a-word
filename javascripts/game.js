document.addEventListener("DOMContentLoaded", e => {
  let apples = document.querySelector("#apples");
  let message = document.querySelector("#message");
  let letters = document.querySelector("#spaces");
  let guesses = document.querySelector("#guesses");
  let replay  = document.querySelector("#replay")

  let randomWord = (function() {
    let words = ['cat', 'potato', 'hiking', 'chicken'];
          
    function getRandomIndex() {
      return Math.floor(Math.random() * words.length);
    }
        
    return function() {
      return words.splice(getRandomIndex(), 1)[0];
    }
  })();

  function Game() {
    this.word = randomWord();
      if (this.word === undefined) {
        this.changeMessage('Sorry no more words.');
        return this;
      }
    this.word = this.word.split('');
    this.incorrect = 0;
    this.correct = 0;
    this.guessedLetters = [];
    this.init();
  }

  Game.prototype = {
    MAX_GUESSES: 6,
    
    createBlanks() {
      let spaces = (new Array(this.word.length + 1)).join("<span></span>");
  
      let spans = letters.querySelectorAll("span");
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });
  
      letters.insertAdjacentHTML('beforeend', spaces);
      this.spaces = document.querySelectorAll("#spaces span");
    },

    removeLetters() {
      document.querySelectorAll("span").forEach(letter => letter.remove());
    },

    changeMessage(text) {
      message.innerText = text;
    },
    
    init() {
      this.removeLetters();
      this.createBlanks();
      this.bind();
      this.hideReplayLink();
      this.changeMessage('');
      this.drawApples();
    },

    bind() {
      this.gameEngineHandler = (e) => this.gameEngine(e);
      document.addEventListener("keyup", this.gameEngineHandler);
    },

    unbind() {
      document.removeEventListener("keyup", this.gameEngineHandler);
    },

    gameEngine(e) {
      const guess = e.key;
        
      if ((guess).match(/[^a-z]/) || this.guessedLetters.includes(guess)) {
         return;
      }
      
      if ((this.word).includes(guess)) {
        this.displayCorrectGuess(guess);

        if (this.correct === this.word.length) {
          this.gameOver(true);
          return;
        }
      } else {
        this.guessedLetters.push(guess);
        this.displayWrongGuess();
        this.dropApple();
      }

      if (this.incorrect === this.MAX_GUESSES) {
        this.gameOver(false)
      }
    },

    displayCorrectGuess(guess) {
      let spaces = document.querySelectorAll("#spaces span");
      this.word.forEach((letter, ind) => {
        if (guess === letter) {
          spaces[ind].innerText = letter;
          this.correct++;
        }
      })
    },

    displayWrongGuess() {
      let wrongGuess = `<span>${this.guessedLetters.slice(-1)}</span`;
      guesses.insertAdjacentHTML("beforeend", wrongGuess);
      this.incorrect++;
    },

    dropApple() {
      apples.classList.add(`guess_${this.incorrect}`);
    },

    drawApples() {
      apples.className = '';
    },

    gameOver(win) {
      if (win) {
        this.changeMessage('Congrats you win!');
      } else {
        this.changeMessage("Sorry, you're out of guesses.");
      }

      this.showReplayLink();
      this.unbind();
    },

    showReplayLink() {
      replay.classList.add("visible");
    },
    
    hideReplayLink() {
      replay.classList.remove("visible");
    },
  };

  replay.addEventListener("click", (e) => {
    e.preventDefault();
    new Game();
  });

  new Game();
});