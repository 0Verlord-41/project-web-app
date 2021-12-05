const catchAsync = require("../utils/catchAsync");
const APIFeatures = require('../utils/restAPIFeatures');
const AppError = require("./../utils/appError");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = { name: req.params.id };
    const del = await Model.deleteOne(doc);

    if (!doc) {
      return next(new AppError("No tour found with the given ID", 404));
    }
    res.status(200).json({
      status: "deleted",
      data: {
        read: del,
      }
    });
  });

exports.updateOne = (Model) => catchAsync(async (req, res, next) => {
    //const store={name:req.user.id};

    const up = await Model.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    // console.log(up);
    res.status(200).json({
      status: "success",
      data: {
        data: up,
      }
    });
});

exports.createOne = (Model) => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    // console.log(doc);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      }
    });
});

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
  //res.sendFile(path.join(__dirname+'/product.html'));
    let came = Model.findById(req.params.id);
    if (popOptions) {
      came = came.populate(popOptions);
    }
    const doc = await came;
    if (!doc) {
      return next(new AppError("No tour found with the given ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      }
    });
});

exports.getAll = (Model) => catchAsync(async (req, res, next) => {
    // console.log(req.user);
    /*const page=req.query.page*1||1;
  const limit=req.query.limit*1 ||100;
  const skip=(page-1)*limit;
  read=read.skip(skip).limit(limit)
  */
    let filtering={};
    if(req.params.restid){
      filtering={rest:req.params.restId};
    }

    const features = new APIFeatures(Model.find(filtering), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc
      }
    });
});
