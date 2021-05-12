import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
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
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import {PlanspageComponent} from "./examples/planspage/planspage.component";
import {DashboardpageComponent} from "./examples/dashboardpage/dashboardpage.component";
import {WorkshoppageComponent} from "./examples/workshoppage/workshoppage.component";
import {DndModule} from "ngx-drag-drop";
import {ComponentsModule} from "../components/components.module";
import {PaymentComponent} from "./examples/payment/payment.component";
import {DeployComponent} from "./examples/deploy/deploy.component";

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
    ComponentsModule
  ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
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
    DashboardpageComponent,
    WorkshoppageComponent,
    PaymentComponent,
    DeployComponent
  ],
  providers: []
})
export class PagesModule {}
