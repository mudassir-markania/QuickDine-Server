var mongoose = require('mongoose');
var express = require('express');
var app = express();
var cors = require('cors');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var port;
var server;
var dbUrl = 'mongodb://localhost:27017/QuickDine';
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

port = 3001;
app.set('port', port);
server = http.createServer(app);
server.listen(port);

// Mongo DB connection

mongoose.connect(dbUrl, { useNewUrlParser: true,  useUnifiedTopology: true}).then(() => {
    console.log("Connected to MongoDB");
    module.exports.db = mongoose.connection.db;
    module.exports.mongoose = mongoose;
}).catch((err) => {
    console.log("Connection to MongoDB failed");
    console.log(err);
});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.get('/', (req, res) => {
    res.render('index')
});

var restaurantRoute = require('./routes/restaurant.route');
var paymentRoute = require('./routes/payment.route');
var employeeRoute = require('./routes/employee.route');
var feedbackRoute = require('./routes/feedback.route');
var analyticsRoute = require('./routes/analytics.route');
var arviewRoute = require('./routes/arview.route');

app.use('/restaurant', restaurantRoute);
app.use('/payment', paymentRoute);
app.use('/employee', employeeRoute);
app.use('/feedback', feedbackRoute);
app.use('/analytics', analyticsRoute);
app.use('/arview', arviewRoute);