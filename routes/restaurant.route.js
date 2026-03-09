const express = require('express');
const router = express.Router();
const rC = require('../controllers/restaurant.controller');

router.get('/get_sorted_list', (req, res) => {
    rC.getSortedRestaurantList(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.get('/get_sorted_list_admin', (req, res) => {
    rC.getSortedRestaurantListAdmin(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/get_list_bylocation', (req, res) => {
    rC.getRestaurantListByLocation(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/getbyid', (req, res) => {
    rC.getbyid(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/login', (req, res) => {
    rC.restaurantlogin(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/add', (req, res) => {
    rC.addRestaurant(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/update', (req, res) => {
    rC.updateRestaurant(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/delete', (req, res) => {
    rC.deleteRestaurant(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/add_category', (req, res) => {
    rC.addCategory(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/update_category', (req, res) => {
    rC.updateCategory(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/delete_category', (req, res) => {
    rC.deleteCategory(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/add_item', (req, res) => {
    rC.addItem(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/update_item', (req, res) => {
    rC.updateItem(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/delete_item', (req, res) => {
    rC.deleteItem(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

module.exports = router;