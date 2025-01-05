require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConnect = require('./config/db');

//Initialize app
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Connect to MongoDB
dbConnect();

//Routes
app.use('/api/auth', require('./routes/auth'));

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});