const mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    item_name: String,
    item_price: Number,
    item_description: String,
    item_image: String,
    item_type: String,
    ar: Boolean,
    ar_model: String,
    live: Boolean,
    vegan: Boolean,
    gluten_free: Boolean,
    best_seller: Boolean,
    chefs_special: Boolean,
    seasonal: Boolean,
    jain: Boolean
});

var categorySchema = mongoose.Schema({
    category_name: String,
    live: Boolean,
    items: [itemSchema]
});

var restaurant = mongoose.Schema({
    id: Number,
    password: String,
    name: String,
    location: String,
    cusine: String,
    image: String,
    cost_for_two: Number,
    live: Boolean,
    ar: Boolean,
    feedback: Boolean,
    payments: Boolean,
    payment_gateway_percentage: Number,
    creation_time: Date,
    creation_timestamp: String,
    categories: [categorySchema],
});

var Restaurants = mongoose.model('restaurants', restaurant);
module.exports = Restaurants;