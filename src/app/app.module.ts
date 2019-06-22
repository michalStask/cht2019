import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowMeTimeComponent } from './show-me-time/show-me-time.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PlayersTableComponent } from './players-table/players-table.component';
import { TableSortingExample } from './table-sorting-example/table-sorting-example.component';
import { MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatIconModule } from '@angular/material';
import { ManagePlayersComponent } from './manage-players/manage-players.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ShowMeTimeComponent,
    PlayersTableComponent,
    TableSortingExample,
    ManagePlayersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
