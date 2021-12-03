const mongoose = require('mongoose');
const validator = require('validator');

const restschema=new mongoose.Schema({
  name:{
    type:String,
    required: [true, 'A restaurant must have a name'],
    unique: true
  },
  slug: String,
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

restschema.virtual('reviews',{
  ref:'Review',
  foreignField:'rest',
  localField:'_id'
});

restschema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  console.log(this.slug);
  next();
});

const Rest=mongoose.model('Rest',restschema);
module.exports=Rest;