"use strict";

const userHelper = require("../lib/util/user-helper");

const express = require('express');
const usersRoutes = express.Router();

module.exports = function(DataHelpers) {

  usersRoutes.post("/login", function(req, res) {
    console.log(req.body);
    DataHelpers.validateLogin(req.body.handle, req.body.password, (err, isValidLogin) => {
      if(err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({isValidLogin});
      }

    });
  });

  usersRoutes.post("/new", function(req, res) {
    // const user = {
    //   name: req.body.name,
    //   handle: req.body.handle,
    //   password: req.body.password,
    //   avatars: userHelper.generateUserAvatars(req.body.handle)
    // };
  });

  return usersRoutes;

};
