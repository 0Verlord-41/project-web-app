
const Rest = require('./../models/restaurantModel');
const RestAPIFeatures = require('../utils/restAPIFeatures');

exports.aliasTopRestaurant = async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-averagerating,price';
    req.query.fields = 'name, price, averagerating,summary';
    next();
};

exports.getAllRestaurant = async (req, res) => {

    try{
        const features = new RestAPIFeatures(Rest.find(), req.query )
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const restaurants = await features.query;
        
        res.status(200).json({
        status: 'success',
        result: restaurants.length,
        data: {
            restaurants
        }
    });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getRestaurant = async (req, res) => {
    try{
        const restaurant = await Rest.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant
            }
        });
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err
        })
    }
};

exports.createRestaurant = async (req, res) => {

    try{
        const newRestaurant = await Rest.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                restaurants: newRestaurant
            }
        });
    } catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
};

exports.updateRestaurant = async (req, res) => {
    try{
        const updaterestaurant = await Rest.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                updaterestaurant
            }
        });
    } catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
};

exports.deleteRestaurant = async (req, res) => {
    try{
        await Rest.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        });
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
};

exports.getRestaurantStats = async (req, res) => {
    try{
        const stats = await Rest.aggregate([
            {
                $match: { averagerating: { $gte: 4.5}}
            },
            {
                $group: {
                    _id: null,
                    // _id: '$difficulty',
                    numRestaurants: { $sum: 1 },
                    // numRatings: { $sum: '$ratingsQuantity'},
                    avgRating: { $avg: '$averagerating'},
                    avgPrice: { $avg: '$price'},
                    maxPrice: { $max: '$price'},
                    minPrice: { $min: '$price'}
                }
            },
            {
                $sort: { avgPrice: 1}
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};