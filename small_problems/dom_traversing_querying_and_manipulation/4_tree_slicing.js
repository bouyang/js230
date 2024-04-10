

function sliceTree(start, end) {
  let result = [];
  if (document.getElementById(start) === null || document.getElementById(end) === null) {
    return undefined;
  }

  let current = document.getElementById(end);
  
  while (current !== null && current.id !== String(start)) {
    result.unshift(current.nodeName);

    if (current.nodeName === 'HTML') {
      return undefined;
    }

    current = current.parentNode;
  }

  result.unshift(current.nodeName);

  // if (!result.includes('BODY')) {
  //   return undefined;
  // }
  return result;
}

console.log(sliceTree(1, 4));
console.log(sliceTree(2, 5));
console.log(sliceTree(1, 76));
console.log(sliceTree(1, 23));
console.log(sliceTree(1, 22));
console.log(sliceTree(11, 19));