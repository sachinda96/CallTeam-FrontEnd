import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {NavComponent} from "./view/nav/nav.component";
import {HomeComponent} from "./view/home/home.component";
import {NavDashboardComponent} from "./view/nav-dashboard/nav-dashboard.component";
import {DashboardComponent} from "./view/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: NavComponent,
  children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'dashboard',
      component: NavDashboardComponent,
      children:[
        {
          path: '',
          component: DashboardComponent
        }
      ]
    }


  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
