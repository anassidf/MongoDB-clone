import DataBase from "./DataBase"
import Collection from "./Collection"


interface IBuilder{
    create(dbName:string, collectionName:string, document:{}[]):void ;
    deleteOperation(dbName:string , collectionName:string, documentID?:string):void ; 
    updateOperation(dbName:string , collectionName:string, documentID:string, data:any):void ; 
} 




class DatabaseBuilder implements IBuilder{


    // *************creation*****************

    create(dbName: string, collectionName: string, document: {}[]): void {
       
    this.createDB(dbName);
    this.createCollection(collectionName, dbName, document);

    }

    // *************deletion*****************

    deleteOperation(dbName: string, collectionName: string, documentID?: string | undefined): void {
        if(documentID){

         this.deleteDocument(dbName, collectionName, documentID) ; 
        
        }
        else 
            this.deleteCollection(dbName,collectionName)
    }

    // *************updating*****************

    updateOperation(dbName: string, collectionName: string, documentID: string, data: any): void {
       
        const collection = new Collection(collectionName);

        collection.updateData(dbName , collectionName, documentID, data)
    }
   


    // ---------------------------create methodes--------------------------

         createDB (name:string):void {

            const DB = DataBase.databaseInstance(name) ; 
            
            DB.createDataBase()  ;
            DB.addCollection();
        
        
        }

        
        createCollection (name:string, dbName:string, document:{}[]):void  {
          
            let collection = new Collection(name)
            
            collection.createCollection(dbName, document)
    
            }

    // ---------------------------delete methodes--------------------------



        deleteCollection  (dbName:string , collectionName:string):void{
            const collection = new Collection(collectionName) ; 
            collection.deleteCollection(dbName, collectionName)

        }

        deleteDocument (dbName:string , collectionName:string, documentID:string):void{

            const collection = new Collection(collectionName) ; 
            collection.deleteCollection(dbName, collectionName, documentID)
    

            }

    // ---------------------------update methodes--------------------------

}





export default DatabaseBuilder ; 
