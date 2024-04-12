document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');
  let content = document.querySelector('.content');
  let cursorInterval;

  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');

    cursorInterval = cursorInterval || setInterval(() => textField.classList.toggle('cursor'), 500);
  });

  
  document.addEventListener('keydown', event => {
    if (textField.classList.contains('focused')) {
      let key = event.key;
      if (key === 'Backspace') {
        content.textContent = content.textContent.slice(0, content.textContent.length - 1);
      } else {
        content.textContent += key;
      }
      
    }
  });

  document.addEventListener('click', event => {
    textField.classList.remove('focused');
    textField.classList.remove('cursor');
    clearInterval(cursorInterval);
    cursorInterval = null;
  });
});