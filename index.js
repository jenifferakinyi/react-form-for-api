const express = require("express");
const studentRoute = require("./routes/studentRoute");
const userRoute = require("./routes/userRoute");
const cors = require('cors');
require('dotenv').config();
require('./helpers/init_mongodb');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // enable set cookie
}));

app.use(express.json());
app.use(userRoute); // Use your user-related routes
app.use(studentRoute); // Use your student-related routes

// Handling error 404 (if no matching route found)
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

app.listen(process.env.PORT || 4000, function () {
    console.log("now listening for requests on: http://localhost:4000");
});
