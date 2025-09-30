import { text } from "stream/consumers";
import { TodoError } from "./todoError";
import { UpdateTodoRequest } from "./updateTodoRequest";
import { stringify } from "querystring";
export class ToDoDataChecker{

    private constructor(){}
    private static instance : ToDoDataChecker;
    static getInstance(){
        if(!ToDoDataChecker.instance){
            ToDoDataChecker.instance = new ToDoDataChecker();
        }
        return ToDoDataChecker.instance;
    }

    id(id:any):number {
        if(isNaN(id)){
            throw new TodoError(400, 'Invalid ID');
        }
        /*if(this.lastId>0 && id>this.lastId){
            throw new TodoError(404, `todo not found with id: ${id}`);
        }*/
        return id
    }

    text(text:any):string{
        if (!(typeof text == "string" && (text = text.trim()).length > 0)) {
            throw new TodoError(400, 'Invalid Entry');
        }
        return text;
    }

    completed(compltd:any): boolean{
        if(typeof compltd != "boolean"){
            throw new TodoError(400, 'Invalid Entry');
        }
        return compltd;
    }

    update(txt:any, cmpltd:any): UpdateTodoRequest{
        const update:UpdateTodoRequest = {};
        try{
            update.text = this.text(txt);
            update.completed = this.completed(cmpltd);
            return update;
        }
        catch(error:any){
            
            if(update.text){
                return update;
            }

            update.completed = this.completed(cmpltd);
            return update;
        }
    }

    cacheLastId(id:number):void{
        this.lastId = id;
    }
    private lastId : number = 0;

}
