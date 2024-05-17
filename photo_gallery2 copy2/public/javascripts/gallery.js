// let request = new XMLHttpRequest();
// request.open('GET', '/photos');
// request.responseType = 'json';

// request.addEventListener('load', event => {
//   let data = request.response;
//   let photosTemplate = Handlebars.compile($('#photos').html());
//   let comments;

//   let slides = document.querySelector('#slides');
//   slides.insertAdjacentHTML('beforeend', (photosTemplate({photos: photosTemplate})));
  

//   let photoInformation = Handlebars.compile($('#photo_information').html());
//   let firstPhoto = document.querySelector('section > header');
//   firstPhoto.insertAdjacentHTML('beforeend', photoInformation({info: photoInformation}));

//   fetch('/comments?photo_id=1')
//     .then(response => response.json())
//     .then(commentJSON => {
//       renderComments(commentJSON);
//     });

//   Handlebars.registerPartial('photo_comment', $('#photo_comment').html());

//   function renderComments(commentJSON) {
//     let commentsTemplate = Handlebars.compile($('#photo_comments').html());
//     let commentsSection = document.querySelector('#comments ul')
//     commentsSection.insertAdjacentHTML('beforeend', commentsTemplate({comments: commentJSON}));
//   }
// });

// request.send();

document.addEventListener('DOMContentLoaded', event => {
  const templates = {};
  let photos;

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
    templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
  });

  document.querySelectorAll("[data-type=partial]").forEach(tmpl => {
    Handlebars.registerPartial(tmpl["id"], tmpl["innerHTML"]);
  });

  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id);
      slideshow.init();
  });

  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos }));
  }

  function renderPhotoInformation(idx) {
    let photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];
    let header = document.querySelector("section > header");
    header.innerHTML = '';
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }

  function getCommentsFor(idx) {
    fetch("/comments?photo_id=" + idx)
      .then(response => response.json())
      .then(comment_json => {
        let comment_list = document.querySelector("#comments ul");
        comment_list.innerHTML = '';
        comment_list.insertAdjacentHTML('beforeend', templates.photo_comments({ comments: comment_json }));
    });
  }

  document.querySelector("section > header").addEventListener("click", function(e) {
    e.preventDefault();
    let button = e.target;
    let buttonType = button.getAttribute("data-property");
    if (buttonType) {
      let href = button.getAttribute("href");
      let dataId = button.getAttribute("data-id");
      let text = button.textContent;
  
      fetch(href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: 'photo_id=' + dataId
      })
      .then(response => response.json())
      .then(json => {
        button.textContent = text.replace(/\d+/, json.total);
        fetch("/photos")
          .then(response => response.json())
          .then(json => photos = json);
      });
    }
  });

  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    let form = event.target;
    let href = form.getAttribute('action');
    let formData = new FormData(form);
    console.log(formData);

    let data = new URLSearchParams([...formData]);
    console.log(data);

    fetch(href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: data,
    })
    .then(response => response.json())
    .then(json => {
      let commentsList = document.querySelector('#comments ul');
      commentsList.insertAdjacentHTML('beforeend', templates.photo_comment(json));
      form.reset();
    });
  });


  const slideshow = {
    prevSlide: function(e) {
      e.preventDefault();
      let prev = this.currentSlide.previousElementSibling;
      if (!prev) {
        prev = this.lastSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(prev);
      this.renderPhotoContent(prev.getAttribute("data-id"));
      this.currentSlide = prev;
    },
    nextSlide: function(e) {
      e.preventDefault();
      let next = this.currentSlide.nextElementSibling;
      if (!next) {
        next = this.firstSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(next);
      this.renderPhotoContent(next.getAttribute("data-id"));
      this.currentSlide = next;
    },
    fadeOut: function(slide) {
      slide.classList.add('hide');
      slide.classList.remove('show');
    },
    fadeIn: function(slide) {
      slide.classList.remove('hide');
      slide.classList.add('show');
    },
    renderPhotoContent: function(idx) {
      renderPhotoInformation(Number(idx));
      getCommentsFor(idx);
    },
    bind: function() {
      let prevButton = this.slideshow.querySelector("a.prev");
      let nextButton = this.slideshow.querySelector("a.next");
      prevButton.addEventListener("click", (e) => { this.prevSlide(e) });
      nextButton.addEventListener("click", (e) => { this.nextSlide(e) });
    },
    init: function() {
      this.slideshow = document.querySelector("#slideshow");
      let slides = this.slideshow.querySelectorAll('figure');
      this.firstSlide = slides[0];
      this.lastSlide = slides[slides.length -1];
      this.currentSlide = this.firstSlide;
      this.bind();
    }
  };
});