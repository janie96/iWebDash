import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/paths/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/paths/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/paths/landingpage/landingpage.component";
import {PlanspageComponent} from "./pages/paths/planspage/planspage.component";
import {DashboardpageComponent} from "./pages/paths/dashboardpage/dashboardpage.component";
import {LoginpageComponent} from "./pages/paths/loginpage/loginpage.component";
import {WorkshoppageComponent} from "./pages/paths/workshoppage/workshoppage.component";
import {PaymentComponent} from "./pages/paths/payment/payment.component";
import {DeployComponent} from "./pages/paths/deploy/deploy.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: LandingpageComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "landing", component: LandingpageComponent },
  { path: "plans", component: PlanspageComponent },
  { path: "dashboard", component: DashboardpageComponent },
  { path: "workshop", component: WorkshoppageComponent },
  { path: "login", component: LoginpageComponent },
  { path: "payment", component: PaymentComponent },
  { path: "deploy", component: DeployComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
