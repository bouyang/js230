document.addEventListener('DOMContentLoaded', event => {
  const message = document.querySelector("#message");
  const letters = document.querySelector("#spaces");
  const guesses = document.querySelector("#guesses");
  const apples = document.querySelector("#apples");
  const replay = document.querySelector("#replay");

  var randomWord = function() {
    var words = ['APPLE', 'BANANA', 'ORANGE', 'PEAR'];

    return function() {
      var word = words[Math.floor(Math.random() * words.length)];
      words.splice(words.indexOf(word), 1);
      return word;
    };
  }();

  function Game() {
    this.targetWord;
    this.incorrectGuesses = 0;
    this.guessedLetters = [];
    this.allowedGuesses = 6;

    this.init();
  }

  Game.prototype = {
    draw: function() {
      if (this.incorrectGuesses > 0) {
        apples.classList.add(`guess_${this.incorrectGuesses}`);
      }
      
    },

    reset: function() {
      document.querySelectorAll('span').forEach(item => item.remove());
      apples.classList.remove(...apples.classList);
    },

    createWord: function() {
      for (let i = 0; i < this.targetWord.length; i += 1) {
        let ele = document.createElement('span');
        ele.id = `word_${i}`;
        letters.appendChild(ele);
      }
    },

    drawWord: function() {
      let recentGuess = this.guessedLetters[this.guessedLetters.length - 1];

      let targetWordLetters = this.targetWord.split('');

      for (let i = 0; i < targetWordLetters.length; i += 1) {
        if (targetWordLetters[i] === recentGuess) {
          document.getElementById(`word_${i}`).textContent = recentGuess;
        }
      }
    },

    drawGuesses: function() {
      let recentGuess = this.guessedLetters[this.guessedLetters.length - 1];

      let ele = document.createElement('span');
      ele.textContent = recentGuess;
      guesses.appendChild(ele);

    },

    evaluateGuess: function(key) {
      let targetWordLetters = this.targetWord.split('');
      if (!targetWordLetters.includes(key)) {
        this.incorrectGuesses += 1;
        apples.classList.remove(...apples.classList);
        apples.classList.add("guess_" + this.incorrectGuesses);
      }
      
    },

    evaluateWin: function() {
      if (this.incorrectGuesses >= this.allowedGuesses) {
        this.displayMessage('You lose');
        removeEventListener('keyup', handleKeyUp);
      }
    },

    displayMessage: function(msg) {
      message.textContent = msg;
    },

    init: function() {
      this.reset();

      this.targetWord = randomWord();
      if (this.targetWord === undefined) {
        console.log('Sorry I run out of words');
        return;
      }

      this.incorrectGuesses = 0;
      this.guessedLetters = [];

      this.draw();
      this.createWord();
    }
  }

  let handleKeyUp = (event) => {
    event.preventDefault();

    let key = String.fromCharCode(event.which);

    if (event.which >= 65 && event.which <= 90) {
      if (x.guessedLetters.includes(key)) {
        return;
      } else {
        x.guessedLetters.push(key);
        // console.log(x.guessedLetters);
      }
    }

    x.evaluateGuess(key);
    x.draw();
    x.drawWord();
    x.drawGuesses();
    x.evaluateWin();
  };
  document.addEventListener('keyup', handleKeyUp);

  document.getElementById('replay').addEventListener('click', event => {
    event.preventDefault();
    new Game();
  })

  let x = new Game();

});