const express = require("express");
const app = express();

const userRouter = require('./userRouter.js');
const postRouter = require('./postRouter.js');


app.use('/user', userRouter);
app.use('/post', postRouter);

module.exports = app