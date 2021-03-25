$(document).ready(function() {
  // --- our code goes here ---
  console.log('ready this', this)
  $("textarea").on('blur', function() {
    console.log('blur',this);
  })
  $("textarea").on('keydown', function() {
    console.log('keydown',this);
  })
  // $("textarea").on('keyup', function() {
  //   console.log('keyup',this);
  // })
  $("textarea").on('keypress', function() {
    console.log('keypress',this);
  })
  $("textarea").on('change', function() {
    console.log('change',this);
  })
  $("textarea").on('input', function(event) {
    console.log('input',event.val());
  })

  $("textarea").on('input', () => {
    const text = $("#tweet-text:eq").val();
    console.log('input',text);
  })


});

