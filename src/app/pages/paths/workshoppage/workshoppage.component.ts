import { Component, OnInit, OnDestroy } from "@angular/core";
import {DndDropEvent} from "ngx-drag-drop";
import {AuthService} from "../../../services/auth.service";

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

  page:any;
  navBarLogo:string;
  navBarLink1:string;
  navBarLink2:string;
  navBarLink3:string;

  bannerHeader:string;
  bannerContent:string = "Enter your banner text here";

  constructor(private authService:AuthService) {}

  ngOnInit() {
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
    this.alertType = "success";
    this.alertHeading = "Please wait"
    this.alertContent = "We are creating your web site";
    this.showAlert = true;
    this.createHTML();
  }

  createHTML(){
    let html = "<html>" +
        "<head>"
        "</html>"
  }
}

export class ComponentData {
  type:string;
  html:string;
  background:string;
}
