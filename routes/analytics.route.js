const express = require('express');
const router = express.Router();
const aC = require('../controllers/analytics.controller');

router.post('/admin/main_page', (req, res) => {
    aC.getAdminMainPageAnalytics(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/admin/detailed', (req, res) => {
    aC.getAdminDetailedAnalytics(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/admin/detailed/byrid', (req, res) => {
    aC.getAdminDetailedAnalyticsByRID(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/restaurant_panel/main_page', (req, res) => {
    aC.getRestaurantPanelMainPageAnalytics(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

router.post('/restaurant_panel/ar', (req, res) => {
    aC.getRestaurantPanelARAnalytics(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
});

module.exports = router;