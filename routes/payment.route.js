const express = require('express');
const router = express.Router();
const pC = require('../controllers/payment.controller');

router.post('/getall', (req, res) => {
    pC.getAllPayments(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/getbyrid', (req, res) => {
    pC.getPaymentsByRID(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/create', (req, res) => {
    pC.createPayment(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/razorpay_connect', pC.razorpayconnect);

router.post('/complete', (req, res) => {
    pC.completePayment(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/paymentbyid', (req, res) => {
    pC.PaymentById(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

module.exports = router;