
const MAX_TWEET_LENGTH = 140;

$(function() {

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
    $('#tweets-container').empty();
    for(tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
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
    $('#new-tweet').slideUp('fast');
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: {
        text: $('#new-tweet').find('textarea').val()
      },
      success: function() {
        $('#new-tweet').find('textarea').val('');
        loadTweets();
      }
    });
  }

  function validateTweet() {
    const tweet = $('#new-tweet').find('textarea').val();
    if(!tweet) return 'No tweet!';
    if(tweet.length > MAX_TWEET_LENGTH) return 'Tweet too long!';

    $('#tweet-error').empty();
    return '';
  }

  function submitTweet() {
    if(err = validateTweet()) {
      $('#tweet-error').text(err);
    } else {
      saveTweet();
    }
  }

  loadTweets();

  $('#new-tweet input').on('click', function(event) {
    event.preventDefault();
    submitTweet();
  });

  $('#new-tweet').find('textarea').on('keypress', function(e) {
    if(e.which == 13 && !e.shiftKey) {
      submitTweet();
      e.preventDefault();
      return false;
    }
  });

  $('.compose').on('click', function() {
    $('#new-tweet').slideToggle('fast', function() {
      $('#new-tweet').find('textarea').focus();
    });
  });
});