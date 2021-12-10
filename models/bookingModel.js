const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({

    rest:{
        type:mongoose.Schema.ObjectId,
        ref:'Rest',
        required:[true]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true]
    },
    price:{
        type:Number,
        require:[true]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    paid:{
        type:Boolean,
        default:true
    }
});

bookSchema.pre(/^find/,function(next){

    this.populate('user').populate({
        path:'rest',
        select:'name'
    })
})

const Booking=mongoose.model('Booking',bookSchema);
module.exports=Booking;