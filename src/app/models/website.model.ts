export class Website {
    id:number;
    name:string;
    user:number;
    type:string;
    content:string;
    searchKeys:string;
    expectedUsers:string;
    serverLocation:string;
    domainName:string;
    contentStorage:string;
    serverType:string;
    backUps:string;
    preference:string;
    url:string;


    constructor() {
        this.name = "";
        this.user = 0;
        this.type = "";
        this.content = "";
        this.searchKeys = null;
        this.expectedUsers = null;
        this.serverLocation = null;
        this.domainName = null;
        this.contentStorage = null;
        this.serverType = null;
        this.backUps = null;
        this.preference = null;
        this.url = null;
    }
}
