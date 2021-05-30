export class User {
    id:number;
    username:string;
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    role:Array<string>;

    constructor() {
        this.username = "";
        this.email = "";
        this.password = "";
        this.firstName = "";
        this.lastName = "";
        this.role = [];
    }
}
