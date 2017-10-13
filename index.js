/*import express from 'express';
import http from 'http';
import bodyParser from 'body-parser'; //node 这里还不支持es6的import 的写法
import morgan from 'morgan';
*/
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router= require('./router.js');
const app = express();//app = express()的意思是新建了一个HTTPserver,这样你就可以发request給它;之前的项目，用webpack来跑一个服务器;webpack的服务器功能简单，基本就负责静态文件
const mongoose = require('mongoose');

//db setup
mongoose.connect('mongodb://localhost:auth/auth');


//app setup
app.use(morgan('combined'));//login incoming request//middleware
app.use(bodyParser.json({type:'*/*'}));//parse incoming request into json,type是任何类型／／middleware
router(app);

//servere setup
const port = process.env.PORT||7777;//The process object is a global that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using require().
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:',port);