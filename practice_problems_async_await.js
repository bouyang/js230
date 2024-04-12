// function downloadFilePromise() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Download complete!");
//     }, 1500);
//   });
// }

// async function asyncDownloadFile() {
//   console.log('Downloading file...');
//   let result = await downloadFilePromise();
//   console.log(result);
// }

// asyncDownloadFile();


// async function loadData() {
//   await new Promise((resolve, reject) => {
//     if (Math.random() > 0.5) {
//       resolve("Operation successful");
//     } else {
//       reject("Operation failed");
//     }
//   })
//     .then(console.log)
//     .catch(console.error);
//   console.log('Done');
// }

// loadData();

// async function fetchResource(url) {
//   try {
//     let response = await fetch(url);
//     let message = await response.json();
//     console.log(message);
//   } catch (error) {
//     console.error("Failed to load resource");
//   } finally {
//     console.log("Resource fetch attempt made");
//   }
// }

// // Example usage:
// fetchResource("https://jsonplaceholder.typicode.com/todos/1");
// // Logs fetched data, then "Resource fetch attempt made"
// // On error, logs "Failed to load resource", then "Resource fetch attempt made"

async function fetchUserProfile(userId) {
  try {
    const userProfile = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    ).then((res) => res.json());
    console.log("User Profile", userProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }

  try {
    const userPosts = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    ).then((res) => res.json());
    console.log("User Posts", userPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  try {
    const userTodos = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    ).then(res => res.json());

    console.log("User Todos", userTodos);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

// Example usage:
fetchUserProfile(1);
// Logs user profile, posts, and todos. Catches and logs errors at each step if they occur.