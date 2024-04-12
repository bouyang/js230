function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Operation successful");
    } else {
      reject("Operation failed");
    }
  });
}

// function loadData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve("Data loaded");
//       } else {
//         reject("Network error");
//       }
//     }, 1000);
//   });
// }

// Promise.all([flakyService(), loadData()])
//   .then(console.log)
//   .catch(() => console.error('One or more operations failed'));

// const firstResource = new Promise((resolve) =>
//   setTimeout(() => resolve("First resource loaded"), 500)
// );
// const secondResource = new Promise((resolve) =>
//   setTimeout(() => resolve("Second resource loaded"), 1000)
// );

// Promise.race([firstResource, secondResource]).then(console.log);

// const services = [flakyService(), flakyService(), flakyService()];

// Promise.allSettled(services).then((result) => {
//   result.forEach(ele => console.log(ele.status));
// });

// function loadData() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // loadData always resolves this time
//       resolve("Data loaded");
//     }, 1000);
//   });
// }

// const primaryOperation = flakyService();
// const fallbackOperation = loadData();

// Promise.any([primaryOperation, fallbackOperation]).then(console.log);

function loadMultipleResources(urlArr) {
  let resultArr = urlArr.map(url =>
    fetch(url)
      .then((response) => response.json())
      .catch(() => 'Failed to fetch')
  );
  return Promise.allSettled(resultArr);
}


loadMultipleResources([
  "https://jsonplaceholder.typicode.com/todos/1",
  "invalidUrl",
]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Fetched data:", result.value);
    } else {
      console.error(result.reason);
    }
  });
});

// Fetched data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false }
// Fetched data: Failed to fetch