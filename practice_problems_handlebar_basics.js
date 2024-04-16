let post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
};

Handlebars.registerPartial('tag', $('#tag').html());

$(() => {
  let postTemplate = Handlebars.compile($('#post').html());

  post.body = '<h3>' + post.body + '</h3>';
  post.tags = ['abc', '123', 'xyz'];
  let posts = [post];

  posts.push({
    title: 'ABC',
    published: 'Jan 1 2020',
    body: 'Hello world',
  });

  $('body').append(postTemplate({items: posts}));
});
