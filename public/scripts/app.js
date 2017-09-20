const tweetData = {
  0: {
    "user": {
      "name": "<script>alert('username XSS!');</script>",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "<script>alert('handle XSS!');</script>"
    },
    "content": {
      "text": "<script>alert('text XSS!');</script>"
    },
    "created_at": new Date()
  }
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


$(function() {
  for(tweetID in tweetData){
    const $tweet = createTweetElement(tweetData[tweetID]);
    $('#tweets-container').append($tweet);
  }
});