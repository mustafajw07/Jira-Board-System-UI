import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
}
