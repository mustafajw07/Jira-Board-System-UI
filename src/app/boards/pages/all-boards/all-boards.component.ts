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
  boards: Board[] = [];
  displayedColumns: string[] = ['boardName', 'description'];
  
  loading = false;
  constructor (private router: Router , private boardService: BoardService) {}

  ngOnInit(): void {
    this.getAllBoards();
  }

  getAllBoards(){
    this.loading = true;
    this.boardService.getAllBoards().subscribe({
      next: (result) => {
        this.boards = result;
        this.loading = false;
      },
      error(error) {console.log(error)},
      complete: () => {this.loading  = false}
    });
  }

}
