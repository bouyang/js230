// function flakyService() {
//   return new Promise((resolve, reject) => {
//     if (Math.random() > 0.5) {
//       resolve("Operation successful");
//     } else {
//       reject("Operation failed");
//     }
//   });
// }

// flakyService()
//   .then(console.log)
//   .catch(() => console.log('An error occurred'));

// function fetchUserData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => reject({ error: "User not found" }), 500);
//   });
// }

// fetchUserData()
//   .catch((obj) => console.error(obj['error']))
//   .finally(() => console.log('Fetching complete'));

// let times = 0;

// function retryOperation(operationFunc) {
//   operationFunc()
//     .then(console.log)
//     .catch(() => {
//       times += 1;
//       if (times <= 2) {
//         console.log('Retrying #' + times);
//         retryOperation(operationFunc);
//       } else {
//         console.log('Operation failed');
//       }
//     });
// }

// // Example usage:
// retryOperation(
//   () =>
//     new Promise((resolve, reject) =>
//       Math.random() > 0.33
//         ? resolve("Success!")
//         : reject(new Error("Fail!"))
//     )
// );

// function mockAsyncOp() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve("Operation succeeded");
//       } else {
//         reject("Operation failed");
//       }
//     }, 1000);
//   });
// }

// mockAsyncOp()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => {
//     console.log('Operation attempted');
//   });


function loadData() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Data loaded");
    } else {
      reject("Network error");
    }
  });
}

loadData()
  .catch((message) => {
    console.error(message);
    return 'Using cached data';
  })
  .then(console.log);