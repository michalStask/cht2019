import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowMeTimeComponent } from './show-me-time/show-me-time.component';
import { PlayersTableComponent } from './players-table/players-table.component';
import { ManagePlayersComponent } from './manage-players/manage-players.component';

const routes: Routes = [
  { path: 'time', component: ShowMeTimeComponent },
  { path: 'players', component: PlayersTableComponent},
  { path: 'admin', component: ManagePlayersComponent},
  { path: '', redirectTo: '/time', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
