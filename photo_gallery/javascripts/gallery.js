document.addEventListener('DOMContentLoaded', event => {
  let thumbnails = document.querySelector('ul');

  thumbnails.addEventListener('click', event => {
    toggleActive(event.target);
  });

  function toggleActive(target) {
    let li = thumbnails.children;

    for (let i = 0; i < li.length; i += 1) {
      let item = li[i].firstElementChild;
      if (item !== target) {
        item.classList.remove('active');
      } else {
        activeItem(item);
      }
    }
  }

  function activeItem(item) {
    let figure = document.querySelector('figure img');
    item.classList.add('active');

    figure.src = item.src;
  }
});