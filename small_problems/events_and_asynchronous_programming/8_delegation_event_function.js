function delegateEvent(parentElement, selector, eventType, callback) {
  parentElement.addEventListener(eventType, event => {
    if (selector.split(' ').includes((event.target.tagName).toLowerCase())) {
      callback(event);
    }
  })
}


// Possible elements for use with the scenarios
const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

// Possible callback for use with the scenarios
const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

// delegateEvent(element3, 'aside p', 'click', callback);

delegateEvent(element2, 'p', 'click', callback);

const newP = document.createElement('P');
const newContent = document.createTextNode('New Paragraph');
newP.appendChild(newContent);

element2.appendChild(newP);