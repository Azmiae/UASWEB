const express = require('express');
const app = express();

//Basic Middleware
app.use(express.json());

//Endpoint Test
app.get('/health', (req, res) => {
    res.json({ status: 'ok'});
});

module.exports = app;
