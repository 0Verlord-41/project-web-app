const express = require('express');
const restaurantController = require('./../controllers/restaurantController');
const router = express.Router();

router
    .route('/top-5')
    .get(restaurantController.aliasTopRestaurant ,restaurantController.getAllRestaurant);

router
    .route('/restaurant-stats')
    .get(restaurantController.getRestaurantStats);

//common routes
router
    .route('/')
    .get(restaurantController.getAllRestaurant)
    .post(restaurantController.createRestaurant);

router
    .route('/:id')
    .get(restaurantController.getRestaurant)
    .patch(restaurantController.updateRestaurant)
    .delete(restaurantController.deleteRestaurant);

module.exports = router;