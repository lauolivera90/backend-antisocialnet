const express = require("express");
const app = express();

const userRouter = require('./userRouter.js');
const postRouter = require('./postRouter.js');
const tagRouter = require('./tagRouter.js');
const commentRouter = require('./commentRouter.js');



app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/tag', tagRouter);
app.use('/comment', commentRouter);


module.exports = app