

document.addEventListener('DOMContentLoaded', () => {
  const message = document.querySelector("#message");
  const letters = document.querySelector("#spaces");
  const guesses = document.querySelector("#guesses");
  const apples = document.querySelector("#apples");
  const replay = document.querySelector("#replay");

  let randomWord = (function() {
    let wordBank = ['apple', 'banana', 'orange', 'pear'];
  
    return function() {
      let randomNum = Math.floor(Math.random() * wordBank.length);
      let randomWord = wordBank[randomNum];
      wordBank.splice(randomNum, 1);
  
      return randomWord;
    }
  })();

  class Game {
    constructor() {
      this.target = randomWord();
      this.maxGuesses = 6;
      this.numGuesses = 0;
      this.guessed = [];
      this.correct = [];
  
      if (this.target === undefined) {
        this.displayMessage('Sorry Ive run out of words');
      } else {
        this.createBlanks();
      }
    }
  
    createBlanks() {
      letters.innerHTML = '<h2>Word:</h2>';
      guesses.innerHTML = '<h2>Guesses:</h2>';
      document.querySelector(`#apples`).removeAttribute('class');
      this.displayMessage('');

      for (let i = 0; i < this.target.length; i += 1) {
        let x = document.createElement('span');
        x.setAttribute('id', `guess${i}`);
        letters.appendChild(x);
      }
    }

    displayMessage(msg) {
      message.textContent = msg;
    }
  }

  let game = new Game();

  function checkGuess(key) {
    let index = [];

    game.target.split('').forEach((letter, idx) => {
      if (letter === key) {
        index.push(idx);
        game.correct.push(key);
      }
    });

    if (index.length === 0) {
      wrongGuess();
    } else {
      index.forEach(idx => {
        document.getElementById(`guess${idx}`).textContent = key;
      });
    }
  }

  function wrongGuess() {
    game.numGuesses += 1;
    document.querySelector(`#apples`).setAttribute('class', `guess_${game.numGuesses}`);
  }

  document.addEventListener('keyup', event => {
    let key;
    if (event.key.charCodeAt(0) >= 97 && event.key.charCodeAt(0) <= 122) {
      key = event.key;

      if (!game.guessed.includes(key)) {

        checkGuess(key);

        game.guessed.push(key);

        let x = document.createElement('span');
        x.textContent = key;
        guesses.appendChild(x);
      }

      if (game.numGuesses === game.maxGuesses) {
        document.removeEventListener('keyup', event);
        game.displayMessage('You lost!')
      }
    
      if (game.target.split('').filter((ele, idx, self) => self.indexOf(ele) === idx).length === game.correct.length) {
        document.removeEventListener('keyup', event);
        game.displayMessage('You won!');
      }
    }
  });

  replay.addEventListener('click', event => {
    event.preventDefault();
    game = new Game();
  })

});