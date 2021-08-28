const mongoose = require('mongoose');
const validator = require('validator');

const restaurantSchema = new mongoose.Schema({
    //schema definition object
    name: {
        type: String,
        required: [true, 'A Restaurant must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A Restaurant name must have less than or equal to 40 char'],
        minlength: [5, 'A Restaurant name must have more than or equal to 5 char']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1'],
        max: [5, 'Rating must be below 5']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A Restaurant must have a description']
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt:{
        type: Date,
        default: Date.now(),
        select: false
    }
});

tourSchema.pre('save', function(next){
    console.log('Will save document...');
    next();
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;