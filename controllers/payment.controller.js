const Payments = require('../models/payment.model');
const Restaurants = require('../models/restaurant.model');
const generateUniqueId = require('generate-unique-id');
const moment = require('moment');
const razorpay = require('razorpay');
const bigdecimal = require("bigdecimal");

const roundOff = async (number) => {
    number = parseFloat((number).toFixed(2));
    return number;
}

exports.getAllPayments = async (body) => {
    var paymentList = await Payments.aggregate([
        {
            '$match': {
                'status': 'Completed'
            }
        }, {
            '$sort': {
                'payment_time': -1
            }
        }, {
            '$skip': (parseInt(body.page) - 1) * parseInt(body.limit)
        }, {
            '$limit': parseInt(body.limit)
        }
    ]);
    return paymentList;
}

exports.getPaymentsByRID = async (body) => {
    var paymentList = await Payments.aggregate([
        {
            '$match': {
                'status': 'Completed',
                'restaurant_id': body.restaurant_id
            }
        }, {
            '$sort': {
                'payment_time': -1
            }
        }, {
            '$skip': (parseInt(body.page) - 1) * parseInt(body.limit)
        }, {
            '$limit': parseInt(body.limit)
        }
    ]);
    return paymentList;
}

exports.createPayment = async (body) => {
    var restaurant = await Restaurants.findOne({ id: body.restaurant_id });
    var payment = new Payments();
    payment.payment_id = generateUniqueId({
        length: 10,
        useLetters: false
    });
    payment.time = moment().toDate();
    payment.timestamp = moment().format('DD MMM YYYY h:mm A');
    payment.restaurant_id = restaurant.id;
    payment.restaurant_name = restaurant.name;
    payment.restaurant_location = restaurant.location;
    payment.amount = body.amount;
    payment.user_name = body.user_name;
    payment.bill_no = body.bill_no;
    payment.status = 'Pending';
    payment.save();
    return payment;
}

exports.razorpayconnect = (req, res) => {
    Payments.findOne({ payment_id: req.body.payment_id }).then((payment) => {
        var x = new bigdecimal.BigDecimal(payment.amount);
        var y = x.multiply(new bigdecimal.BigDecimal("100"));
        var z = y.toBigInteger();
        var instance = new razorpay({
            key_id: 'rzp_test_IP38tR8DI8BFj0',
            key_secret: 'AEgCM8jR7I9K3m3Fqz1uVn73'
        })
        var options = {
            amount: parseInt(z),  // amount in the smallest currency unit
            currency: "INR",
            receipt: req.body.payment_id + '',
            payment: {
                capture: "automatic",
                capture_options: {
                    automatic_expiry_period: 2880,
                    refund_speed: "normal"
                }
            },
        };
        instance.orders.create(options, (err, razorpay_response) => {
            if ((err)) {
                res.json({ err })
            }
            else {
                payment.razorpay_uid = razorpay_response.id;
                razorpay_response.user_email = payment.user_email;
                razorpay_response.user_phone = payment.user_phone
                payment.save();
                res.json(razorpay_response)
            }
        })
    })
}

exports.completePayment = async (body) => {
    var payment = await Payments.findOne({ payment_id: body.payment_id });
    var restaurant = await Restaurants.findOne({ id: body.restaurant_id });
    payment.payment_time = moment().toDate();
    payment.payment_timestamp = moment().format('DD MMM YYYY h:mm A');
    payment.transaction_id = body.transaction_id;
    var instance = new razorpay({
        key_id: 'rzp_test_IP38tR8DI8BFj0',
        key_secret: 'AEgCM8jR7I9K3m3Fqz1uVn73'
    })
    let data = await instance.payments.fetch(body.transaction_id);
    payment.payment_method = data.method;
    payment.user_email = data.email;
    payment.user_phone = data.contact
    payment.payment_gateway_percentage = restaurant.payment_gateway_percentage;
    payment.payment_gateway_charge = await roundOff(payment.payment_gateway_percentage * (payment.amount / 100));
    payment.payment_gateway_charge_tax = await roundOff(18 * (payment.payment_gateway_charge / 100));
    payment.amount_transferrable = await roundOff(payment.amount - payment.payment_gateway_charge - payment.payment_gateway_charge_tax);
    payment.status = 'Completed';
    payment.settlement_status = 'Pending';
    payment.save();
    return payment;
}

exports.PaymentById = async (body) => {
    var payment = await Payments.findOne({ payment_id: body.payment_id });
    return payment;
}