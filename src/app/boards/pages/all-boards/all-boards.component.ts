import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { AddBoardComponent } from '../../components/add-board/add-board.component';
import { Board } from '../../models/Board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-all-boards',
  templateUrl: './all-boards.component.html',
})
export class AllBoardsComponent implements OnInit {
  protected boards: Board[] = [];
  protected displayedColumns: string[] = ['boardName', 'description'];
  protected loading = false;

  constructor(
    private titleService: Title,
    private boardService: BoardService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Boards');
    this.getAllBoards();
  }

  getAllBoards() {
    this.loading = true;
    this.boardService.getAllBoards().subscribe({
      next: (result) => {
        this.boards = result;
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  openAddBoardDialog() {
    const dialog = this.dialog.open(AddBoardComponent);
    dialog.afterClosed().subscribe(() => {
      this.getAllBoards();
    });
  }
}
