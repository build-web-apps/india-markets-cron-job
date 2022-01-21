var HTMLParser = require("node-html-parser");
const RSSFeedFetcher = require("./RSSFeedFetcher");
const ScrapWorker = require("./ScrapWorker");

class Crawler {
    constructor() {
        this.activities = [{
            url: 'https://economictimes.indiatimes.com/rss.cms',
            identifier: '.rssList',
            base: 'https://economictimes.indiatimes.com'
        }]

        this.start();
        console.log('Inside Crawler');
    }

    start() {
        this.activities.forEach(activity => {
            this.scrap(activity.url, activity.identifier, activity.base)
        });
    }

    scrap(url, identifier, base) {
        const html = ScrapWorker.html(url).then(html => {
            const root = HTMLParser.parse(html);
            const items = root.querySelectorAll(identifier);
            items.forEach(item => {
                const anchors = item.querySelectorAll('a');
                anchors.forEach(anchor => {
                    let href = anchor.getAttribute('href');
                    if (href.indexOf(base) === -1) {
                        href = base + href;
                    }
                    new RSSFeedFetcher([{
                        url: href,
                        identifier: 'item'
                    }])
                })
            })
        });
    }
}

module.exports = Crawler;