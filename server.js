const express=require('express');
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv');
const colors=require('colors');
const morgan=require('morgan');
const errorHandler=require('./middleware/error');
const connectDb = require('./config/Db');

dotenv.config({path:'./config/config.env'})

//Routes
const CategoriesRoute=require('./routes/CategoriesRoute');
const ProductsRoute=require('./routes/ProductsRoute')
const AuthRoute=require('./routes/AuthRoute')

var app=express();

//use body parser
app.use(express.json());

//use cookie parser
app.use(cookieParser());

connectDb();

var port=process.env.PORT || 5000;

if(process.env.NODE_ENV === 'development')
    app.use(morgan('tiny'));

//Routes Settings
app.use('/api/v1/categories',CategoriesRoute);
app.use('/api/v1/products',ProductsRoute);
app.use('/api/v1/auth',AuthRoute);

//use error middleware
app.use(errorHandler);

app.listen(port,console.log(`Server Running on PORT : ${port} `.yellow));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
  });