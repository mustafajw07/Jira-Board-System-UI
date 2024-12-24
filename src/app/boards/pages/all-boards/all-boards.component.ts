import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Board } from '../../models/Board';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardComponent } from '../../components/add-board/add-board.component';

@Component({
  selector: 'app-all-boards',
  templateUrl: './all-boards.component.html'
})
export class AllBoardsComponent implements OnInit{
  boards: Board[] = [];
  displayedColumns: string[] = ['boardName', 'description'];
  
  loading = false;
  constructor (private router: Router , private boardService: BoardService, private dialog: MatDialog) {}

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

  openAddBoardDialog(){
    let dialog = this.dialog.open(AddBoardComponent);
    dialog.afterClosed().subscribe(() => {
      this.getAllBoards();
    })
  }

}
