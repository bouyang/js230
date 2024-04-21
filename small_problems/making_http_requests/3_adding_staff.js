document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    
    let email = form.querySelector('#email').value;
    let name = form.querySelector('#name').value;

    if (!email || !name) {
      alert('Staff could not be created');
    } else {
      addStaff(email, name);
    }
  })

  function addStaff(email, name) {
    let request = new XMLHttpRequest();
    request.open('POST', './api/staff_members');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    let data = { email: email, name: name };
    let json = JSON.stringify(data);

    request.send(json);

    request.addEventListener('load', event => {
      response = JSON.parse(request.response);
      console.log('Successfully create with id of ' + response['id']);
    })
  }
})

