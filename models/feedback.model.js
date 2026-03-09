var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedback = new Schema({
    order: String,
    food_quality: String,
    service_quality: String,
    ambience_and_decor: String,
    suggestions: String,
    payment_id: String,
    amount: Number,
    user_name: String,
    user_phone: String,
    user_email: String,
    user_address: String,
    restaurant_id: Number,
    restaurant_name: String,
    restaurant_location: String,
    time: Date,
    timestamp: String
})

var Feedbacks = mongoose.model('feedbacks', feedback);
module.exports = Feedbacks;