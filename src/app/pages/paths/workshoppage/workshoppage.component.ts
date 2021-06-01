import { Component, OnInit, OnDestroy } from "@angular/core";
import {DndDropEvent} from "ngx-drag-drop";
import {AuthService} from "../../../services/auth.service";
import {FileUploader} from "ng2-file-upload";
import {UtilService} from "../../../services/util.service";
import {WebService} from "../../../services/web.service";
import {Website} from "../../../models/website.model";


@Component({
  selector: "app-workshoppage",
  templateUrl: "workshoppage.html"
})
export class WorkshoppageComponent implements OnInit, OnDestroy {

  navbarData = "<span class='text-white' >Drag your preferred navbar</span>";
  bannerData = "<span class='text-white'>Drag your preferred banner</span>";
  cardData = "";
  navBarClass = "";
  bannerClass = "";
  cardsMoved:boolean;
  showStyle:boolean = false;
  color:string;
  actionLabelRight = "Dropzone";
  actionLabelLeft = "Components";
  navAdded = false;
  bannerAdded = false;
  cardsAdded = false;
  showAddComponents:boolean = true;
  showAddAddContent:boolean = false;
  alertType = "danger";
  showAlert = false;
  alertHeading = "Error"
  alertContent = "Error"
  showPrgress:boolean = false;
  timer:any;
  progressAmount = 0;
  public uploader: FileUploader = new FileUploader({ url: '/api/imageUpload', itemAlias: 'file',headers:[{name:"Authorization",value:"Bearer "+this.utilService.getCookie("token")}] });

  page:any;
  navBarLogo:string;
  navBarLink1:string;
  navBarLink2:string;
  navBarLink3:string;

  bannerHeader:string;
  bannerContent:string = "Enter your banner text here";

  cardArr:Array<Card>;
  selectedCardIndex:number;
  HTML:string;

  constructor(private authService:AuthService, private utilService: UtilService,private webService: WebService) {

    if(authService.currentUserValue){
      this.authService.getUser(authService.currentUserValue).subscribe(
          response=>{
          },error => {
            window.location.href = "#/landing";
          }
      )
    }else{
      window.location.href = "#/landing";
    }
  }

  ngOnInit() {
    this.cardArr = [];
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.cardArr[this.selectedCardIndex].image = "http://localhost/image/"+response;
      console.log('FileUpload:uploaded successfully:', item, status, response,headers);
      // alert('Your file has been uploaded successfully');
    };
  }
  ngOnDestroy() {

  }

  onDragover(event:DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }

  clearAll(){
    this.cardData = "";
    this.cardsMoved = false;
    this.navbarData = "<span class='text-white'>Drag your preferred navbar</span>";
    this.bannerData = "<span class='text-white'>Drag your preferred banner</span>";
  }

  onDrop(event:DndDropEvent) {
    this.showStyle = false;
    if(event.data){
      let componentData:ComponentData = event.data;
      switch (componentData.type){
        case 'NAV':
          this.navBarClass = componentData.background;
          this.navbarData = componentData.html;
          this.navAdded =true;
          break;
        case 'BANNER':
          this.bannerClass = componentData.background;
          this.bannerData = componentData.html;
          this.bannerAdded = true;
          break;
        case 'CARD':
          this.cardsMoved = true;
          this.cardsAdded = true;
          this.cardData = this.cardData + componentData.html;
          let card:Card=new Card();
          card.background = componentData.background;
          this.cardArr.push(card);
          break;
        default:
          break;
      }
    }
    console.log(event);
  }

  styleChange($event){
    this.showStyle = $event;
  }

  proceedToEdit(){
    if(this.navAdded && this.cardsAdded && this.bannerAdded){
      this.showAddComponents = false;
      this.showAddAddContent = true;
      this.createPage();
    }else{
      this.alertType = "danger";
      this.alertHeading = "Error"
      this.alertContent = "You haven't added components to your website";
      this.showAlert = true;
    }
  }

  createPage(){
    this.page = this.navbarData + this.bannerData + this.cardData;
  }


  hideAlert(){
    this.showAlert = false;
  }

  logout(){
    this.authService.logout();
    window.location.href = "#/landing";
  }
  backToDashboad(){
    window.location.href = "#/dashboard";
  }

  goBack(){
    this.showAddComponents = true;
    this.showAddAddContent = false;
  }

  proceedToCreate(){
    this.showAddComponents = false;
    this.showAddAddContent = false;
    this.showPrgress = true;
    this.progressAmount = 0;
    this.createHTML();
    this.initiateTimer();

  }

  initiateTimer() {
    this.timer = setTimeout(() => {
      this.progressAmount +=100;
      let website:Website = new Website();
      website.content = this.HTML;
      website.name = "";
      website.type = "";
      website.user = this.authService.currentUserValue;
      this.webService.create(website).subscribe(
          response=>{
            if(response && response.id){
              localStorage.setItem("webisteID",response.id.toString());
              window.location.href = "#/deploy";
            }
            console.log(response);
          }
      )
    }, 1500);
  }

  createHTML(){
    let html = "<html>";
      html += "<head>";
      html += "    <meta charset=\"utf-8\"/>\n" +
          "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"/>\n" +
          "    <link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"./assets/img/apple-icon.png\"/>\n" +
          "    <link rel=\"icon\" type=\"image/png\" href=\"./assets/img/favicon.png\"/>\n" +
          "    <!--     Fonts and icons     -->\n" +
          "    <style type=\"text/css\">@font-face{font-family:'Poppins';font-style:normal;font-weight:200;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLFj_Z1xlEw.woff) format('woff');}@font-face{font-family:'Poppins';font-style:normal;font-weight:300;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z1xlEw.woff) format('woff');}@font-face{font-family:'Poppins';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfedA.woff) format('woff');}@font-face{font-family:'Poppins';font-style:normal;font-weight:600;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1xlEw.woff) format('woff');}@font-face{font-family:'Poppins';font-style:normal;font-weight:700;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlEw.woff) format('woff');}@font-face{font-family:'Poppins';font-style:normal;font-weight:800;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDD4Z1xlEw.woff) format('woff');}@font-face{font-family:'Poppins';font-style:normal;font-weight:200;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLFj_Z11lFd2JQEl8qw.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;}@font-face{font-family:'Poppins';font-style:normal;font-weight:200;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLFj_Z1JlFd2JQEl8qw.woff2) format('woff2');unicode-range:U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Poppins';font-style:normal;font-weight:200;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLFj_Z1xlFd2JQEk.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Poppins';font-style:normal;font-weight:300;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z11lFd2JQEl8qw.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;}@font-face{font-family:'Poppins';font-style:normal;font-weight:300;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z1JlFd2JQEl8qw.woff2) format('woff2');unicode-range:U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Poppins';font-style:normal;font-weight:300;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z1xlFd2JQEk.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Poppins';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;}@font-face{font-family:'Poppins';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2) format('woff2');unicode-range:U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Poppins';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Poppins';font-style:normal;font-weight:600;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z11lFd2JQEl8qw.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;}@font-face{font-family:'Poppins';font-style:normal;font-weight:600;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1JlFd2JQEl8qw.woff2) format('woff2');unicode-range:U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Poppins';font-style:normal;font-weight:600;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Poppins';font-style:normal;font-weight:700;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z11lFd2JQEl8qw.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;}@font-face{font-family:'Poppins';font-style:normal;font-weight:700;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1JlFd2JQEl8qw.woff2) format('woff2');unicode-range:U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Poppins';font-style:normal;font-weight:700;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Poppins';font-style:normal;font-weight:800;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDD4Z11lFd2JQEl8qw.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;}@font-face{font-family:'Poppins';font-style:normal;font-weight:800;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDD4Z1JlFd2JQEl8qw.woff2) format('woff2');unicode-range:U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Poppins';font-style:normal;font-weight:800;src:url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDD4Z1xlFd2JQEk.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}</style>\n" +
          "    <link href=\"https://use.fontawesome.com/releases/v5.0.6/css/all.css\" rel=\"stylesheet\"/>\n" +
          "    <style>\n" +
          "\n" +
          "      .dragging{\n" +
          "        border: 2px solid white;\n" +
          "        border-radius: 5px;\n" +
          "      }\n" +
          "\n" +
          "      .card-no-margin{\n" +
          "        margin-top: 0px;\n" +
          "      }\n" +
          "      /* width */\n" +
          "      ::-webkit-scrollbar {\n" +
          "        width: 7px;\n" +
          "      }\n" +
          "\n" +
          "      /* Track */\n" +
          "      ::-webkit-scrollbar-track {\n" +
          "        background: transparent;\n" +
          "      }\n" +
          "\n" +
          "      /* Handle */\n" +
          "      ::-webkit-scrollbar-thumb {\n" +
          "        background: #212121;\n" +
          "      }\n" +
          "\n" +
          "      /* Handle on hover */\n" +
          "      ::-webkit-scrollbar-thumb:hover {\n" +
          "        background: #212121;\n" +
          "      }\n" +
          "    </style>\n" +
          "  <link rel=\"stylesheet\" href=\"styles.css\">";
      html += "<title>";
      html += "website</title>";
      html += "</head>";
      html += '<nav class="navbar navbar-expand-lg '+this.navBarClass+'">';
      html += '<div class="container">';
      html += '<div class="navbar-brand">';
      html += this.navBarLogo;
      html += '</div>';
      html += '<div class="collapse navbar-collapse" id="navbarNav">';
      html += '<ul class="navbar-nav">';
      html += '<li class="nav-item active">';
      html += '<div class="nav-link" style="margin-left: 100px;">';
      html += this.navBarLink1;
      html += '</div></li>';
      html += '<li class="nav-item">';
      html += '<div class="nav-link" style="margin-left: 100px;">';
      html += this.navBarLink2;
      html += '</div></li>';
      html += '<li class="nav-item active">';
      html += '<div class="nav-link" style="margin-left: 100px;">';
      html += this.navBarLink3;
      html += '</div></li>';
      html += '</ul>';
      html += '</div>';
      html += '</div>';
      html += '</nav>';
      html += '<div class="card '+this.bannerClass+'">';
      html += '<div class="card-header">';
      html += this.bannerHeader;
      html += '</div>';
      html += '<div class="card-body">';
      html += '<h4 class="card-title">';
      html += this.bannerContent;
      html += '</h4>';
      html += '</div>';
      html += '</div>';
      html += '<div class="row">';
      this.cardArr.forEach(card=>{
        html += '<div class="col-sm-4 ">';
        html += '<div class="card card-coin card-plain">';
        html += '<div class="card-header" style="margin-top: 0px;">';
        html += '<img width="150" height="150" class="img-center img-fluid" src="'+card.image+'"/>';
        html += '</div>';
        html += '<div class="card-body">';
        html += '<div class="row">';
        html += '<div  class="col-md-12 text-center">';
        html += '<h4 class="text-uppercase">';
        html += card.heading;
        html += '</h4>';
        html += '<span>';
        html += card.subHeading;
        html += '</span>';
        html += '<hr class="'+card?.background+'"/>';
        html += '</div>';
        html += '</div>';
        html += '<div class="row">';
        html += '<ul class="list-group">';
        html += '<li class="list-group-item">';
        html += card.content;
        html += '</li>';
        html += '</ul>';
        html += '</div>';
        html += '<div  class="card-footer text-center">';
        html += '<button  class="card-footer text-center">';
        html += card.button;
        html += '</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';
      html += '</html>';
      this.HTML = html;
  }
}

export class ComponentData {
  type:string;
  html:string;
  background:string;
}

export class Card {
  background:string;
  html:string;
  image:string;
  imageDisplay:boolean;
  heading:string;
  headingDisplay:boolean;
  subHeading:string;
  subHeadingDisplay:boolean;
  content:string;
  contentDisplay:boolean;
  button:string;
  buttonDisplay:boolean;

  constructor() {
    this.image = '';
    this.headingDisplay = true;
    this.subHeadingDisplay = true;
    this.contentDisplay = true;
    this.buttonDisplay = true;
    this.imageDisplay = true;
  }
}
