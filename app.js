const express = require("express");
const app = express();

const createError = require("http-errors");

const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const jsend = require("jsend");

const cookie = require("cookie-parser");


//router
const addressRouter = require("./Routers/Address");
app.use(hpp());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(jsend.middleware);
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req,res,next)=>{
    res.send("working");
});
app.use("/address", addressRouter);


app.use((req, res, next) => {
    next(createError(404))
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    res.status(status);
    res.json({
        status: "error",
        message: message,
    });
})


module.exports = app;