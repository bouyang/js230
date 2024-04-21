function available() {
  let request = new XMLHttpRequest();
  request.open('GET', './api/schedules');
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let request = event.target;
    let staffArr = request.response;
    let available = {};

    console.log(staffArr);

    staffArr.forEach(staffObj => {
      if (staffObj['student_email'] === null) {
        available[staffObj['staff_id']] = available[staffObj['staff_id']] || [];
        available[staffObj['staff_id']].push(staffObj['date']);
      }
    });//figuring out requirement

    for (let key in available) {
      console.log(`staff ${key}: ${available[key]}`);
    }
    
  });

  request.addEventListener('loadend', event => {
    console.log('The request has completed');
  })

  request.send();
  // let x = request;

  // console.log(x);
}

available();