import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { User } from '../../models/ProjectBoard';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
})
export class UserSelectorComponent implements OnInit {
  @Input() set users(data: User[]) {
    this._allUsers = data;
  }
  protected _allUsers: User[] = [];
  protected selectedFilter: number | null = null;

  @Output() selectedUser = new EventEmitter<string>();

  ngOnInit(): void {}

  toggleFilter(index: number): void {
    this.selectedFilter = this.selectedFilter === index ? null : index;
    if (this.selectedFilter !== null) {
      const selectedUser = this._allUsers[this.selectedFilter];
      this.selectedUser.emit(selectedUser.id);
    } else {
      this.selectedUser.emit('');
    }
  }
}
