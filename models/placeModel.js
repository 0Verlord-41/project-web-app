const mongoose=require('mongoose');

const placeschema=mongoose.Schema({

name:{
  type:String,
  unique:true,
  trim:true
},
locations:[{

type:{
  type:String,
  default:'Point'
},
  name:{
    type:String
  },
  Location:[Number],
  Type:{
  type:String
  },
  price:{
    type:String
  },
  Description:{
    type:String
  },
  ratings:{
    type:Number
  },
  averagerating:{
    type:String
  },
  Cooks:{
    type:Number
  },
  summary:{
    type:String
  },
  Place:{
    type:String
  },
  images:{
    type:String
  },
  Chef:{
    type:String
  },
  chefphoto:[String],
  Contact:{
    type:String
  },
  moreimg:[String]

}]


  },{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
    });

    const Place=mongoose.model('Place',placeschema);

    module.exports=Place;
