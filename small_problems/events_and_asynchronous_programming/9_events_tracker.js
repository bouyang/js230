let tracker = {
  listArr: [],

  list() {
    return this.listArr;
  },

  elements() {
    return this.listArr.map(item => item.target);
  },

  add(event) {
    this.listArr.push(event);
  },

  clear() {
    this.listArr = [];
    return this.listArr.length;
  }
}

function track(callback) {
  return function(event) {
    if (!tracker.listArr.includes(event)) {
      tracker.listArr.push(event);
    }
    callback(event);
  }
}

// function track(callback) {
//   function isEventTracked(events, event) {
//     return events.includes(event);
//   }

//   return event => {
//     if (!isEventTracked(tracker.list(), event)) {
//       tracker.add(event);
//     }

//     callback(event);
//   };
// }

const divRed = document.querySelector('#red');
const divBlue = document.querySelector('#blue');
const divOrange = document.querySelector('#orange');
const divGreen = document.querySelector('#green');

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  document.body.style.background = 'green';
}));