document.addEventListener('DOMContentLoaded', () => {

  const request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/photos');
  request.responseType = 'json';
  request.send();

  let photos = [];
  let comments = [];
  let currentId;

  let photosTemplate = Handlebars.compile(document.getElementById('photos').innerHTML);
  let photoInformationTemplate = Handlebars.compile(document.getElementById('photo_information').innerHTML);
  let photoCommentsTemplate = Handlebars.compile(document.getElementById('photo_comments').innerHTML);
  // let photo_comment = Handlebars.compile(document.getElementById('photo_comment').innerHTML);

  Handlebars.registerPartial('photo_comment', document.getElementById('photo_comment').innerHTML);

  request.addEventListener('load', event => {
    let response = request.response;

    response.forEach(ele => photos.push({id: ele.id,
                                        title: ele.title,
                                        src: ele.src,
                                        caption: ele.caption,
                                        created_at: ele.created_at,
                                        likes: ele.likes,
                                        favorites: ele.favorites}));

    currentId = photos[0].id;

    reset();

    renderPhotos(currentId);
    renderPhotoInformation(currentId);
    // getComments(currentId);
    getCommentsFor(currentId);

    // console.log(photos(result));
    
    // console.log(result);
  });

  function reset() {
    let header = document.querySelector('header');
    let slides = document.getElementById('slides');
    let commentsSection = document.querySelector('#comments ul'); 
    header.innerHTML = '';
    slides.innerHTML = '';
    commentsSection.innerHTML = '';
  }

  function renderPhotos(idx) {
    let photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', photosTemplate({photos: photo}));
  }

  function renderPhotoInformation(idx) {
    let photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];
    let header = document.querySelector("section > header");
    header.insertAdjacentHTML('beforeend', photoInformationTemplate(photo));
  }

  function getComments(id) {
    let request = new XMLHttpRequest();
    request.open('GET', "/comments?photo_id=" + id);
    request.responseType = 'json';
    request.send();

    request.addEventListener('load', event => {
      let response = request.response;

      response.forEach(ele => {
        comments.push({name: ele.name,
                        photo_id: ele.photo_id,
                        gravatar: ele.gravatar,
                        date: ele.date,
                        body: ele.body,
                        });
      });

      let commentsSection = document.querySelector('#comments ul');
      console.log(comments);
      console.log(photoCommentsTemplate({comments: comments}));
      commentsSection.insertAdjacentHTML('beforeend', photoCommentsTemplate({comments: comments}));
  });

}

function getCommentsFor(idx) {
  fetch("/comments?photo_id=" + idx)
    .then(response => response.json())
    .then(commentJson => {
      let commentList = document.querySelector("#comments ul");
      commentList.insertAdjacentHTML('beforeend', photoCommentsTemplate({ comments: commentJson }));
  });
}
  

  let prev = document.querySelector('.prev');
  let next = document.querySelector('.next');

  prev.addEventListener('click', event => {
    event.preventDefault();

    if (currentId === 1) {
      currentId = 3;
    } else {
      currentId -= 1;
    }

    reset();
    renderPhotos(currentId);
    renderPhotoInformation(currentId);
    getCommentsFor(currentId);
  })
});