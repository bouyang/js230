function colorGeneration(num) {
  let genLevel = 1;
  let currentLevel = document.getElementById(num);
  let sameGen = [];

  while (currentLevel.id !== '1') {
    genLevel += 1;
    currentLevel = currentLevel.parentNode;
  }

  let parents = [document.body];
  let elements;

  for (let i = 1; i <= genLevel; i += 1) {
    elements = getAllChildrenOf(parents);
    parents = elements;
  }

  elements.forEach(element => {
    element.classList.add('generation-color');
  })
}

function getAllChildrenOf(parents) {
  return parents.map(({children}) => Array.prototype.slice
                                                    .call(children))
                                                    .reduce((collection, children) => collection.concat(children), []);
}

colorGeneration(7);