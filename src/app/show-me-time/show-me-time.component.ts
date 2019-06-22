import { Component, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { actualTime, msToHMS, minToMs, getTimeDiff } from '../functions';
// import {Observable} from 'rxjs/Rx';

export interface Player {
  id: number;
  name: string;
  rfid: string;
  money: number;
  changedAt: Date;
  group: string;
}

const PLAYERS: Player[] = [
  {
    id: 1,
    name: 'Miso',
    rfid: '123',
    money: 300,
    changedAt: new Date('19 Jun 2019, 00:00:00'),
    group: 'group1'
  },
  {
    id: 2,
    name: 'Jozko',
    rfid: '456',
    money: 240,
    changedAt: new Date('17 Jun 2019, 09:00:00'),
    group: 'group1'
  },
  {
    id: 3,
    name: 'Ondrej',
    rfid: '789',
    money: 1440,
    changedAt: new Date('20 Jun 2019, 19:00:00'),
    group: 'group2'
  }
];

@Component({
  selector: 'app-show-me-time',
  templateUrl: './show-me-time.component.html',
  styleUrls: ['./show-me-time.component.css']
})
export class ShowMeTimeComponent implements OnInit {

  players = JSON.parse(localStorage.getItem('angularTest'));

  player = null;

  today: Date = new Date();

  constructor() { }

  actualTime = actualTime;
  msToHMS = msToHMS;

  loadData() {
    this.players = JSON.parse(localStorage.getItem('angularTest'));
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
      document.getElementById('nameOutput').innerHTML = restult.name;
      document.getElementById('groupOutput').innerHTML = restult.group;
      document.getElementById('timeOutput').innerHTML = '' + msToHMS(actualTime(restult));
      setTimeout(() => {
        this.player = null;
        },
      2500);
    }
    console.log(JSON.parse(localStorage.getItem('angularTest')));
    (document.getElementById('inputId') as any).value = '';
    document.getElementById('inputId').focus();

  }




  // onClick(player) {
  //   console.log('Clicked', player);
  //   console.log((document.getElementById(player.id) as any).value);
  //   this.players.forEach(element => {
  //     if (element.id == player.id) {
  //       console.log(player.name + 'actual', this.actualTime(player) / 1000 / 60);
  //       console.log(player.name + 'value', (document.getElementById(player.id) as any).value);
  //       element.money = (this.actualTime(player) / 1000 / 60) + parseFloat((document.getElementById(player.id) as any).value);
  //       element.changedAt = new Date();
  //     }
  //   });
  //   localStorage.setItem('angularTest', JSON.stringify(this.players));
  // }


  // clickSaveAll() {
  //   console.log('SAVE ALL');
  //   console.log(document.getElementsByClassName('rowSaveBtn'));
  //   // document.getElementsByClassName('rowSaveBtn').array.forEach(element => {
  //   //   element.click();
  //   // });
  // }

  // clickBackup() {
  //   localStorage.setItem('angularTest', JSON.stringify(this.players));
  //   const theJSON = JSON.stringify(this.players);
  //   const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(theJSON);

  //   const a = document.createElement('a');
  //   a.href = uri;
  //   a.innerHTML = 'Right-click and choose \'save as...\'';
  //   const myAnchor = document.getElementById('saver');
  //   myAnchor.parentNode.replaceChild(a, myAnchor);
  // }

  ngOnInit() {
    // console.log(this.players);
    setInterval(() => {
      this.today
    })
  }

}
