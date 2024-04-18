document.addEventListener('DOMContentLoaded', event => {
  let form = document.querySelector('form');
  let list = document.getElementById('grocery-list');

  form.addEventListener('submit', event => {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let quantity = document.getElementById('quantity').value || '1';

    let newItem = document.createElement('li');
    newItem.appendChild(document.createTextNode(quantity + ' ' + name));
    list.appendChild(newItem);
    
    form.reset();
  })
});