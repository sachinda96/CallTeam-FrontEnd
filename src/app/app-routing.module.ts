import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {NavComponent} from "./view/nav/nav.component";
import {HomeComponent} from "./view/home/home.component";
import {NavDashboardComponent} from "./view/nav-dashboard/nav-dashboard.component";
import {DashboardComponent} from "./view/dashboard/dashboard.component";
import {NewMatchComponent} from "./view/new-match/new-match.component";
import {MatchpoolComponent} from "./view/matchpool/matchpool.component";
import {JoinpoolComponent} from "./view/joinpool/joinpool.component";
import {NewTournamentComponent} from "./view/new-tournament/new-tournament.component";
import {ViewTournamentsComponent} from "./view/view-tournaments/view-tournaments.component";
import {JoinTournamentsComponent} from "./view/join-tournaments/join-tournaments.component";
import {ViewStadiumComponent} from "./view/view-stadium/view-stadium.component";
import {StadiumDetailsComponent} from "./view/stadium-details/stadium-details.component";
import {PlayersComponent} from "./view/players/players.component";
import {PlayerComponent} from "./view/player/player.component";
import {AdminDashboardComponent} from "./view/admin-dashboard/admin-dashboard.component";
import {AdminLoginComponent} from "./view/admin-login/admin-login.component";

const routes: Routes = [
  { path: '', component: NavComponent,
  children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'newmatch',
      component: NewMatchComponent
    },
    {
      path: 'matchpool',
      component: MatchpoolComponent
    },
    {
      path: 'joinpool/:id',
      component: JoinpoolComponent
    },
    {
      path: 'newtournament',
      component: NewTournamentComponent
    },
    {
      path: 'viewtournament',
      component: ViewTournamentsComponent
    },
    {
      path: 'jointournament/:id',
      component: JoinTournamentsComponent
    },
    {
      path: 'stadium',
      component: ViewStadiumComponent
    },
    {
      path: 'stadiumdetails/:id',
      component: StadiumDetailsComponent
    },
    {
      path: 'players',
      component: PlayersComponent
    },
    {
      path: 'player/:id',
      component: PlayerComponent
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
  {
    path: 'admin',
    component: AdminLoginComponent
  },
  {
    path: 'admindashboard',
    component: AdminDashboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
