import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {UtilService} from "../../../services/util.service";
import {WebService} from "../../../services/web.service";
import {Website} from "../../../models/website.model";

@Component({
  selector: "app-deploy",
  templateUrl: "deploy.component.html"
})
export class DeployComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  id:any;
  webSite:Website = new Website();
  alertType = "success";
  showAlert = false;
  alertHeading = "Updated";
  alertContent = "Website data updated successfully";

  websiteContent:string;


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
    if(!localStorage.getItem("webisteID")){
      window.location.href = "#/dashboard";
    }
    this.webService.getData(localStorage.getItem("webisteID")).subscribe(
        response=>{
          this.id = localStorage.getItem("webisteID");
          this.webSite = response;
        },
        error => {
          window.location.href = "#/dashboard";
        }
    )
    this.webService.getWebsite(localStorage.getItem("webisteID")).subscribe(
        response=>{
          if(response){
            this.websiteContent = response.content;
          }
        }
    )
  }

  ngOnInit() {

  }
  ngOnDestroy() {
  }

  saveDeploy(){
    this.webService.updateDeployData(this.webSite,this.id).subscribe(
      response=>{
        this.webSite = response;
        this.showAlert = true;
      }
    );
  }

  saveServer(){
    this.webService.updateServerData(this.webSite,this.id).subscribe(
        response=>{
          this.webSite = response;
          this.showAlert = true;
        }
    );
  }

  hideAlert(){
    this.showAlert = false;
  }

  savePreference(){
    this.webService.updatePersonalizedData(this.webSite,this.id).subscribe(
        response=>{
          this.webSite = response;
          this.showAlert = true;
        }
    );
  }

  deployWebSite(){
    this.webService.deployWebsite(this.id).subscribe(
        response=>{
          if(response){
            window.location.href = "#/dashboard";
          }
        }
    )
  }

}
