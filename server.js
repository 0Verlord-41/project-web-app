// const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});

const app = require('./app');

// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
// );

// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }).then(() => console.log('DB Connection Successful!'))

const port = process.env.PORT || 8000;
console.log(app.get('env'));

app.listen(port, () => {
    console.log(`Working on port: ${port}...`);
});