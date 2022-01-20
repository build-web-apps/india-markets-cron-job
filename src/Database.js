const NewsSchema = require("../models/news");

class Database {
  static dump(news) {
    return new Promise((resolve, reject) => {
      NewsSchema.collection.insertMany(news, (err, docs) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve("%d news were saved", news.length);
        }
      });
    });
  }
}

module.exports = Database;
