document.addEventListener('DOMContentLoaded', () => {
  let form = document.getElementById('form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    let data = new FormData(form);

    let request = new XMLHttpRequest();
    request.open('POST', form.action);

    request.addEventListener('load', event => {
      console.log(request.responseText); // or do something else with the response
    });

    request.send(data);
  });
});