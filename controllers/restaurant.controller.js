const Restaurants = require('../models/restaurant.model');
const moment = require('moment');

exports.getSortedRestaurantList = async (body) => {
    var restaurantList = await Restaurants.aggregate([
        {
            '$match': {
                'live': true
            }
        }, {
            '$sort': {
                'creation_time': -1
            }
        }
    ]);
    return restaurantList;
}

exports.getSortedRestaurantListAdmin = async (body) => {
    var restaurantList = await Restaurants.aggregate([
        {
            '$sort': {
                'creation_time': -1
            }
        }, {
            '$project': {
                'id': 1,
                'name': 1,
                'location': 1,
            }
        }
    ]);
    return restaurantList;
}

exports.getRestaurantListByLocation = async (body) => {
    var restaurantList = await Restaurants.aggregate([
        {
            '$match': {
                'live': true,
                'location': body.location
            }
        }, {
            '$sort': {
                'creation_time': -1
            }
        }
    ]);
    return restaurantList;
}

exports.getbyid = async (body) => {
    var restaurant = Restaurants.findOne({ id: body.restaurant_id });
    return restaurant;
}

exports.restaurantlogin = async (body) => {
    var restaurant = await Restaurants.findOne({ id: body.restaurant_id, password: body.password, live: true });
    if (restaurant) {
        return restaurant;
    }
    else {
        return { message: "Wrong Restaurant ID/Password" }
    }
}

exports.addRestaurant = async (body) => {
    var restaurantList = await Restaurants.find();
    var restaurant = new Restaurants(body);
    restaurant.id = 1001;
    if (restaurantList.length > 0) {
        restaurant.id = 1001 + restaurantList.length;
    }
    restaurant.creation_time = moment().toDate();
    restaurant.creation_timestamp = moment().format('DD MMM YYYY h:mm A');
    restaurant.save();
    return restaurant;
}

exports.updateRestaurant = async (body) => {
    var doc = await Restaurants.updateOne({ id: body.restaurant_id }, body.restaurant);
    return doc;
}

exports.deleteRestaurant = async (body) => {
    var doc = await Restaurants.deleteOne({ id: body.restaurant_id });
    return doc;
}

exports.addCategory = async (body) => {
    var restaurant = await Restaurants.findOne({ id: body.restaurant_id });
    if (restaurant) {
        restaurant.categories.push(body.category)
        restaurant.save()
    }
    return restaurant;
}

exports.updateCategory = async (body) => {
    var restaurant = await Restaurants.findOne({ id: body.restaurant_id });
    if (restaurant) {
        var c = restaurant.categories.find(val => val._id == body.category_id);
        c.category_name = body.category.category_name;
        c.live = body.category.live;
        restaurant.save();
    }
    return restaurant;
}

exports.deleteCategory = async (body) => {
    var restaurant = await Restaurants.findOne({ id: body.restaurant_id });
    if (restaurant) {
        restaurant.categories.splice(body.category_index, 1);
        restaurant.save();
    }
    return restaurant;
}

exports.addItem = async (body) => {
    var restaurant = await Restaurants.findOne({ id: body.restaurant_id });
    if (restaurant) {
        var c = restaurant.categories.find(val => val._id == body.category_id);
        c.items.push(body.item);
        restaurant.save()
    }
    return restaurant;
}

exports.updateItem = async (body) => {
    var restaurant = await Restaurants.findOne({ id: body.restaurant_id });
    if (restaurant) {
        var c = restaurant.categories.find(val => val._id == body.category_id);
        var i = c.items.find(val => val._id == body.item_id);
        i.item_name = body.item.item_name;
        i.item_price = body.item.item_price;
        i.item_description = body.item.item_description;
        i.item_image = body.item.item_image;
        i.item_type = body.item.item_type;
        i.ar = body.item.ar;
        i.ar_model = body.item.ar_model;
        i.live = body.item.live;
        i.vegan = body.item.vegan;
        i.gluten_free = body.item.gluten_free;
        i.best_seller = body.item.best_seller;
        i.chefs_special = body.item.chefs_special;
        i.seasonal = body.item.seasonal;
        i.jain = body.item.jain;
        restaurant.save();
    }
    return restaurant;
}

exports.deleteItem = async (body) => {
    var restaurant = await Restaurants.findOne({ id: body.restaurant_id });
    if (restaurant) {
        var c = restaurant.categories.find(val => val._id == body.category_id);
        c.items.splice(body.item_index, 1);
        restaurant.save();
    }
    return restaurant;
}