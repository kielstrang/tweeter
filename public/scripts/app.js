"use strict";

const MAX_TWEET_LENGTH = 140;

$(function() {
  const newTweetSection = $('#new-tweet');
  const newTweetInput = newTweetSection.find('textarea');
  const loginSection = $('#login');
  const registerSection = $('#register');
  const page = $('html');

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
      data: {
        text: newTweetInput.val(),
        handle: page.data('handle'),
        password: page.data('password')
      },
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

  function setLoggedInUser(handle, password) {
    $('.nav-logged-in').removeClass('hide');
    $('.nav-logged-out').addClass('hide');
    $('#header-username').text(handle);
    page.data('handle', handle);
    page.data('password', password);
  }

  function login(handle, password) {
    $.ajax({
      url: '/users/login',
      method: 'POST',
      data: { handle, password },
      success: (response) => {
        if(response.isValidLogin) {
          setLoggedInUser(handle, password);
          $('#login-error').text('');
          loginSection.slideUp('fast');
        } else {
          $('#login-error').text('Invalid handle or password!');
        }
      },
      error: (request, status, error) => {
        $('#login-error').text(JSON.parse(request.responseText).error);
      }
    });
  }

  function logout() {
    $('.nav-logged-in').addClass('hide');
    $('.nav-logged-out').removeClass('hide');
    $('#header-username').text('');
    page.removeData('handle');
    page.removeData('password');
  }

  function register(name, handle, password) {
    $.ajax({
      url: '/users/new',
      method: 'POST',
      data: { name, handle, password },
      success: (response) => {
        setLoggedInUser(handle, password);
        $('#register-error').text('');
      },
      error: (request, status, error) => {
        $('#register-error').text(JSON.parse(request.responseText).error);
      }
    });
  }

  loadTweets();

  newTweetSection.find('form').on('submit', function(event) {
    event.preventDefault();
    submitTweet();
  });

  loginSection.find('form').on('submit', function(event) {
    event.preventDefault();

    login(loginSection.find('form').find('.handle').val(), loginSection.find('form').find('.password').val());
  });

  registerSection.find('form').on('submit', function(event) {
    event.preventDefault();
    register($(this).find('.name').val(), $(this).find('.handle').val(), $(this).find('.password').val());
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
    registerSection.slideUp('fast');
    loginSection.slideToggle('fast', function() {
      if(!loginSection.is(':hidden')) {
        window.scrollTo(0,0);
        $(this).find('.username').focus();
      }
    });
  });

  $('#register-btn').on('click', function() {
    loginSection.slideUp('fast');
    registerSection.slideToggle('fast', function() {
      if(!registerSection.is(':hidden')) {
        window.scrollTo(0,0);
        $(this).find('.username').focus();
      }
    });
  });

  $('#logout-btn').on('click', function () {
    logout();
  });
});