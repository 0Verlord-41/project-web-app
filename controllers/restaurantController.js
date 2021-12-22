const multer = require('multer');
const sharp = require('sharp');
const Rest = require('./../models/restaurantModel');
const RestAPIFeatures = require('../utils/restAPIFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory=require('./handleFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadRestImages = upload.fields([
    { name: 'images', maxCount: 1 },
    { name: 'moreimg', maxCount: 3 }
  ]);

  exports.resizeRestImages = catchAsync(async (req, res, next) => {
    if (!req.files.images || !req.files.moreimg) return next();
  
    // 1) Cover image
    req.body.images = `rest-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.images[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/tours/${req.body.images}`);
  
    // 2) Images
    req.body.moreimg = [];
  
    await Promise.all(
      req.files.moreimg.map(async (file, i) => {
        const filename = `rest-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
  
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/tours/${filename}`);
  
        req.body.moreimg.push(filename);
      })
    );
  
    next();
  });

exports.aliasTopRestaurant = async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-averagerating,price';
    req.query.fields = 'name, price, averagerating,summary';
    next();
};

exports.getAllRestaurant = factory.getAll(Rest);
// exports.getAllRestaurant = catchAsync(async (req, res, next) => {

//         const features = new RestAPIFeatures(Rest.find(), req.query )
//             .filter()
//             .sort()
//             .limitFields()
//             .paginate();
//         const restaurants = await features.query;
        
//         res.status(200).json({
//         status: 'success',
//         result: restaurants.length,
//         data: {
//             restaurants
//         }
//     });
// });

exports.getRestaurant = factory.getOne(Rest, { path: 'reviews'});
// exports.getRestaurant = catchAsync(async (req, res, next) => {
    
//         const restaurant = await Rest.findById(req.params.id).populate('reviews');

//         if(!restaurant){
//             return next(new AppError('No tour found with the given ID', 404))
//         }
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 restaurant
//             }
//         });
// });

exports.createRestaurant = factory.createOne(Rest);
// exports.createRestaurant = catchAsync(async (req, res, next) => {

//     const newRestaurant = await Rest.create(req.body);

//         res.status(201).json({
//             status: 'success',
//             data: {
//                 restaurants: newRestaurant
//             }
//         });
// });

exports.updateRestaurant = factory.updateOne(Rest);
// exports.updateRestaurant = catchAsync(async (req, res, next) => {

//         const updaterestaurant = await Rest.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });

//         if(!restaurant){
//             return next(new AppError('No tour found with the given ID', 404))
//         }
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 updaterestaurant
//             }
//         });
// });

exports.deleteRestaurant = factory.deleteOne(Rest);
// exports.deleteRestaurant = catchAsync(async (req, res, next) => {

//         const restaurant = await Rest.findByIdAndDelete(req.params.id)

//         if(!restaurant){
//             return next(new AppError('No tour found with the given ID', 404))
//         }
//         res.status(204).json({
//             status: 'success',
//             data: null
//         });
// });

exports.getRestaurantStats = catchAsync(async (req, res, next) => {

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
});

// exports.gettourwithin=async (req,res,next)=>{
// const {distance,latlng,unit}=req.params;
// const [lat,lng]=latlng.split(',');
// const radius=unit==='mi' ? distance/3963.2:distance/6378.1;

// if(!lat || !lng){
//   console.log("please mention the latitude");

// }
// console.log(req.query);
// console.log(req.params);
// console.log(distance,lat,lng,unit);

// const restaurants=await Rest.find({startLocation:{$geoWithin:{$centerSphere:[[lng,lat],radius]}}});
// res.status(200).json({
//   status:"success",
//   result:rests.length,
//   data:{
//     data: rests
//   }
//   })

// };