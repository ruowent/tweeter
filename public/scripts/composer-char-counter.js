$(document).ready( () => {

  // Detects keyup event then calculate the remaining characters. Add a css class on counter when exceeding the length
  $('section.new-tweet textarea').on('keyup', function() {
    const maxLength = 140;
    const inputLength = $(this).val().length;
    const counter = $(this).parent().find('output.counter');

    if (maxLength - inputLength < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');  
    }
    counter.text(maxLength - inputLength); 
  });
})
