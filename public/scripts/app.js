const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


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
  for(tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}


$(function() {
  renderTweets(tweetData);
});