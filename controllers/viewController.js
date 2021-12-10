const Rest = require('./../models/restaurantModel');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync( async(req, res) => {

  const rests = await Rest.find();
  res.status(200).render("overview", {
    title: "all restaurants",
    rests
  });
});

exports.getRest = catchAsync(async (req, res, next) => {

  const rest = await Rest.findOne({name:req.params.id}).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  console.log(rest.name);

  res.status(200).render("rest", {
    title: `${rest.name}`,
    rest
  });
});
