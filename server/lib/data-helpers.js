"use strict";

module.exports = function makeDataHelpers(db) {
  return {

    // Save a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      const tweets = db.collection('tweets').find().sort({created_at: 1}).toArray(callback);
    }
  };
};
