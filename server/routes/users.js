"use strict";

const userHelper = require("../lib/util/user-helper");

const express = require('express');
const usersRoutes = express.Router();

module.exports = function(DataHelpers) {

  usersRoutes.post("/login", function(req, res) {
    DataHelpers.validateLogin(req.body.handle, req.body.password, (err, isValidLogin) => {
      if(err) return res.status(500).json({ error: err.message });

      res.json({isValidLogin});
    });
  });

  usersRoutes.post("/new", function(req, res) {
    console.log(req.body);
    DataHelpers.checkHandleAvailable(req.body.handle, (err, isAvailable) => {
      if(err) return res.status(500).json({ error: err.message });
      if(!(req.body.handle && req.body.name && req.body.password)) {
        return res.status(400).json({error: "Missing registration field"});
      }
      if(!isAvailable) return res.status(400).json({error: "Handle already in use"});

      const user = {
        name: req.body.name,
        handle: req.body.handle,
        password: req.body.password,
        avatars: userHelper.generateUserAvatars(req.body.handle)
      };
      DataHelpers.createUser(user, (err) => {
        if(err) return res.status(500).json({ error: err.message });

        res.status(201).send();
      });
    });
  });

  return usersRoutes;

};
