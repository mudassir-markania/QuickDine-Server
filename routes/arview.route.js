const express = require('express');
const router = express.Router();
const aC = require('../controllers/arview.controller');

router.post('/getall', (req, res) => {
    aC.getAllARViews(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/getbyrid', (req, res) => {
    aC.getARViewsByRID(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/add', (req, res) => {
    aC.addARView(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/update', (req, res) => {
    aC.updateARView(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

module.exports = router;