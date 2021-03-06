// Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');
const cookieParser = require('cookie-parser');

// Enable usage of .env file
var dotenv = require('dotenv');
dotenv.config();

// Static assets and middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Connect to port running the app
const port = process.env.PORT || 3000
app.listen(port, function() {
  console.log(`App listening successfully on port: ${port}`);
});

// Connect to database via dotenv
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/barrels'
mongoose.connect(mongoURI);

// Routes
const itemsController = require('./server/controllers/itemsController');
const usersController = require('./server/controllers/usersController');
const sessionController = require('./server/controllers/sessionController');
const commentsController = require('./server/controllers/commentsController');

app.use('/api/items', itemsController);
app.use('/api/users', usersController);
app.use('/api/session', sessionController);
app.use('/api/items/:id/comments', commentsController);
