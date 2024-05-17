document.addEventListener('DOMContentLoaded', event => {
  let thumbnail = document.querySelector('ul');
  let expanded = document.querySelector('figure img');

  thumbnail.addEventListener('click', event => {
    let currentActive = thumbnail.querySelector('.active');
    let thumb = event.target;

    currentActive.classList.remove('active');
    thumb.classList.add('active');

    expanded.setAttribute('src', thumb.src);
  })
});