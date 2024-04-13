let main = document.querySelector('main');
let sub = document.querySelector('#sub');

main.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  alert(event.target.tagName);
});

sub.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  event.stopPropagation();
  alert(event.target.tagName);
});