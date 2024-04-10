function nodeSwap(first, second) {
  let node1 = document.getElementById(first);
  let node2 = document.getElementById(second);

  if (!node1 || ! node2) return undefined;

  let node1copy = node1.cloneNode(true);
  let node2copy = node2.cloneNode(true);

  if (isInvalid(node1, node2)) return undefined;

  node2.parentNode.replaceChild(node1copy, node2);
  node1.parentNode.replaceChild(node2copy, node1);

  return true;
}

function isInvalid(node1, node2) {
  let children1 = node1.children;
  let children2 = node2.children;

  for (let i = 0; i < children1.length; i += 1) {
    if (children1[i] === node2) return true;
  }

  for (let j = 0; j < children2.length; j += 1) {
    if (children2[j] === node1) return true;
  }

  return false;
}

// console.log(nodeSwap(1, 2));
// console.log(nodeSwap(1, 20));
// console.log(nodeSwap(3, 1));
console.log(nodeSwap(7, 9));
// console.log(nodeSwap(1, 4));
// console.log(nodeSwap(9, 3));