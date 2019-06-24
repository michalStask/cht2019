import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { actualTime, msToHMS, minToMs, getTimeDiff, getActualIteration } from '../functions';

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
  iteration = getActualIteration();
  players = JSON.parse(localStorage.getItem('angularTest' + this.iteration));

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
    this.iteration = getActualIteration();
    this.players = JSON.parse(localStorage.getItem('angularTest' + this.iteration));
  }

  actualTime = actualTime;
  msToHMS = msToHMS;

  // saves new player records.
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
      const tmpIteration = getActualIteration();
      localStorage.setItem('angularTest' + tmpIteration, JSON.stringify(this.players));
    } else {
      console.log('Enter some value');
    }
  }

// backu all data, create duplicate at local storage, allow user to save as the json file with data
  clickBackup() {
    this.backupData(this.players);
    const theJSON = JSON.stringify(this.players);
    const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(theJSON);

    const a = document.createElement('a');
    a.href = uri;
    a.innerHTML = 'Right-click and choose \'save as...\'';
    a.id = 'saver';
    const myAnchor = document.getElementById('saver');
    myAnchor.parentNode.replaceChild(a, myAnchor);
  }

// fire all save buttons
  clickSaveAll() {
    console.log('SAVE ALL');
    let buttons = document.getElementsByClassName('rowSaveBtn');

    Array.prototype.forEach.call(buttons, function (el) {
      // Do stuff here
      el.click();
    });
  }

  // function for create a backup of data.
  backupData(data) {
    console.log('IM here');
    let iteration = localStorage.getItem('chtIterator');
    if (iteration === null) {
      iteration = '1';
    } else {
      iteration = (parseFloat(iteration) + 1).toString();
    }
    localStorage.setItem('chtIterator', iteration);
    console.log('backup', data);
    localStorage.setItem('angularTest' + iteration , JSON.stringify(data));
    return true;
  }

  selectedFile: File;
// handle upload of file
  fileChange(event) {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = this.onReaderLoad;
    fileReader.readAsText(event.target.files[0]);
  }

  onReaderLoad(event) {
    console.log(event.target.result);
    let obj = JSON.parse(event.target.result);
    console.log('readed file:', obj);
    this.players = obj;
    console.log('readed players:', this.players);

    console.log('IM here');
    let iteration = localStorage.getItem('chtIterator');
    if (iteration === null) {
      iteration = '1';
    } else {
      iteration = (parseFloat(iteration) + 1).toString();
    }
    localStorage.setItem('chtIterator', iteration);
    console.log('backup', this.players);
    localStorage.setItem('angularTest' + iteration , JSON.stringify(this.players));
  }


}
