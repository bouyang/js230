// let downloadFilePromise = new Promise(function(resolve, reject) {
//   console.log('Downloading file...');
//   setTimeout(() => {
//     resolve('Download complete!');
//   }, 2000);
// })
// .then(function(result) {
//   console.log(result);
// });

// function processDataPromise(numArr) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(numArr.map(ele => ele * 2));
//     }, 1000);
//   })
// }

// // Example usage:
// processDataPromise([1, 2, 3]).then((processedNumbers) => {
//   console.log(processedNumbers);
//   // After 1 second, logs: [2, 4, 6]
// });


// let flakyService = new Promise((resolve, reject) => {
//   let result = Math.floor(Math.random() * 2);

//   if (result) {
//     resolve('Operation succesful');
//   } else {
//     reject('Operation failed');
//   }
// })
// .then(function(result) {
//   console.log(result);
// })
// .catch(function(result) {
//   console.log(result);
// })

// flakyService;

// function cleanup() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('Hello World');
//       resolve('Operation complete');
//     }, 1000);
//   });
// }

// cleanup()
//   .then(console.log)
//   .finally(() => {
//     console.log('cleanup');
//   });

function chain(num) {
  return new Promise((resolve) => {
    resolve(num);
  });
}

chain(2)
  .then((result) => result * 2)
  .then((result) => result + 5)
  .then((result) => console.log(result));