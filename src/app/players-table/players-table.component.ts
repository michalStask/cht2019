import {Component, OnInit, ViewChild, OnChanges} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { actualTime, msToHMS, minToMs, getTimeDiff } from '../functions';

export interface Player {
  id: number;
  name: string;
  rfid: string;
  money: number;
  changedAt: Date;
  group: string;
}

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit, OnChanges {
  players = JSON.parse(localStorage.getItem('angularTest'));

  displayedColumns: string[] = ['id', 'name', 'rfid', 'money', 'last-change', 'actual-time', 'group', 'change', 'action'];
  dataSource = new MatTableDataSource(this.players);


  constructor() {
   }

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.players = JSON.parse(localStorage.getItem('angularTest'));
  }

  actualTime = actualTime;
  msToHMS = msToHMS;
  // minToMs = minToMs;
  // getTimeDiff = getTimeDiff;


  onClickSave(player) {
    if ((document.getElementById(player.id) as any).value != '') {
      this.players.forEach(element => {
        if (element.id == player.id) {
          console.log(player.name + 'actual', actualTime(player) / 1000 / 60);
          console.log(player.name + 'value', (document.getElementById(player.id) as any).value);
          element.money = Math.round(((actualTime(player) / 1000 / 60) + parseFloat((document.getElementById(player.id) as any).value)) * 100) / 100;
          element.changedAt = new Date();
          (document.getElementById(player.id) as any).value = '';
        }
      });
      localStorage.setItem('angularTest', JSON.stringify(this.players));
    } else {
      console.log('Enter some value');
    }
  }


  clickBackup() {
    localStorage.setItem('angularTest', JSON.stringify(this.players));
    const theJSON = JSON.stringify(this.players);
    const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(theJSON);

    const a = document.createElement('a');
    a.href = uri;
    a.innerHTML = 'Right-click and choose \'save as...\'';
    const myAnchor = document.getElementById('saver');
    myAnchor.parentNode.replaceChild(a, myAnchor);
  }


  clickSaveAll() {
    console.log('SAVE ALL');
    console.log(document.getElementsByClassName('rowSaveBtn'));
    // document.getElementsByClassName('rowSaveBtn').array.forEach(element => {
    //   element.click();
    // });
  }


  selectedFile: File;

  fileChange(event) {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    // fileReader.onload = () => {
    // console.log(JSON.parse(fileReader.result[0]));
    // }
    // fileReader.onerror = (error) => {
    //   console.log(error);
    // }
  }

}
