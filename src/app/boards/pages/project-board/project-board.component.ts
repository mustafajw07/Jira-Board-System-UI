import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { AddSprintComponent } from '../../components/add-sprint/add-sprint.component';
import { ProjectBoard } from '../../models/ProjectBoard';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css'],
})
export class ProjectBoardComponent implements OnInit {
  protected boardId: string = '';
  protected loading: boolean = false;
  protected userId: string = '';
  protected projectBoard: ProjectBoard = {
    boardName: '',
    id: '',
    description: '',
    users: [],
  };
  newSprint: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private boardService: BoardService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p) => {
      this.boardId = p['id'];
      this.getBoardById(this.boardId);
    });
  }

  getBoardById(boardId: string) {
    this.boardService.getBoardById(boardId).subscribe({
      next: (res) => {
        this.projectBoard = res;
        this.titleService.setTitle(this.projectBoard.boardName);
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  updateSelectedUser(e: string) {
    this.userId = e;
  }

  addSprint() {
    const dialog = this.dialog.open(AddSprintComponent, {
      data: this.boardId,
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.newSprint.next();
      }
    });
  }
}
