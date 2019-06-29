import { Component, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { actualTime, msToHMS, minToMs, getTimeDiff, getActualIteration } from '../functions';
// import {Observable} from 'rxjs/Rx';

export interface Player {
  id: number;
  name: string;
  rfid: string;
  money: number;
  changedAt: Date;
  group: string;
}


@Component({
  selector: 'app-show-me-time',
  templateUrl: './show-me-time.component.html',
  styleUrls: ['./show-me-time.component.css']
})
export class ShowMeTimeComponent implements OnInit {

  iteration = getActualIteration();
  players = JSON.parse(localStorage.getItem('angularTest' + this.iteration));

  player = null;
  warinings = null;

  today: Date = new Date();

  constructor() { }

  actualTime = actualTime;
  msToHMS = msToHMS;

  loadData() {
    this.iteration = getActualIteration();
    this.players = JSON.parse(localStorage.getItem('angularTest' + this.iteration));
  }

  onKey(event) {
    this.loadData();
    console.log(event.target.value);
    const restult = this.players.find(player => player.rfid == event.target.value);
    if (! restult) {
      console.log('WRONG RFID');
      this.player = null;
      this.warinings = true;
      setTimeout(() => {
        this.warinings = false;
        },
      2500);
    } else {
      console.log(restult.name);
      this.warinings = false;
      this.player = restult;
      setTimeout(() => {
        this.player = null;
        },
      2500);
    }
    // console.log(JSON.parse(localStorage.getItem('angularTest')));
    (document.getElementById('inputId') as any).value = '';
    document.getElementById('inputId').focus();

  }

  ngOnInit() {
  }

}
