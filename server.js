const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')

// custom Routes
const authRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter.js');
const categoryRouter = require('./routers/catRouter.js');
const subcategoryRouter = require('./routers/subcatRouter.js');
const orderRouter = require('./routers/orderRouter.js');
// products
// orders
// ...


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout/layout')
app.use(expressLayouts);
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(fileUpload());


// mongo connection

mongoose.connect(
    'mongodb://localhost:27017/productapp',
    {
        useNewUrlParser: true,

        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to mongodb'));

// ...


// app.use
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subcategoryRouter);
app.use("/api/order", orderRouter);

// ...


// app listener
app.listen(3000, () => console.log('BlogApp server started at Port 3000'));