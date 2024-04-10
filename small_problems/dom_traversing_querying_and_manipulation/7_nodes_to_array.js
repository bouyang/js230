function nodesToArr(node) {
  let childrenElements = node.children;
  if (childrenElements.length === 0) {
    return [node.tagName, []];
  }

  let childrenNodes = [];
  for (let i = 0; i < childrenElements.length; i += 1) {
    childrenNodes.push(nodesToArr(childrenElements[i]));
  }
  
  return [node.tagName, childrenNodes];
}

function nodesToArr2() {
  const nodesArray = ['BODY', formatNodes(Array.prototype.slice.call(document.body.children))];
  let currentParentNodes = nodesArray[1];

  while (anyChildren(currentParentNodes)) {
    currentParentNodes = getNextGenerationParents(currentParentNodes);
  }

  getNextGenerationParents(currentParentNodes);

  return nodesArray;
}

function getNextGenerationParents(currentParentNodes) {
  let newParentNodes = [];
  currentParentNodes.forEach((parentNode, index, parentNodes) => {
    parentNodes[index] = appendChildren(parentNode);
    if (parentNodes[index][1].length > 0) {
      newParentNodes = newParentNodes.concat(parentNodes[index][1]);
    }
  });

  return newParentNodes;
}

function anyChildren(parentNodes) {
  for (let i = 0; i < parentNodes.length; i += 1) {
    if (parentNodes[i][0].children.length > 0) {
      return true;
    }
  }

  return false;
}

function appendChildren(parentNode) {
  const children = formatNodes(Array.prototype.slice.call(parentNode[0].children));
  parentNode[0] = parentNode[0].tagName;
  parentNode.push(children);
  return parentNode;
}

function formatNodes(nodes) {
  return nodes.map(node => [node]);
}


console.log(nodesToArr(document.body));
console.log(nodesToArr2());