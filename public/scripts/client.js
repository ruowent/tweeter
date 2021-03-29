// Create dynamic HTML code for the tweets and return the content
const createTweetElement = (data) => {
  const $article = $('<article>', {
    class: 'tweet'
  });

  const $header = $('<header>').appendTo($article);

  const $div = $('<div>').appendTo($header);

  $('<img>', {
    attr: { 
      src: data.user.avatars, 
      alt: 'avatar' }
  }).appendTo($div);

  $('<label>', {
    text: data.user.name
  }).appendTo($div);

  $('<span>', {
    text: data.user.handle
  }).appendTo($header);

  const $p = $('<p>', {
    text: data.content.text
  }).appendTo($article);

  const $footer = $('<footer>').appendTo($article);
  
  $('<div>', {
    class: 'date',
    text: moment(moment(data.created_at).format()).fromNow()
  }).appendTo($footer);

  const $divIcons = $('<div>', {
    class: 'icons' 
  }).appendTo($footer);
      
  $('<i>', {
    class: 'fas fa-flag',
  }).appendTo($divIcons);
    
  $('<i>', {
    class: 'fas fa-retweet',
  }).appendTo($divIcons);
  
  $('<i>',{
    class: 'fas fa-heart',
  }).appendTo($divIcons);

  return $article;
};

// loop through tweets, call createTweetElement then return value and prepend to the tweets container
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

// use AJAX GET request to preload tweets
const loadTweets = () => {
  $.ajax({
    url:'/tweets',
    method: 'get',
    dataType: 'json'
  })
  .then(function(res){
    renderTweets(res);
  })
  .catch(function(err, xhr) {
    console.log(err, xhr);
  });
}

// Clear user input and reset letter counter after clicking button
const resetForm = (form) => {
  clearError();
  form.trigger('reset');
  form.parent().find('output.counter').text(140);
};

// Validate form data and return error message
const validateForm = (form) => {
  const textarea = $(form).find('textarea');
  const counter = Number($(form).find('output.counter').text());

  if (counter < 0) {
    return '⚠️  Tweet is over 140 characters  ⚠️ '
  } else if (!textarea.val()) {
    return '⚠️  Tweet is empty  ⚠️ '
  }
};

// Display error message
const displayError = (error) => {
  $('.hidden-error').slideUp('slow', () => {  
    const $errMsg = $('.error-container p');
    const style = {
      color: 'red',
      border: 'solid',
      padding: '.5em',
    }

    $errMsg.text(error);
    $errMsg.css(style);

    $('.hidden-error').slideDown();
  });
};

// Clear error section
const clearError = () => {
  $('.hidden-error').slideUp();
};

// After html code is fully loaded, call functions to load the tweets and submit new tweets
$(document).ready(() => {
  // Preload tweets
  loadTweets();

  // When down arrow on the nav bar is clicked, show or hide new tweet section
  $('#compose a').on('click', function(e) {
    const newTweet = $('section.new-tweet');
    const textarea = newTweet.find('textarea');
    newTweet.slideToggle('slow', function(){
      textarea.focus();
    });
  })

  // Post action after submit button is clicked
  $('section.new-tweet button[type=submit]').on('click', (event) => {
    event.preventDefault();
    const form = $(event.target).parent().parent();
    const error = validateForm(form);

    if (error) {
      return displayError(error);
    }

    $.ajax({
      url: '/tweets',
      method: 'post',
      data: form.serialize()
    })
    .then(res => {
      loadTweets(res);
      resetForm(form);
    })
    .catch(err => console.log(err))
  })
});
