
const catchAsync = require('../utils/catchAsync');
const Review=require('./../models/reviewModel');
const factory=require('./handleFactory');


exports.getAllReviews = factory.getAll(Review);
// exports.getAllReviews = catchAsync(async (req,res,next)=>{
// let filter={};
// if(req.params.restid){
//   filter={rest:req.params.restId};
// }

//   const reviews=await Review.find();

//   res.status(200).json({
//     status:'success',
//     results:{
//       reviews
//     }
//   });
// });

exports.createReview = catchAsync(async(req,res,next)=>{
  // if(!req.body.rest){
  //   req.body.rest=req.params.restId;
  // }
  // if(!req.body.user){
  //   req.body.user=req.user.id;
  // }

  const newReview =await Review.create(req.body);

  res.status(200).json({
    status:'success',
    data:{
      review: newReview
    }
    });
});

exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
