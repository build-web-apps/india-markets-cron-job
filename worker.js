const NewsFetcher = require("./src/NewsFetcher");

console.log('***** CRON JOB STARTED *****', Date.now());

const mongoose = require('mongoose');
const Crawler = require("./src/Crawler");
require("dotenv/config");

const URI = process.env.DB_CONNECT;

mongoose.connect(URI)
  .then(client => {
    console.log('Connected to Cluster is successful');
  })
  .catch(error => console.error(error));


new NewsFetcher();
new Crawler();