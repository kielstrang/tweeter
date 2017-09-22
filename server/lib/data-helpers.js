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
      db.collection('tweets').find().sort({created_at: 1}).toArray(callback);
    },

    // Check if a handle/password login combination is valid
    validateLogin: function(handle, password, callback) {
      db.collection('users').find({handle, password}).limit(1).count(callback);
    },

    // Get a user's name and avatar
    getUserDetails: function(handle, callback) {
      db.collection('users').find({handle}, {_id: 0, password: 0}).limit(1).toArray((err, arr) => {
        callback(err, arr[0]);
      });
    }
  };
};
