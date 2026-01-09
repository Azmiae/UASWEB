const express = require('express');

const app = express();

const authRoute = require('./routes/authrute');
const userRoute = require('./routes/userRoute');
//Basic Middleware
app.use(express.json());

//rute Middleware
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

//Endpoint Test
app.get('/health', (req, res) => {
    res.json({ status: 'ok'});
});

module.exports = app;
