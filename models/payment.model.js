const mongoose = require('mongoose');

var payment = mongoose.Schema({
    payment_id: Number,
    time: Date,
    timestamp: String,
    restaurant_id: Number,
    restaurant_name: String,
    restaurant_location: String,
    amount: Number,
    user_name: String,
    user_email: String,
    user_phone: String,
    bill_no: String,
    status: String,
    payment_time: Date,
    payment_timestamp: String,
    transaction_id: String,
    payment_method: String,
    payment_gateway_percentage: Number,
    payment_gateway_charge: Number,
    payment_gateway_charge_tax: Number,
    amount_transferrable: Number,
    settlement_status: String,
});

var Payments = mongoose.model('payments', payment);
module.exports = Payments;