const express = require('express');
const router = express.Router();
const fC = require('../controllers/feedback.controller');

router.post('/getall', (req, res) => {
    fC.getAllFeedbacks(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/getbyrid', (req, res) => {
    fC.getFeedbacksByRID(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/create', (req, res) => {
    fC.createFeedBack(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

module.exports = router;