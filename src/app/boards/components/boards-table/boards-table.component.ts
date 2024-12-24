import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Board } from '../../models/Board';

@Component({
  selector: 'app-boards-table',
  templateUrl: './boards-table.component.html',
})
export class BoardsTableComponent {
  @Input() set boards(data: Board[]) {
    this._allBoards = data;
    this.dataSource.filteredData = this._allBoards;
  }
  @Input() displayedColumns?: string[];

  protected searchTerm = '';
  protected dataSource = new MatTableDataSource();

  private _allBoards: Board[] = [];

  constructor(private router: Router) {}

  get filteredBoards() {
    return this.dataSource.filteredData.filter((board: any) =>
      board.boardName.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  openBoard(boardId: number) {
    this.router.navigate([`boards/${boardId}`]);
  }
}
