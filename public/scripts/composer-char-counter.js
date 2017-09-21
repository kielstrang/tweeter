"use strict";

$(function() {
  const counter = $('#tweet-counter');

  $('#new-tweet').find('textarea').on('input', function() {
    const tweetLength = $(this).val().length;
    counter.text(MAX_TWEET_LENGTH - tweetLength);
    if(tweetLength > MAX_TWEET_LENGTH) {
      counter.addClass('tweet-too-long');
    } else {
      counter.removeClass('tweet-too-long');
    }
  });
});