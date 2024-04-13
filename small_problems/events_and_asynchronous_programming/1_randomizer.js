function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  let n = callbacks.length;

  callbacks.forEach(cb => {
    let random = Math.floor(Math.random() * 2 * n) + 1;
    setTimeout(cb, random * 1000);
  });

  for (let i = 1; i <= 2 * n; i += 1) {
    setTimeout(() => console.log(i), i * 1000);
  }
  
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6