import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Board } from '../../models/Board';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boards-table',
  templateUrl: './boards-table.component.html'
})
export class BoardsTableComponent {
  @Input() set boards(data: Board[]){
    this._allBoards = data;
    this.dataSource.filteredData = this._allBoards;
  };
  @Input() displayedColumns?: string[];

  searchTerm = '';
  private _allBoards:Board[] = []
  dataSource = new MatTableDataSource();

  constructor (private router: Router) {}

  get filteredBoards() {
    return this.dataSource.filteredData.filter((board: any) =>
      board.boardName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openBoard(boardId: number) {
    this.router.navigate([`boards/${boardId}`]);
  }
}