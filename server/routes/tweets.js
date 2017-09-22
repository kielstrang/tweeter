"use strict";

const userHelper = require("../lib/util/user-helper");

const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if(err) return res.status(500).json({ error: err.message });

      res.json(tweets);
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if(!req.body.text) return res.status(400).json({ error: 'invalid request: no data in POST body' });

    DataHelpers.validateLogin(req.body.handle, req.body.password, function(err, isValidLogin) {
      if(err) return res.status(500).json({ error: err.message });
      if(!isValidLogin) return res.status(401).json({error: 'Invalid login'});

      DataHelpers.getUserDetails(req.body.handle, function(err, user) {
        if(err) return res.status(500).json({ error: err.message });

        const tweet = {
          user: user,
          content: {
            text: req.body.text
          },
          created_at: Date.now()
        };

        DataHelpers.saveTweet(tweet, (err) => {
          if(err) return res.status(500).json({ error: err.message });

          res.status(201).send();
        });
      });
    });
  });

  return tweetsRoutes;

};
