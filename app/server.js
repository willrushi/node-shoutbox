const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// Instantiate an express app
const app = express();


// Enable dotenv
require("dotenv").config()


// MongoDB connection
const { 
  MONGO_USER,
  MONGO_PASS,
  MONGO_URL  
} = process.env;
const connectString = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}?retryWrites=true&w=majority`;
console.log(connectString);
mongoose.connect(connectString, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Import the routers
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");


// Set up public folder and bodyparser
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Implement routers
app.use("/", indexRouter);
app.use("/api", apiRouter);


// Don't leak stack traces to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });

  
// Start the server
const server = app.listen( process.env.PORT || 8000, () => {
    console.log(`Listening on port ${server.address().port}`);
});