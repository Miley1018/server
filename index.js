/*import express from 'express';
import http from 'http';
import bodyParser from 'body-parser'; //node 这里还不支持es6的import 的写法
import morgan from 'morgan';
*/
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

//app setup
app.use(morgan('combined'));//login incoming request//middleware
app.use(bodyParser.json({type:'*/*'}));//parse incoming request into json,type是任何类型

//servere setup
const port = process.env.PORT||7777;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:',port);