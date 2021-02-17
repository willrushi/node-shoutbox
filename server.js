const express = require("express"),
    bodyParser = require('body-parser');

// Instantiate an express app
const app = express();


// Import the routers
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");


// Set up public folder and bodyparser
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Implement routers
app.use("/", indexRouter);
app.use("/api", apiRouter);

// Start the server
const server = app.listen( process.env.PORT || 8000, () => {
    console.log(`Listening on port ${server.address().port}`);
});