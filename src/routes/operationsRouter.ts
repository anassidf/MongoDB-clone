import express ,{Request, Response, NextFunction}from 'express';
import DatabaseBuilder from '../models/dataBase/dataBaseExcution'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';
import {createDataBase, readDatabase, deleteDatabase, updateDatabase, getCreatePage, getReadPage, getDeletePage, getUpdatePage} from '../controllers/operationsController'  

// database builder instance

const dbBuilder = new DatabaseBuilder() ; 



// setup the router

const router = express.Router();

router.route('/').get(getCreatePage).post(createDataBase)


/* CRUD operations */
// ! read

router.post('/read', readDatabase)

router.get('/read_form' , getReadPage)



// !delete

router.get('/delete_form' , getDeletePage)


router.post('/delete',deleteDatabase)





// !update

router.get('/update_form',getUpdatePage)




router.post('/update', updateDatabase )





export default router ; 

 
