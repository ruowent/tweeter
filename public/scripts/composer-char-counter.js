$(document).ready( () => {
  const maxLength = 140;

  $('section.new-tweet textarea').on('keyup', function() {
    const inputLength = $(this).val().length;
    const counter = $(this).parent().find('output.counter');

    if (maxLength - inputLength < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');  
      counter.text(maxLength - inputLength); 
    }
  });
})
