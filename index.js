'use strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const config = require('./config/config');
const userRoutes = require('./routes/Users');
const placeRoutes = require('./routes/Place');
const reservationRoutes = require('./routes/Reservation');
const paymentRoutes = require('./routes/Payment');


const app = express();
let server;

//middleware config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/api/users/', userRoutes);
app.use('/api/reservations/', reservationRoutes);
app.use('/api/payments/', paymentRoutes);
app.use('/api/places/', placeRoutes);


app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`);
});

module.exports = app;