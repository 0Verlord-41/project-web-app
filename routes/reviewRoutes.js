const express=require('express');
const reviewController=require('./../controllers/reviewController');
const authcontroller=require('./../controllers/authController');

const router=express.Router({mergeParams:true});

router.use(authcontroller.protect);

router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(
        authcontroller.restrictTo('user'), 
        reviewController.createReview
    );

router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(authcontroller.restrictTo('user', 'admin'), reviewController.updateReview)
    .delete(authcontroller.restrictTo('user', 'admin'), reviewController.deleteReview);

module.exports=router;