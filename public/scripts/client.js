// Create dynamic HTML code for the tweets and return the content
const createTweetElement = function(data) {
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
    text: Date(data.created_at * 1000).substr(0, 25)
  }).appendTo($footer);
    
  $('<div>', {
    class: 'icons' 
  }).appendTo($footer);
      
    // $('<i>', {
    //   class: 'fa fa-flag',
    //   attr: { 'aria-hidden': 'true' }
    // }).appendTo($div);
      
    // $('<i>', {
    //   class: 'fa fa-retweet',
    //   attr: { 'aria-hidden': 'true' }
    // }).appendTo($div);
    
    // $('<i>',{
    //   class: ( data.likes === 0 ) ? "fa fa-heart-o" : "fa fa-heart",
    //   attr: { 'aria-hidden': 'true' }
    // }).appendTo($div);

  return $article;
};

// loop through tweets, call createTweetElement then return value and append it to the tweets container
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

// use AJAX GET request to preload tweets
const loadTweets = function() {
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

function resetForm(form) {
  form.trigger('reset');
  form.parent().find('output.counter').text(140);
}

// After html code is fully loaded, call functions to load the tweets and submit new tweets
$(document).ready(() => {
  // Preload tweets
  loadTweets();
  
  // Post action after submit button is clicked
  $('section.new-tweet button[type=submit]').on('click', (event) => {
    event.preventDefault();
    const form = $(event.target).parent().parent();

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
