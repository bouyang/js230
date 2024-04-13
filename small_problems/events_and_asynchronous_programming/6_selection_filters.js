const linkedOptions = {
  classifications: {
    Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    Mammal: ['Bear', 'Whale'],
    Bird: ['Ostrich'],
    Classifications: ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  },
  animals: {
    Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Turtle: ['Vertebrate', 'Cold-blooded'],
    Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Salmon: ['Vertebrate', 'Cold-blooded'],
    Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
    Animals: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
  },
};

document.addEventListener('DOMContentLoaded', () => {
  let selection = document.querySelector('#animal-classifications');
  let animals = document.querySelector('#animals');

  selection.addEventListener('change', event => {
    let selectionVal = event.target.value;
    let animalsArr = linkedOptions.classifications[selectionVal];
    let animalsNode = animals.children;
    let remove = [];

    for (let i = 0; i < animalsNode.length; i += 1) {
      if (!animalsArr.includes(animalsNode[i].value)) {
        remove.push(animalsNode[i].value);
      }
    }

    remove.forEach(ele => {
      animals.querySelector(`option[value=${ele}]`).remove();
    })
  });

  animals.addEventListener('change', event => {
    let animalsVal = event.target.value;
    let classificationsArr = linkedOptions.animals[animalsVal];
    let classificationsNode = selection.children;
    let remove = [];

    for (let i = 0; i < classificationsNode.length; i += 1) {
      if (!classificationsArr.includes(classificationsNode[i].value)) {
        remove.push(classificationsNode[i].value);
      }
    }

    remove.forEach(ele => {
      selection.querySelector(`option[value=${ele}]`).remove();
    })
  })
  
  document.querySelector('#clear').addEventListener('click', event => {
    
  })
});