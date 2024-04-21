document.addEventListener('DOMContentLoaded', event => {
  let form = document.querySelector('form');
  let select = document.querySelector('#id');
  let staffs = [];
  let available = [];
  let allEmails = [];

  const xhr = new XMLHttpRequest();
    xhr.open('GET', './api/schedules');
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', event => {
      staffs = xhr.response;
      available = staffs.filter(item => {
        return item['student_email'] === null;
      });
    });

  form.querySelector('select#id').addEventListener('click', event => {
    event.preventDefault();
    select.innerHTML = '';
    
    available.forEach(item => {
      let name = item['staff_id'];
      let date = item['date'];
      let time = item['time'];

      let option = document.createElement('option');
      option.text = `${name} | ${date} | ${time}`;
    
      select.add(option);
    });
  });

  

  form.addEventListener('submit', event => {
    event.preventDefault();

    let email = form.querySelector('#student_email').value;
    getAllEmails();

    if (emailExists(email, allEmails)) {

      const xhr = new XMLHttpRequest();
      xhr.open('POST', './api/bookings');
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

      let bookid = form.querySelector('select#id').value.slice(0, 1);

      let data = { id: bookid, student_email: email };
      let json = JSON.stringify(data);
      xhr.send(json);
    }

    
  });

  function getAllEmails() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './api/students');
    xhr.responseType = 'json';
    xhr.send();

    xhr.addEventListener('load', event => {
      xhr.response.forEach(item => {
        allEmails.push(item['email']);
      });
    });
  }

  function emailExists(email, allEmails) {
    return allEmails.includes(email)
  }
});