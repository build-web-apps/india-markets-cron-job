const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
        type: String
    },
    href: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Number,
    },
    feed: {
        type: String
    }
});

module.exports = mongoose.model('news', NewsSchema);