var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var arview = new Schema({
    restaurant_id: Number,
    category_id: String,
    category_name: String,
    item_id: String,
    item_name: String,
    time: Date,
    timestamp: String,
    arview: Boolean
})

var ARViews = mongoose.model('arviews', arview);
module.exports = ARViews;