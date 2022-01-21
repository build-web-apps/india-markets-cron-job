var HTMLParser = require("node-html-parser");
const Database = require("./Database");
const NewsFetcher = require("./NewsFetcher");
const ScrapWorker = require("./ScrapWorker");

class RSSFeedFetcher extends NewsFetcher {
    constructor(activities) {
        super(activities);
    }

    scrap(url, identifier) {
        const html = ScrapWorker.html(url).then(html => {
            const root = HTMLParser.parse(html);
            const items = root.querySelectorAll(identifier);
            let data = {}, news = [];
            const category = root.querySelector('channel').querySelector('title').innerHTML;
            
            items.forEach((item) => {
                const itemString = item.toString();
                const link = itemString.split('<link>')[1];
                let href = '';
                if (itemString.indexOf('</link>') !== -1) {
                    href = link.split('</link')[0];
                } else {
                    href = link.split('.cms')[0] + '.cms';
                }

                const title = item.querySelector('title').innerHTML;
                const image = item.querySelector('image') && item.querySelector('image').innerHTML || "";
                const date = new Date(item.querySelector('pubdate').innerHTML);
                data = {
                    title,
                    href,
                    date,
                    image,
                    category
                };
                news.push(data);
            })
            Database.dump(news).then(data => console.log('Success')).catch('Error');
        });
    }
}

module.exports = RSSFeedFetcher;