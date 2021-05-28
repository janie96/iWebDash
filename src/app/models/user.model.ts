export class User {
    id:number;
    username:string;
    email:string;
    password:string;
    role:Array<string>;

    constructor() {
        this.id = 0;
        this.username = "";
        this.email = "";
        this.password = "";
        this.role = [];
    }
}
