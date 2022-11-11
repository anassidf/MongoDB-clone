import fs from 'fs';
import express ,{Request, Response, Application, NextFunction}from 'express';
import {Server} from 'http';
import pug from 'pug';
import  operationsRouter  from './routes/operationsRouter';
import path from 'path'
import bodyParser from 'body-parser'

// packages setup

const app:Application = express();

// middlewares setup

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(operationsRouter);
app.use(express.static(path.join(__dirname, 'public')));






// view engine setup

app.set('views' , './views')
app.set('view engine' , 'pug')


// express server listening

const server:Server = app.listen(4000, () => {
	console.log('connected successfully on port 4000');
});
