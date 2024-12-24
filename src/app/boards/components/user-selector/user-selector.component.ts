import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/ProjectBoard';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent implements OnInit{
  @Input() set users(data: User[]){
    this._allUsers = data;
  };
  protected _allUsers: User[] = [];

  ngOnInit(): void {
    console.log(this._allUsers);
  }
}
