const express = require('express');

const app = express();

const authRoute = require('./routes/authrute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const transactionRoute = require('./routes/transactionRoute');


//Basic Middleware
app.use(express.json());

//rute Middleware
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/transaksi', transactionRoute);

//Endpoint Test
app.get('/health', (req, res) => {
    res.json({ status: 'ok'});
});

module.exports = app;
