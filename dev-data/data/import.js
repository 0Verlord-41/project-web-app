const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Rest = require('./../../models/restaurantModel');

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('DB Connection Successful!'));

//Read JSON file
const restaurants = JSON.parse(fs.readFileSync(`${__dirname}/rest.json`, 'utf-8'));

//Import data in DB
const importData = async () => {
    try{
        await Rest.create(restaurants);
        console.log('Data successfully loaded!');
    }catch(err){
        console.log(err);
    }
    process.exit();
};

//Delete all data from DB
const deleteData = async () => {
    try{
        await Rest.deleteMany();
        console.log('Data successfully deleted!');
    }catch(err){
        console.log(err);
    }
    process.exit();
};

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);