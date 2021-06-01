import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";
import {AuthService} from "../../../services/auth.service";
import {Website} from "../../../models/website.model";
import {WebService} from "../../../services/web.service";
import {Bug} from "../../../models/bug.model";

@Component({
  selector: "app-dashboardpage",
  templateUrl: "dashboardpage.html"
})
export class DashboardpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  bug:Bug = new Bug()

  websiteList: Array<Website>;

  constructor(private authService: AuthService,private websiteService:WebService) {
    this.websiteList = [];
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
    websiteService.getWebsiteList(authService.currentUserValue).subscribe(
        response=>{
          if(response){
            this.websiteList = response;
            console.log(this.websiteList);
          }
        }
    )
  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    var slider = document.getElementById("sliderRegular");

    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById("sliderDouble");

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  }

  logout(){
    this.authService.logout();
    window.location.href = "#/landing";
  }

  reportBug(){
    this.bug.user_id = this.authService.currentUserValue;
    this.websiteService.reportBug(this.bug).subscribe(
        response=>{
          console.log(response);
        }
    )
  }



  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
}
