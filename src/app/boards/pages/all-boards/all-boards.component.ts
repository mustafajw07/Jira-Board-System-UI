import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/Board';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardComponent } from '../../components/add-board/add-board.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-all-boards',
  templateUrl: './all-boards.component.html'
})
export class AllBoardsComponent implements OnInit{
  protected boards: Board[] = [];
  protected displayedColumns: string[] = ['boardName', 'description'];
  protected loading = false;
  
  constructor (private boardService: BoardService,
               private snackbarService: SnackbarService,
               private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllBoards();
  }

  getAllBoards(){
    this.loading = true;
    this.boardService.getAllBoards().subscribe({
      next: (result) => {
        this.boards = result;
      },
      error: (err) => {this.snackbarService.openErrorSnackbar(err.error , "X")},
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
