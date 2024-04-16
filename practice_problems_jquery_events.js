$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    $key = $(this).find("input[type='text']").val();

    $(document).off('keypress').on('keypress', function(e) {
      if (e.key !== $key) {
        return;
      }
    
      $('a').trigger('click');
    });
  });


  $('a').on('click', function(e) {
    e.preventDefault();

    $('#accordion').slideToggle();
  });
});