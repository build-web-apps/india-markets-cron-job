const request = require("request");
class ScrapWorker {
    static html(URI) {
        return new Promise((req, res) => { request(
            URI,
            {
              timeout: 5000,
            },
            (error, response, body) => {
              if (!error) {
                req(body);
              }
            }
          )});
    }
}

module.exports = ScrapWorker;