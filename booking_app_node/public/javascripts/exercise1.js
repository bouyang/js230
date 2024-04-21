document.addEventListener('DOMContentLoaded', event => {
  let bookings = document.querySelector('#bookings-list');

  function generateDates() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './api/bookings');
    xhr.responseType = 'json';

    xhr.addEventListener('load', event => {
      let response = xhr.response;

      response.forEach(ele => {
        let html = `<li id=${ele}>${ele}</li>`;
        bookings.insertAdjacentHTML('beforeend', html);
      });

      let li = document.querySelectorAll('li');
      let ul = document.querySelector('ul');

      ul.addEventListener('click', event => {
        event.preventDefault();

        let id = event.target['id'];

        const request = new XMLHttpRequest();
        request.open('GET', `./api/bookings/${id}`);

        request.addEventListener('load', event => {
          let html = `<li>${request.response}</li>`;
          let date = document.getElementById(`${id}`);
          date.insertAdjacentHTML('beforeend', html);
        })
        request.send();
      })
    });

    xhr.send();
  }

  generateDates();
  
});