"use strict";

const userHelper = require("../lib/util/user-helper");

const express = require('express');
const usersRoutes = express.Router();

module.exports = function(DataHelpers) {

  usersRoutes.post("/login", function(req, res) {
    const { handle, password } = req.body;
    DataHelpers.validateLogin(handle, password, (err, isValidLogin) => {
      if(err) return res.status(500).json({ error: err.message });
      if(!isValidLogin) return res.status(401).json({error: "Invalid handle or password"});

      req.session.handle = handle;
      res.status(200).send();
    });
  });

  usersRoutes.post("/new", function(req, res) {
    const { name, handle, password } = req.body;
    DataHelpers.checkHandleAvailable(handle, (err, isAvailable) => {
      if(err) return res.status(500).json({ error: err.message });
      if(!(handle && name && password)) {
        return res.status(400).json({error: "Missing registration field"});
      }
      if(!isAvailable) return res.status(400).json({error: "Handle already in use"});

      const user = { name, handle, password };
      user.avatars = userHelper.generateUserAvatars(handle);
      DataHelpers.createUser(user, (err) => {
        if(err) return res.status(500).json({ error: err.message });

        req.session.handle = handle;
        res.status(201).send();
      });
    });
  });

  return usersRoutes;
};
