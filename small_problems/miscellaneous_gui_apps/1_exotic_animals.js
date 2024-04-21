document.addEventListener('DOMContentLoaded', event => {
  let figure = document.querySelector('figure');
  let caption;

  figure.addEventListener('mouseenter', event => {
    console.log('ent');
    caption = setTimeout(() => {
      figure.querySelector('figcaption').style.visibility = 'visible'; 
    }, 2000, false);
  });

  figure.addEventListener('mouseleave', event => {
    clearTimeout(caption);;
    figure.querySelector('figcaption').style.visibility = 'hidden'; 
  });
})