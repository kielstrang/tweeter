const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

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
          $('<span>').addClass('tweet-time').text('2 days ago')
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


$(function() {
  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('#tweets-container').append($tweet);
});