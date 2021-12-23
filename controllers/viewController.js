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

exports.getHome = catchAsync( async(req, res) => {
  res.status(200).render("home", {
    title: "Home Page"
  });
});

exports.getRest = catchAsync(async (req, res, next) => {

  const rest = await Rest.findOne({name:req.params.id}).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  
  if(!rest){
    return next(new AppError('Not the right name!', 404));
  }

  res.status(200).render("rest", {
    title: `${rest.name}`,
    rest
  });
});

exports.signup = (req,res) => {
  res.status(200).render('signup', {
    title: 'Sign'
  });
};

exports.getLoginForm = (req,res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});