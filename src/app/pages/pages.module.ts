import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./paths/profilepage/profilepage.component";
import { RegisterpageComponent } from "./paths/registerpage/registerpage.component";
import {DndModule} from "ngx-drag-drop";
import {ComponentsModule} from "../components/components.module";
import {LandingpageComponent} from "./paths/landingpage/landingpage.component";
import {LoginpageComponent} from "./paths/loginpage/loginpage.component";
import {PlanspageComponent} from "./paths/planspage/planspage.component";
import {DashboardpageComponent} from "./paths/dashboardpage/dashboardpage.component";
import {WorkshoppageComponent} from "./paths/workshoppage/workshoppage.component";
import {PaymentComponent} from "./paths/payment/payment.component";
import {DeployComponent} from "./paths/deploy/deploy.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    DndModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    LoginpageComponent,
    PlanspageComponent,
    DashboardpageComponent,
    WorkshoppageComponent,
    PaymentComponent,
    DeployComponent

  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    PlanspageComponent,
    LoginpageComponent,
    DashboardpageComponent,
    WorkshoppageComponent,
    PaymentComponent,
    DeployComponent
  ],
  providers: []
})
export class PagesModule {}
