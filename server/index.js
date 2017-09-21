"use strict";

// Express setup:
const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// MongoDB setup:
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  const server = app.listen(PORT, () => {
    console.log("Tweeter listening on port " + PORT);
  });

  // Close database and server on exiting
  process.on('SIGINT', () => {
    server.close();
    db.close();
    console.log('Tweeter exiting');
    process.exit(0);
  });
});

