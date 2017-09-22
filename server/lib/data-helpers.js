"use strict";

const md5 = require('md5');

module.exports = function makeDataHelpers(db) {
  return {

    // Save a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const tweets = db.collection('tweets').find().sort({created_at: 1}).toArray(callback);
    },

    // Check if a handle/password login combination is valid
    isValidLogin: function(handle, password, callback) {
      const user = db.collection('users').find({handle, password}).limit(1).count(callback);
    }
  };
};
