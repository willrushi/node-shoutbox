const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// Instantiate an express app
const app = express();


// Enable dotenv
require("dotenv").config()


// MongoDB connection
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
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


// Start the server
const server = app.listen( process.env.PORT || 8000, () => {
    console.log(`Listening on port ${server.address().port}`);
});