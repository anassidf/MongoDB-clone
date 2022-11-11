import { DataArrayRounded } from '@mui/icons-material';
import fs from 'fs'
import path from 'path'
import DataBase from './DataBase';
export default class Collection{

    private name:string  ; 
    private document:string = ''
    constructor(name:string){
        
        this.name = name ; 
        // this.document = document ; 
    }


   public createCollection(dbName:string, document:{}[]):void{
        
    // ? idea >> what about fetching/reading the json file
    // ? after that convert it into js object then add 
    // ? the new document after that overrite it again
    
    let filePath = path.join(__dirname , '..' ,dbName ,this.name + '.json')  ;
    
    // read json file 
    let jsonDataReader ; 

if (fs.existsSync(filePath)){
 
    jsonDataReader  = JSON.parse(fs.readFileSync(filePath, 'utf8')); 

}
      
      

        if (fs.existsSync(filePath)){

            jsonDataReader.push(document[0])
            // only add a new document

            fs.writeFileSync(filePath  , JSON.stringify(jsonDataReader) )
        }
        else {

            fs.writeFileSync(filePath  , JSON.stringify(document) )
        }

    }



/* this methode meant to delete eather the document or the collection */
    public deleteCollection(databaseName: string, collectionName:string, documentID?:string):void{

      if (documentID) {
        const collectionLocation:string = path.join(__dirname, '..', databaseName, collectionName + ".json")
        let collectionData = JSON.parse(fs.readFileSync(collectionLocation, 'utf-8'))
        
     

        collectionData.map((element:any, index:number)=>{

            if (element.id === documentID )
                {
                    collectionData.splice(index, 1)
                }
        })
        
        
    
        fs.writeFileSync(collectionLocation, JSON.stringify(collectionData))
    }
      else {
            //  delete all documents (delete collection)

            const collectionLocation = path.join(__dirname, '..', databaseName, collectionName + ".json")
            if (fs.existsSync(collectionLocation))
            {

                fs.unlinkSync(collectionLocation)
            }
            else 
            console.log('there is no such file')



      }

    }


public updateData(dbName:string , collectionName:string, documentID:string, data:any):void{

    const collectionLocation:string = path.join(__dirname, '..', dbName, collectionName + ".json")
    let collectionData = JSON.parse(fs.readFileSync(collectionLocation, 'utf-8'))
    

    let document:any ; 

    collectionData.map((element:any, index:number)=>{

        if (element.id === documentID )
            {
                document = element;
                collectionData.splice(index, 1)
            }
    })
    
        // updating process

        for (let documentKey in document)
        {
        
        for (let dataKey in data)
        {
            if (documentKey === dataKey)
                {
                    document[documentKey] = data[dataKey]
                }
        }

        }

        console.log(document)

        collectionData.push(document)

        fs.writeFileSync(collectionLocation, JSON.stringify(collectionData))
    
}

}