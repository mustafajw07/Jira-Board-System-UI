import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProfileData } from '../../models/Profile';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { BoardService } from 'src/app/boards/services/board.service';
import { Board } from 'src/app/boards/models/Board';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{
  protected loading = false;
  protected userDetails: ProfileData = {
    userName: '',
    role: {title: '' , id: ''},
    email: '',
    id:''
  };
  protected boards: Board[] = []
  constructor(private userService: UserService,
              private snackbarService: SnackbarService,
              private boardService: BoardService
  ) {}
  
  ngOnInit(): void {
    this.getUserDetails();
  }
  
  getUserDetails(){
    this.loading = true;
    this.userService.getUserDeatils().subscribe({
      next: (res) => {this.userDetails = res.user; this.getuserBoards()},
      error: (err) => {this.snackbarService.openErrorSnackbar(err.error , "X")},
      complete: () => {this.loading = false}
    });
  }

  getuserBoards(){
    this.boardService.getAllUserBoards().subscribe({
      next: (res) => {this.boards = res},
      error: (err) => {this.snackbarService.openErrorSnackbar(err.error , "X")}
    })
  }

}
