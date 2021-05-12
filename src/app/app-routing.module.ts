import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import {PlanspageComponent} from "./pages/examples/planspage/planspage.component";
import {DashboardpageComponent} from "./pages/examples/dashboardpage/dashboardpage.component";
import {LoginpageComponent} from "./pages/examples/loginpage/loginpage.component";
import {WorkshoppageComponent} from "./pages/examples/workshoppage/workshoppage.component";
import {PaymentComponent} from "./pages/examples/payment/payment.component";
import {DeployComponent} from "./pages/examples/deploy/deploy.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
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
