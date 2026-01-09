const express = require('express');
const app = express();

const authRoute = require('./routes/authrute');
//Basic Middleware
app.use(express.json());

//rute Middleware
app.use('/api/auth', authRoute);

//Endpoint Test
app.get('/health', (req, res) => {
    res.json({ status: 'ok'});
});

module.exports = app;
