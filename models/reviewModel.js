const mongoose=require('mongoose');
const Rest = require('./restaurantModel');

const review=new mongoose.Schema({

  review:{
    type:String,
    required:[true,'cannot be empty']
  },
  rating:{
    type:String,
    min:1,
    max:5
  },
  createadAt:{
    type:Date,
    default:Date.now()
  },
  rest:{
    type:mongoose.Schema.ObjectId,
    ref:'Rest',
    required:[true,'Review must belong to a rest']
  },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:[true,'Review must belong to user']
  }
  },{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
    });

review.pre(/^find/,function(next){
  
  this.populate({
      path:'user',
      select:'name photo'
    });
      next();
  });

  const Review = mongoose.model('Review',review);
  module.exports = Review;
