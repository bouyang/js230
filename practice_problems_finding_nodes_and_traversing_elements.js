// function wordCount() {
//   let result = [];
//   let h2nodes = document.querySelectorAll('h2');
  
//   for (let i = 0; i < h2nodes.length; i += 1) {
//     result.push(h2nodes[i].textContent.split(' ').length);
//   }
//   console.log(result);
// }

// wordCount();

// let div1 = document.getElementById('toc');
// let div2 = document.getElementsByClassName('toc')[0];
// let div3 = document.getElementsByClassName('toctitle')[0].parentNode;

// console.log(div1);
// console.log(div2);
// console.log(div3);

// let tocLinks = document.querySelectorAll('#toc, a');

// for (let i = 0; i < tocLinks.length; i += 1) {
//   if (i % 2 === 1) {
//     tocLinks[i].style.color = 'green';
//   }
// }

// let caption = document.querySelectorAll('.thumbcaption');

// let captionText = [];

// for (let i = 0; i < caption.length; i += 1) {
//   captionText.push(caption[i].textContent.trim());
// }

// console.log(captionText);

let tdNodes = document.querySelectorAll('td');

let keys = ['Kingdom', 'Phylum', 'Clade', 'Class', 'Order', 'Suborder', 'Family',
            'Genus', 'Species'];

let values = [];

keys.forEach(key => {
  for (let i = 0; i < tdNodes.length; i += 1) {
    if (tdNodes[i].firstChild.textContent === `${key}:`) {
      values.push(tdNodes[i].nextElementSibling.textContent);
    }
  }
})

console.log(values);