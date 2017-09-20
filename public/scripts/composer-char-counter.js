$(function() {
  $('.new-tweet textarea').on('keydown', function() {
    const tweetLength = $(this).val().length;
    const counter = $(this).siblings('.counter').first();

    counter.text(MAX_TWEET_LENGTH - tweetLength);
    if(tweetLength > MAX_TWEET_LENGTH) {
      counter.addClass('tweet-too-long');
    } else {
      counter.removeClass('tweet-too-long');
    }
  });
});