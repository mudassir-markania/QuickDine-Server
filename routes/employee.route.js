const express = require('express');
const router = express.Router();
const eC = require('../controllers/employee.controller');

router.post('/login', (req, res) => {
    eC.employeelogin(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/getall', (req, res) => {
    eC.getAllEmployees(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/add', (req, res) => {
    eC.addEmployee(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/update', (req, res) => {
    eC.updateEmployee(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

router.post('/delete', (req, res) => {
    eC.deleteEmployee(req.body).then((x) => {
        res.json(x);
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
})

module.exports = router;