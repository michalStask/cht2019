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

// const PLAYERS: Player[] = [
//   {
//     id: 1,
//     name: 'Miso',
//     rfid: '123',
//     money: 300,
//     changedAt: new Date('19 Jun 2019, 00:00:00'),
//     group: 'group1'
//   },
//   {
//     id: 2,
//     name: 'Jozko',
//     rfid: '456',
//     money: 240,
//     changedAt: new Date('17 Jun 2019, 09:00:00'),
//     group: 'group1'
//   },
//   {
//     id: 3,
//     name: 'Ondrej',
//     rfid: '789',
//     money: 1440,
//     changedAt: new Date('20 Jun 2019, 19:00:00'),
//     group: 'group2'
//   }
// ];

@Component({
  selector: 'app-show-me-time',
  templateUrl: './show-me-time.component.html',
  styleUrls: ['./show-me-time.component.css']
})
export class ShowMeTimeComponent implements OnInit {

  iteration = getActualIteration();
  players = JSON.parse(localStorage.getItem('angularTest' + this.iteration));

  player = null;

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
    } else {
      console.log(restult.name);
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
    // console.log(this.players);
    // setInterval(() => {
    //   this.today
    // })
  }

}
