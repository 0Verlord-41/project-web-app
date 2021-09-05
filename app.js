const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const restaurantRouter = require('./routes/restaurantRoutes');
// const userRouter = require('./routes/userRoutes')

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hello, its middleware! 🎉');
    next();
});

app.use('/api/v1/restaurants', restaurantRouter);
// app.use('/api/v1/users', userRouter);

module.exports = app;