document.addEventListener('DOMContentLoaded', () => {
  let link = document.querySelector('article ul');
  let modal = document.getElementById('modal');
  let modalLayer = document.getElementById('modal-layer');
  let exit = modal.querySelector('.close');

  link.addEventListener('click', event => {
    event.preventDefault();
    let name = event.target.alt;
    let imgSrc = event.target.src;

    modal.setAttribute('class', 'show');
    modalLayer.setAttribute('class', 'show');

    let image = modal.querySelector('img');
    image.setAttribute('src', imgSrc);
    image.setAttribute('alt', name);

    modal.querySelector('h3').textContent = name;

    modal.querySelector('p').textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniadolor';
  });

  exit.addEventListener('click', event => {
    event.preventDefault();

    modal.setAttribute('class', 'hide');
    modalLayer.setAttribute('class', 'hide');
  })


});