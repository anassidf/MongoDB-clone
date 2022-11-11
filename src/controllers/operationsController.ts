import express ,{Request, Response}from 'express';
import DatabaseBuilder from '../models/dataBase/dataBaseExcution'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';



// database builder instance

const dbBuilder = new DatabaseBuilder() ; 




const createDataBase = (req:Request, res:Response)=>{
    
    let DB_name:string = req.body.databaseName ; 
    let collection_name:string = req.body.collectionName ; 
    
    let document:any = []
    
    let documentTypes = req.body.fieldType ; 
    let documentValues = req.body.fieldValue ; 
    
    // console.log(req.body)
    let tempObj:any = {}
    
    
    if (typeof req?.body?.fieldName == "object"){
    
        req?.body?.fieldName?.map((item:any, index:number)=>{
        
             tempObj[item]  = documentValues[index]
             tempObj['id'] = uuidv4();
             
        })
    }
    else {
        tempObj[req?.body?.fieldName] = req?.body?.fieldValue
        tempObj['id'] = uuidv4();
    }
    
    document.push(tempObj)
    
    
    
    dbBuilder.create(DB_name, collection_name, document)
    
    res.status(200).json(req.body)
    
        }

   

// ************************************************************************************************

const readDatabase = (req:Request, res:Response) => {

	const databaseName = req.body.db 
	const collectionName = req.body.collection 
	const dataLocation = path.join(__dirname, '..' , 'models' ,databaseName as string , collectionName as string + ".json")
	const data = fs.readFileSync(dataLocation, 'utf8') 


	// filter the data for specific document

	const parsedData = JSON.parse(data)

	if (req?.body?.id )
	{
		 
		let wantedDocument:any
		// then the client wants a specific document

		parsedData.map((element:any)=>{

			if (element?.id === req?.body?.id)
				{
					wantedDocument = element ; 
				}
				
				
		})

		res.json(wantedDocument)

	}
	else if(req.body.db) {

		// database name + collection name
	
		res.json(data)
	}
	
	
	
}


const deleteDatabase =  (req:Request, res:Response) => {

	const databaseName = req?.body?.db 
	const collectionName = req?.body?.collection 
	const documentID = req?.body?.id 
	
	if(documentID)
	{
		dbBuilder.deleteOperation(databaseName, collectionName, documentID)
		res.json("Document Deleted Successfully 🚀🚀")
	}

	else {

		dbBuilder.deleteOperation(databaseName, collectionName)
		res.json("Collection Deleted Successfully 🚀🚀")
	}


	
	

	
	
}


const updateDatabase =(req:Request, res:Response) => {

	const databaseName = req?.body?.db 
	const collectionName = req?.body?.collection 
	const documentID = req?.body?.id 
	
 	// extract data from the body object properly

	

	

	let documentValues = req.body.fieldValue ; 
	let tempObj:any = {}

	if (typeof req?.body?.fieldName == "object"){
		
		req?.body?.fieldName?.map((item:any, index:number)=>{
		
			 tempObj[item]  = documentValues[index]
			
			 
		})
	}
	else {
		tempObj[req?.body?.fieldName] = req.body.fieldValue
	}

	dbBuilder.updateOperation( databaseName, collectionName, documentID, tempObj )
		
		
		res.json("Document Updated Successfully 🚀🚀")
	

	
	
}


// ****************************getters*******************************

const getCreatePage=(req:Request, res:Response)=>{

    res.render('../views/pages/Home.pug', {message: 'this is a message'});
    
    
    
    }
const getReadPage=(req:Request, res:Response)=>{
	res.render('../views/readRequestForm.pug')
}
const getDeletePage=(req:Request, res:Response)=>{
	res.render('../views/deleteRequestForm.pug')
}
const getUpdatePage= (req:Request, res:Response)=>{
	res.render('../views/updateRequestForm.pug')

}




export {createDataBase , readDatabase, deleteDatabase, updateDatabase, getCreatePage, getReadPage, getDeletePage, getUpdatePage}