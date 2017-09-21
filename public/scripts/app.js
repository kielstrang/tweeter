"use strict";

const MAX_TWEET_LENGTH = 140;

$(function() {
  const newTweetSection = $('#new-tweet');
  const newTweetInput = newTweetSection.find('textarea');

  const loginSection = $('#login');

  function createTweetElement(tweet) {
    const $tweet = $('<article>').addClass('tweet')
      .append(
        $('<header>')
          .append(
            $('<div>').addClass('tweet-avatar')
              .append($('<img>').attr('src', tweet.user.avatars.regular).attr('alt', tweet.user.handle))
          )
          .append(
            $('<div>').addClass('tweet-user')
              .append($('<span>').addClass('tweet-name').text(tweet.user.name))
              .append($('<span>').addClass('tweet-handle').text(tweet.user.handle))
          )
      )
      .append($('<div>').addClass('tweet-body').text(tweet.content.text))
      .append(
        $('<footer>')
          .append(
            $('<span>').addClass('tweet-time').text(moment(tweet.created_at).fromNow())
          )
          .append(
            $('<div>').addClass('tweet-icons')
              .append($('<img>').attr('src', '/images/icons/flag.svg').attr('alt', 'Flag'))
              .append($('<img>').attr('src', '/images/icons/retweet.svg').attr('alt', 'Retweet'))
              .append($('<img>').attr('src', '/images/icons/heart.svg').attr('alt', 'Heart'))
          )
      );
    return $tweet;
  }

  function renderTweets(tweets) {
    const tweetsContainer = $('#tweets-container');
    tweetsContainer.empty();
    for(const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      tweetsContainer.prepend($tweet);
    }
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(response) {
        renderTweets(response);
      }
    });
  }

  function saveTweet() {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: newTweetSection.find('form').serialize(),
      success: function() {
        newTweetSection.slideUp('fast');
        newTweetInput.val('');
        $('#tweet-counter').text(MAX_TWEET_LENGTH);
        loadTweets();
      }
    });
  }

  function validateTweet() {
    const tweet = newTweetInput.val();
    if(!tweet) return 'No tweet!';
    if(tweet.length > MAX_TWEET_LENGTH) return 'Tweet too long!';
    return '';
  }

  function submitTweet() {
    const tweetError = $('#tweet-error');
    const err = validateTweet();
    if(err) {
      tweetError.text(err);
    } else {
      tweetError.empty();
      saveTweet();
    }
  }

  loadTweets();

  newTweetSection.find('form').on('submit', function(event) {
    event.preventDefault();
    submitTweet();
  });

  newTweetInput.on('keypress', function(event) {
    if(event.key === 'Enter' && !event.shiftKey) {
      newTweetSection.find('form').submit();
    }
  });

  $('#compose-btn').on('click', function() {
    newTweetSection.slideToggle('fast', function() {
      if(!newTweetSection.is(':hidden')) {
        window.scrollTo(0,0);
        newTweetInput.focus();
      }
    });
  });

  $('#login-btn').on('click', function() {
    loginSection.slideToggle('fast', function() {
      if(!loginSection.is(':hidden')) {
        window.scrollTo(0,0);
        $('#username').focus();
      }
    });
  });
});