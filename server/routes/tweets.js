"use strict";

const userHelper = require("../lib/util/user-helper");

const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if(err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if(!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    DataHelpers.validateLogin(req.body.handle, req.body.password, function(err, isValidLogin) {
      if(err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if(isValidLogin) {
        DataHelpers.getUserDetails(req.body.handle, function(err, user) {
          if(err) {
            res.status(500).json({ error: err.message });
            return;
          }

          const tweet = {
            user: user,
            content: {
              text: req.body.text
            },
            created_at: Date.now()
          };

          DataHelpers.saveTweet(tweet, (err) => {
            console.log(tweet);
            if(err) {
              res.status(500).json({ error: err.message });
            } else {
              res.status(201).send();
            }
          });
        });
      } else {
        console.log(`User: ${req.body.handle} Password: ${req.body.password}`);
        res.status(401).send();
      }
    });
  });

  return tweetsRoutes;

};
