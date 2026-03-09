var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employee = new Schema({
    employee_id: String,
    employee_name: String,
    password: String,
    priority: Number,
    live: Boolean,
    creation_time: Date,
    creation_timestamp: String,
})

var Employee = mongoose.model('employees', employee);
module.exports = Employee;