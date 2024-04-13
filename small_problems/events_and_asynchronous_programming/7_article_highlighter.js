document.addEventListener('DOMContentLoaded', () => {
  let ul = document.querySelector('ul');
  let articleP = document.querySelector('main');
  
  ul.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    let highlight = document.querySelector('.highlight');

    if (highlight) {
      highlight.classList.remove('highlight');
    }

    let article = document.querySelector(`#${event.target.getAttribute('href').slice(1)}`);
    article.classList.add('highlight');
  });

  articleP.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    let highlight = document.querySelector('.highlight');

    if (highlight) {
      highlight.classList.remove('highlight');
    }

    let article = document.querySelector(`#${event.target.parentNode.id}`);
    article.classList.add('highlight');
  });

  document.addEventListener('click', event => {
    event.preventDefault();
    let highlight = document.querySelector('.highlight');

    if (highlight) {
      highlight.classList.remove('highlight');
    }

    let main = document.querySelector('main');
    main.classList.add('highlight');
  });
})