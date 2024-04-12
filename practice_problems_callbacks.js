// function basicCallback(callback, num) {
//   setTimeout(() => {
//     callback(num);
//   }, 2000);
// }

// // Example usage:
// basicCallback((number) => {
//   console.log(number * 2);
// }, 5);
// // After 2 seconds, logs: 10

// function downloadFile(callback) {
//   console.log('Downloading file...');
//   setTimeout(() => {
//     callback('Download complete!')
//   }, 1500);
// }

// function processData(arr, callback) {
//   let newArr;
//   setTimeout(() => {
//     newArr = arr.map(callback);
//     console.log(newArr);
//   }, 1000);
// }

// // Example usage:
// processData([1, 2, 3], (number) => number * 2);
// // After 1 second, logs: [2, 4, 6]

// function waterfallOverCallbacks(callbacksArr, num) {
//   callbacksArr.forEach(ele => {
//     num = ele(num);
//   });

//   console.log(num);
// }

// // Example usage:
// const double = (x) => x * 2;
// waterfallOverCallbacks([double, double, double], 1);
// // Logs: 8

function startCounter(callback) {
  let counter = 1;
  let end;

  let func = setInterval(() => {
    end = callback(counter);
    counter += 1;
    if (end) {
      clearInterval(func);
    }
  }, 1000);
}

// Example usage:
startCounter((count) => {
  console.log(count);
  return count === 5;
});
// Logs 1, 2, 3, 4, 5, then stops