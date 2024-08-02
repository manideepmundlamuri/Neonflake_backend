const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mediaRouter = require('./router/mediaRouter');
const path = require('path');
const cors = require('cors');
const myApp = express();
const port = process.env.PORT || 5000;

myApp.use(cors())
myApp.use(bodyParser.json());
myApp.use(bodyParser.urlencoded({ extended: false }))
myApp.use(express.json());
myApp.use(express.urlencoded({extended:true}))
myApp.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect(process.env.MONGO_URL)
    .then((result) => {
        console.log('DB IS CONNECTED')
    }).catch((err) => {
        console.log(err)
    });

myApp.get('/', (req, res) => {
    res.send('welcome to cloudinary')
})
myApp.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

myApp.use('/api', mediaRouter)

myApp.listen(5000)
console.log(`server is runnig in ${port}`);