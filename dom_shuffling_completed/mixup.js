// let body = document.body;

// let header = body.getElementsByTagName('header')[0];
// let header2 = body.getElementsByTagName('header')[1];
// let main = body.getElementsByTagName('main')[0];
// let footer = body.getElementsByTagName('footer')[0];

// body.insertBefore(main, footer);
// body.insertBefore(header, main);

// let h1 = body.getElementsByTagName('h1')[1];

// console.log(header2);

// header2.insertAdjacentElement('afterbegin', h1);

// let images1 = body.getElementsByTagName('img')[0];
// let images2 = body.getElementsByTagName('img')[1];

// let figure1 = body.getElementsByTagName('figure')[0];
// let figure2 = body.getElementsByTagName('figure')[1];

// figure1.insertAdjacentElement('afterbegin', images2);
// figure2.insertAdjacentElement('afterbegin', images1);

// let article = body.getElementsByTagName('article')[0];

// article.appendChild(figure1);
// article.appendChild(figure2);














let header = document.querySelectorAll('header');
let main = document.querySelector('main');
document.body.insertBefore(header[1], main);

let h1 = document.querySelector('main h1');
header[0].insertAdjacentElement('beforeend', h1);

let images = document.querySelectorAll('img');
let figures = document.querySelectorAll('figure');

console.log(images[0]);
console.log(figures[0]);

figures[0].insertAdjacentElement('afterbegin', images[1]);
figures[1].insertAdjacentElement('afterbegin', images[0]);

















