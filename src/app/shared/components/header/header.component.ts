import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddStoryComponent } from 'src/app/boards/components/add-story/add-story.component';
import { BoardService } from 'src/app/boards/services/board.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  protected isLoggedIn = this.authService.isUserLogin;
  protected boards: any = [];
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private boardService: BoardService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.boardService.getAllUserBoards().subscribe({
        next: (result) => {
          this.boards = result;
        },
      });
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  home() {
    this.router.navigate(['boards']);
  }

  openProfile() {
    this.router.navigate(['user']);
  }

  openBoard(boardId: string) {
    this.router.navigate([`boards/${boardId}`]);
  }

  createOptions() {
    this.dialog.open(AddStoryComponent, { data: this.boards });
  }
}
