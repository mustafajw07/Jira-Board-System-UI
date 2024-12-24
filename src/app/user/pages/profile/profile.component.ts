import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/boards/models/Board';
import { BoardService } from 'src/app/boards/services/board.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { ProfileData } from '../../models/Profile';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  protected loading = false;
  protected userDetails: ProfileData = {
    userName: '',
    role: { title: '', id: '' },
    email: '',
    id: '',
  };
  protected boards: Board[] = [];
  constructor(
    private titleService: Title,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private boardService: BoardService,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Profile');
    this.getUserDetails();
  }

  getUserDetails() {
    this.loading = true;
    this.userService.getUserDeatils().subscribe({
      next: (res) => {
        this.userDetails = res.user;
        this.getuserBoards();
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getuserBoards() {
    this.boardService.getAllUserBoards().subscribe({
      next: (res) => {
        this.boards = res;
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
    });
  }
}
