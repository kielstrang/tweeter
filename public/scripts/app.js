const past = 3;
const now = new Date();

const future = new Date().setDate(now.getDate() + 1);
const secondsAgo = new Date().setSeconds(now.getSeconds() - past);
const minutesAgo = new Date().setMinutes(now.getMinutes() - past);
const hoursAgo = new Date().setHours(now.getHours() - past);
const daysAgo = new Date().setDate(now.getDate() - past);
const monthsAgo = new Date().setMonth(now.getMonth() - past);
const yearsAgo = new Date().setFullYear(now.getFullYear() - past);

const tweetData = {
  0: {
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
    "created_at": future
  },
  1: {
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
    "created_at": secondsAgo
  },
  2: {
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
    "created_at": minutesAgo
  },
  3: {
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
    "created_at": hoursAgo
  },
  4: {
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
    "created_at": daysAgo
  },
  5: {
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
    "created_at": monthsAgo
  },
  6: {
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
    "created_at": yearsAgo
  },
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