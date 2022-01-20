var HTMLParser = require("node-html-parser");
const Database = require("./Database");
const ScrapWorker = require("./ScrapWorker");

class NewsFetcher {
    constructor() {
        this.activities = [{
            url: 'https://pulse.zerodha.com/',
            identifier: '#news .box.item'
        }]

        this.start();
    }

    start() {
        this.activities.forEach(activity => {
            this.scrap(activity.url, activity.identifier)
        });
    }

    scrap(url, identifier) {
        const html = ScrapWorker.html(url).then(html => {
            const root = HTMLParser.parse(html);
            const items = root.querySelectorAll(identifier);
            let data = {}, news = [];
            items.forEach(item => {
                const a = item.querySelector('a');
                const title = a.innerHTML;
                const href = a.getAttribute('href');
                const description = item.querySelector('.desc').innerHTML;
                const date = new Date(item.querySelector('.date').getAttribute('title'));
                const feed = item.querySelector('.feed').innerHTML;
                data = {
                    title,
                    href,
                    description,
                    date,
                    feed
                };
                news.push(data);
            })
            Database.dump(news).then(data => console.log('Success')).catch('Error');
        });
    }
}

module.exports = NewsFetcher;