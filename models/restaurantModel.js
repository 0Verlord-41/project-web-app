const mongoose = require('mongoose');
const validator = require('validator');

const restschema=new mongoose.Schema({
  name:{
    type:String
  },
  Locations:[{
   
    coordinates:[Number]
  }],
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

},
{
    toJSON:{virtuals:true},
    toObjects:{virtuals:true}
});


const Rest=mongoose.model('Rest',restschema);
module.exports=Rest;