import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getActualIteration } from '../functions';

export interface Player {
  id: number;
  name: string;
  rfid: string;
  money: number;
  changedAt: Date;
  group: string;
}

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.css']
})
export class ManagePlayersComponent implements OnInit {

  iteration = getActualIteration();
  players = JSON.parse(localStorage.getItem('angularTest' + this.iteration));
  actualPlayer = null;

  profileForm = new FormGroup({
    name: new FormControl(''),
    rfid: new FormControl(''),
    money: new FormControl(''),
    group: new FormControl(''),
  });


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    let tmpId = 0;
    if (this.players.length > 0) {
      tmpId = this.players[this.players.length - 1].id + 1;
    };

    this.actualPlayer = {
      id: tmpId,
      name: this.profileForm.value.name,
      rfid: this.profileForm.value.rfid,
      money: this.profileForm.value.money,
      changedAt: new Date().toString(),
      group: this.profileForm.value.group
    };

    console.log('New Player:', this.actualPlayer);
    this.players.push(this.actualPlayer);
    console.log('New Player:', this.players);
    localStorage.setItem('angularTest' + this.iteration, JSON.stringify(this.players));
    this.profileForm.reset();
  }

  constructor() { }

  ngOnInit() {
    if (!this.players) {
      this.players = [];
    }
  }

}
