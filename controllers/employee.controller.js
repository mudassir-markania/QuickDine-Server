const Employees = require('../models/employee.model');
const moment = require('moment');

exports.employeelogin = async (body) => {
    console.log(body);
    var employee = await Employees.findOne({ employee_id: body.employee_id, password: body.password, live: true });
    if (employee) {
        return employee;
    }
    else {
        return { message: "Wrong Employee ID/Password" }
    }
}

exports.getAllEmployees = async () => {
    var doc = await Employees.find()
    return doc
}

exports.addEmployee = async (body) => {
    var employeetList = await Employees.find();
    var employee = new Employees(body);
    employee.employee_id = 'E1';
    if (employeetList.length > 0) {
        employee.employee_id = `E${employeetList.length}`;
    }
    employee.creation_time = moment().toDate();
    employee.creation_timestamp = moment().format('DD MMM YYYY h:mm A');
    employee.save();
    return employee;
}

exports.updateEmployee = async (body) => {
    var doc = await Employees.updateOne({ employee_id: body.employee_id }, body.employee);
    return doc;
}

exports.deleteEmployee = async (body) => {
    var doc = await Employees.deleteOne({ employee_id: body.employee_id });
    return doc;
}