const createTweetElement = function(data) {

  const $article = $('<article>');

  const $div = $('<div>', {
    class: 'header'
  }).appendTo($article);

  $('<img>', {
    attr: { 
      src: data.user.avatars, 
      alt: 'avatar' }
  }).appendTo($div);

  $('<h4>', {
    text: data.user.name
  }).appendTo($div);

  $('<span>', {
    text: data.user.handle
  }).appendTo($div);

  const $p = $('<p>', {
    text: data.content.text
  }).appendTo($article);

  const $footer = $('<footer>');
  
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

}

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.