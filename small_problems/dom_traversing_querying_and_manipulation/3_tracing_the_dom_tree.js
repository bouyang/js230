let result = [];

function domTreeTracer(id) {
  let current = document.getElementById(id);

  while (current.id !== '1') {
    let siblingsArr = [];
    let parent = current.parentNode;
    let siblings = parent.children;

    for (let i = 0; i < siblings.length; i += 1) {
      siblingsArr.push(siblings[i].nodeName);
    }

    result.push(siblingsArr);
    current = current.parentNode;
  }

  result.push(current.nodeName);
  return result;
}

// console.log(domTreeTracer(1));
// console.log(domTreeTracer(2));
console.log(domTreeTracer(22));