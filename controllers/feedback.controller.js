const Feedbacks = require('../models/feedback.model');
const moment = require('moment');

exports.getAllFeedbacks = async (body) => {
    var feedbacks = await Feedbacks.aggregate([
        {
            '$match': {
                'time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                },
            }
        },
        {
            '$sort': {
                'time': -1
            }
        }, {
            '$skip': (parseInt(body.page) - 1) * parseInt(body.limit)
        }, {
            '$limit': parseInt(body.limit)
        }
    ]);
    return feedbacks;
}

exports.getFeedbacksByRID = async (body) => {
    var feedbacks = await Feedbacks.aggregate([
        {
            '$match': {
                'restaurant_id': body.restaurant_id,
                'time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                },
            }
        },
        {
            '$sort': {
                'time': -1
            }
        }, {
            '$skip': (parseInt(body.page) - 1) * parseInt(body.limit)
        }, {
            '$limit': parseInt(body.limit)
        }
    ]);
    return feedbacks;
}

exports.createFeedBack = async (body) => {
    var feedback = new Feedbacks(body);
    feedback.time = moment().toDate();
    feedback.timestamp = moment().format('DD MMM YYYY h:mm A');
    feedback.save();
    return feedback;
}