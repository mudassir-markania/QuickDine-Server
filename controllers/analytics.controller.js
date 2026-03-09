const Payments = require('../models/payment.model');
const FeedBacks = require('../models/feedback.model');
const ARViews = require('../models/arview.model');

exports.getAdminMainPageAnalytics = async (body) => {
    var response = {
        total_no_of_transactions: 0,
        total_transaction_amount: 0,
        average_bill_value: 0,
        net_recievable: 0,
        total_payment_gateway_charge: 0,
        total_payment_gateway_charge_tax: 0,
        total_no_of_feedbacks: 0
    }

    var PA = await Payments.aggregate([
        {
            '$match': {
                'status': 'Completed',
            }
        }, {
            '$group': {
                '_id': null,
                'total_no_of_transactions': {
                    '$sum': 1
                },
                'total_transaction_amount': {
                    '$sum': '$amount'
                },
                'average_bill_value': {
                    '$avg': '$amount'
                },
                'net_recievable': {
                    '$sum': '$amount_transferrable'
                },
                'total_payment_gateway_charge': {
                    '$sum': '$payment_gateway_charge'
                },
                'total_payment_gateway_charge_tax': {
                    '$sum': '$payment_gateway_charge_tax'
                }
            }
        }
    ]);
    if (PA.length > 0) {
        response.total_no_of_transactions = PA[0].total_no_of_transactions;
        response.total_transaction_amount = PA[0].total_transaction_amount.toFixed(2);
        response.average_bill_value = PA[0].average_bill_value.toFixed(2);
        response.net_recievable = PA[0].net_recievable.toFixed(2);
        response.total_payment_gateway_charge = PA[0].total_payment_gateway_charge.toFixed(2);
        response.total_payment_gateway_charge_tax = PA[0].total_payment_gateway_charge_tax.toFixed(2);
    }

    var FA = await FeedBacks.aggregate([
        {
            '$group': {
                '_id': null,
                'total_no_of_feedbacks': {
                    '$sum': 1
                }
            }
        }
    ]);
    if (FA.length > 0) {
        response.total_no_of_feedbacks = FA[0].total_no_of_feedbacks;
    }

    var responseFiltered = {
        total_no_of_transactions: 0,
        total_transaction_amount: 0,
        average_bill_value: 0,
        net_recievable: 0,
        total_payment_gateway_charge: 0,
        total_payment_gateway_charge_tax: 0,
        total_no_of_feedbacks: 0
    }

    var PAFiltered = await Payments.aggregate([
        {
            '$match': {
                'status': 'Completed',
                'payment_time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                }
            }
        }, {
            '$group': {
                '_id': null,
                'total_no_of_transactions': {
                    '$sum': 1
                },
                'total_transaction_amount': {
                    '$sum': '$amount'
                },
                'average_bill_value': {
                    '$avg': '$amount'
                },
                'net_recievable': {
                    '$sum': '$amount_transferrable'
                },
                'total_payment_gateway_charge': {
                    '$sum': '$payment_gateway_charge'
                },
                'total_payment_gateway_charge_tax': {
                    '$sum': '$payment_gateway_charge_tax'
                }
            }
        }
    ]);
    if (PAFiltered.length > 0) {
        responseFiltered.total_no_of_transactions = PAFiltered[0].total_no_of_transactions;
        responseFiltered.total_transaction_amount = PAFiltered[0].total_transaction_amount.toFixed(2);
        responseFiltered.average_bill_value = PAFiltered[0].average_bill_value.toFixed(2);
        responseFiltered.net_recievable = PAFiltered[0].net_recievable.toFixed(2);
        responseFiltered.total_payment_gateway_charge = PAFiltered[0].total_payment_gateway_charge.toFixed(2);
        responseFiltered.total_payment_gateway_charge_tax = PAFiltered[0].total_payment_gateway_charge_tax.toFixed(2);
    }

    var FAFiltered = await FeedBacks.aggregate([
        {
            '$match': {
                'time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                }
            }
        }, {
            '$group': {
                '_id': null,
                'total_no_of_feedbacks': {
                    '$sum': 1
                }
            }
        }
    ]);
    if (FAFiltered.length > 0) {
        responseFiltered.total_no_of_feedbacks = FAFiltered[0].total_no_of_feedbacks;
    }

    return { ...response, filteredResponse: responseFiltered };
}

exports.getAdminDetailedAnalytics = async (body) => {
    var PA = await Payments.aggregate([
        {
            '$match': {
                'status': 'Completed',
                'payment_time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                }
            }
        }, {
            '$group': {
                '_id': '$restaurant_id',
                'restaurant_name': {
                    '$last': '$restaurant_name'
                },
                'restaurant_location': {
                    '$last': '$restaurant_location'
                },
                'total_no_of_transactions': {
                    '$sum': 1
                },
                'total_transaction_amount': {
                    '$sum': '$amount'
                },
                'average_bill_value': {
                    '$avg': '$amount'
                },
                'net_recievable': {
                    '$sum': '$amount_transferrable'
                },
                'total_payment_gateway_charge': {
                    '$sum': '$payment_gateway_charge'
                },
                'total_payment_gateway_charge_tax': {
                    '$sum': '$payment_gateway_charge_tax'
                }
            }
        }
    ]);
    return PA;
}

exports.getAdminDetailedAnalyticsByRID = async (body) => {
    var response = {
        total_no_of_transactions: 0,
        total_transaction_amount: 0,
        average_bill_value: 0,
        net_recievable: 0,
        total_payment_gateway_charge: 0,
        total_payment_gateway_charge_tax: 0,
        total_no_of_feedbacks: 0,
        payments: [],
        restaurant_name: '',
        restaurant_location: ''
    }

    var PA = await Payments.aggregate([
        {
            '$match': {
                'status': 'Completed',
                'restaurant_id': body.restaurant_id,
                'payment_time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                }
            }
        }, {
            '$group': {
                '_id': 'null',
                'payments': { $push: "$$ROOT" },
                'total_no_of_transactions': {
                    '$sum': 1
                },
                'restaurant_name': {
                    '$last': '$restaurant_name'
                },
                'restaurant_location': {
                    '$last': '$restaurant_location'
                },
                'total_no_of_transactions': {
                    '$sum': 1
                },
                'total_transaction_amount': {
                    '$sum': '$amount'
                },
                'average_bill_value': {
                    '$avg': '$amount'
                },
                'net_recievable': {
                    '$sum': '$amount_transferrable'
                },
                'total_payment_gateway_charge': {
                    '$sum': '$payment_gateway_charge'
                },
                'total_payment_gateway_charge_tax': {
                    '$sum': '$payment_gateway_charge_tax'
                }
            }
        }
    ]);
    if (PA.length > 0) {
        response.total_no_of_transactions = PA[0].total_no_of_transactions;
        response.total_transaction_amount = PA[0].total_transaction_amount.toFixed(2);
        response.average_bill_value = PA[0].average_bill_value.toFixed(2);
        response.net_recievable = PA[0].net_recievable.toFixed(2);
        response.total_payment_gateway_charge = PA[0].total_payment_gateway_charge.toFixed(2);
        response.total_payment_gateway_charge_tax = PA[0].total_payment_gateway_charge_tax.toFixed(2);
        response.payments = PA[0].payments;
        response.restaurant_name = PA[0].restaurant_name;
        response.restaurant_location = PA[0].restaurant_location;
    }

    var FA = await FeedBacks.aggregate([
        {
            '$match': {
                'restaurant_id': body.restaurant_id,
                'time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                }
            }
        }, {
            '$group': {
                '_id': null,
                'total_no_of_feedbacks': {
                    '$sum': 1
                }
            }
        }
    ]);
    if (FA.length > 0) {
        response.total_no_of_feedbacks = FA[0].total_no_of_feedbacks;
    }
    return response;
}

exports.getRestaurantPanelMainPageAnalytics = async (body) => {
    var response = {
        total_no_of_transactions: 0,
        total_transaction_amount: 0,
        average_bill_value: 0,
        net_recievable: 0,
        total_payment_gateway_charge: 0,
        total_payment_gateway_charge_tax: 0,
        total_no_of_feedbacks: 0
    }

    var PA = await Payments.aggregate([
        {
            '$match': {
                'status': 'Completed',
                'restaurant_id': body.restaurant_id,
                'payment_time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                }
            }
        }, {
            '$group': {
                '_id': null,
                'total_no_of_transactions': {
                    '$sum': 1
                },
                'total_transaction_amount': {
                    '$sum': '$amount'
                },
                'average_bill_value': {
                    '$avg': '$amount'
                },
                'net_recievable': {
                    '$sum': '$amount_transferrable'
                },
                'total_payment_gateway_charge': {
                    '$sum': '$payment_gateway_charge'
                },
                'total_payment_gateway_charge_tax': {
                    '$sum': '$payment_gateway_charge_tax'
                }
            }
        }
    ]);
    if (PA.length > 0) {
        response.total_no_of_transactions = PA[0].total_no_of_transactions;
        response.total_transaction_amount = PA[0].total_transaction_amount.toFixed(2);
        response.average_bill_value = PA[0].average_bill_value.toFixed(2);
        response.net_recievable = PA[0].net_recievable.toFixed(2);
        response.total_payment_gateway_charge = PA[0].total_payment_gateway_charge.toFixed(2);
        response.total_payment_gateway_charge_tax = PA[0].total_payment_gateway_charge_tax.toFixed(2);
    }

    var FA = await FeedBacks.aggregate([
        {
            '$match': {
                'restaurant_id': body.restaurant_id,
                'time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                }
            }
        }, {
            '$group': {
                '_id': null,
                'total_no_of_feedbacks': {
                    '$sum': 1
                }
            }
        }
    ]);
    if (FA.length > 0) {
        response.total_no_of_feedbacks = FA[0].total_no_of_feedbacks;
    }
    return response;
}

exports.getRestaurantPanelARAnalytics = async (body) => {
    var response = {
        total_no_of_arviews: 0,
        item_list_arviews: []
    }

    var ARVA2 = await ARViews.aggregate([
        {
            '$match': {
                'restaurant_id': body.restaurant_id,
                'time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                },
                'arview': true
            }
        }, {
            '$group': {
                '_id': null,
                'total_no_of_arviews': {
                    '$sum': 1
                }
            }
        }
    ]);
    if (ARVA2.length > 0) {
        response.total_no_of_arviews = ARVA2[0].total_no_of_arviews;
    }

    response.item_list_arviews = await ARViews.aggregate([
        {
            '$match': {
                'restaurant_id': body.restaurant_id,
                'time': {
                    $gte: new Date(body.dateRange.startDate), $lte: new Date(body.dateRange.endDate)
                },
                'arview': true
            }
        }, {
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
                'last_viewed': {
                    '$last': '$timestamp'
                },
            }
        }
    ]);

    return response;
}