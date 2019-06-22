import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  players = JSON.parse(localStorage.getItem('angularTest'));
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
    this.actualPlayer = {
      id: this.players[this.players.length - 1].id + 1,
      name: this.profileForm.value.name,
      rfid: this.profileForm.value.rfid,
      money: this.profileForm.value.money,
      changedAt: new Date().toString(),
      group: this.profileForm.value.group
    };

    console.log('New Player:', this.actualPlayer);
    this.players.push(this.actualPlayer);
    console.log('New Player:', this.players);
    localStorage.setItem('angularTest', JSON.stringify(this.players));
  }

  constructor() { }

  ngOnInit() {
  }

}
