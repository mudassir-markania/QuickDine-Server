const ARViews = require('../models/arview.model');
const moment = require('moment');

exports.getAllARViews = async (body) => {
    var arviewList = await ARViews.aggregate([
        {
            '$group': {
                '_id': '$item_id',
                'no_of_views': {
                    '$sum': 1
                },
                'category_name': {
                    '$last': '$category_name'
                },
                'item_name': {
                    '$last': '$item_name'
                },
                'timestamp': {
                    '$last': '$timestamp'
                },
                'restaurant_id': {
                    '$last': '$restaurant_id'
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
    return arviewList;
}

exports.getARViewsByRID = async (body) => {
    var arviewList = await ARViews.aggregate([
        {
            '$match': {
                'restaurant_id': body.restaurant_id
            }
        }, {
            '$sort': {
                'time': -1
            }
        }, {
            '$skip': (parseInt(body.page) - 1) * parseInt(body.limit)
        }, {
            '$limit': parseInt(body.limit)
        }
    ]);
    return arviewList;
}

exports.addARView = async (body) => {
    var arview = new ARViews(body);
    arview.time = moment().toDate();
    arview.timestamp = moment().format('DD MMM YYYY h:mm A');
    arview.arview = true;
    arview.save();
    return arview;
}

exports.updateARView = async (body) => {
    var doc = await ARViews.updateOne({ _id: body.arview_id }, body.arview);
    return doc;
}