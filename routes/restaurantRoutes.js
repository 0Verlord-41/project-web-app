const express = require('express');
const restaurantController = require('./../controllers/restaurantController');
const authController = require('./../controllers/authController');
// const reviewController=require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');
const router = express.Router();

// router
//     .route('/:restId/reviews')
//     .post(
//       authController.protect, 
//       authController.restrictTo('user'), 
//       reviewController.createReview
//       );

router.use('/:restId/reviews', reviewRouter);

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
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        restaurantController.createRestaurant
      );

router
    .route('/:id')
    .get( restaurantController.getRestaurant)
    .patch(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        restaurantController.uploadRestImages,
        restaurantController.resizeRestImages,
        restaurantController.updateRestaurant
      )
      .delete(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        restaurantController.deleteRestaurant
      )

module.exports = router;