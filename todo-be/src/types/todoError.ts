export class TodoError extends Error{
    constructor(code : number, message:string)
    {
        super(message);
        this.code = code;
    }

    code:number;
}