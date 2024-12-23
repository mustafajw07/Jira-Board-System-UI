import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Board } from '../../models/Board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-all-boards',
  templateUrl: './all-boards.component.html'
})
export class AllBoardsComponent implements OnInit{
  boards: Board[] = []
  searchTerm = '';
  displayedColumns: string[] = ['boardName', 'description'];
  dataSource = new MatTableDataSource();
  loading = false
  constructor (private router: Router , private boardService: BoardService) {}

  ngOnInit(): void {
    this.getAllBoards();
  }

  getAllBoards(){
    this.loading = true;
    this.boardService.getAllBoards().subscribe({
      next: (result) => {
        this.boards = result;
        this.dataSource.filteredData = this.boards;
        this.loading = false
      },
      error(error) {console.log(error)},
      complete: () => {this.loading  = false}
    });
  }

  get filteredBoards() {
    return this.dataSource.filteredData.filter((board: any) =>
      board.boardName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openBoard(boardId: number) {
    this.router.navigate([`boards/${boardId}`]);
  }
}
