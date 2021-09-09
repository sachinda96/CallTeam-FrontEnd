import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';
import { NavComponent } from './view/nav/nav.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { NavDashboardComponent } from './view/nav-dashboard/nav-dashboard.component';
import {DashboardComponent} from "./view/dashboard/dashboard.component";
import {DatePipe} from "@angular/common";
import { NewMatchComponent } from './view/new-match/new-match.component';
import { MatchpoolComponent } from './view/matchpool/matchpool.component';
import { JoinpoolComponent } from './view/joinpool/joinpool.component';
import { NewTournamentComponent } from './view/new-tournament/new-tournament.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    DashboardComponent,
    NavDashboardComponent,
    NewMatchComponent,
    MatchpoolComponent,
    JoinpoolComponent,
    NewTournamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
