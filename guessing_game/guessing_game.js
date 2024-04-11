document.addEventListener('DOMContentLoaded', event => {
  let answer = Math.floor(Math.random() * 100) + 1;

  let input = document.querySelector('#guess');
  let form = document.querySelector('form');
  let paragraph = document.querySelector('p');
  let message;

  form.addEventListener('submit', event => {
    event.preventDefault();
    let guess = parseInt(input.value, 10);

    if (Number.isNaN(guess)) {
      message = 'Invalid number';
    } else if (guess > answer) {
      message = `My number is lower than ${String(guess)}`;
    } else if (guess < answer) {
      message = `My number is higher than ${String(guess)}`;
    } else {
      message = `Correct, my number is ${String(answer)}`;
      document.querySelector('input[type="submit"]').style.color = 'grey';
    }

    paragraph.textContent = message;
  });

  let newGame = document.querySelector('a');
  newGame.addEventListener('click', event => {
    answer = Math.floor(Math.random() * 100) + 1;
    
    paragraph.textContent = 'Guess a number from 1 to 100'; 
  })
});