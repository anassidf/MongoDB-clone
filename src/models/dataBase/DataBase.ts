import fs from 'fs';
import path from 'path'
export default  class DataBase{

private name:string ; 
private collections:number = 0 ; 


// apply singleton design pattern

private constructor(name: string){
	this.name = name ; 
}

public static databaseInstance(name:string):DataBase{
	return new DataBase(name)
}

addCollection():void{
	this.collections++ ; 
}
setName(name:string):void{
	this.name = name
}
getName():string{
	return this.name ;
}

createDataBase():void{

let directoryPath = path.join(__dirname , '..' , this.name)  

if (fs.existsSync(directoryPath))
{
 console.log('the databasae is exist just add a collection')
}
else{

	fs.mkdirSync(path.join(__dirname, '..' , this.name))
}

}



}

