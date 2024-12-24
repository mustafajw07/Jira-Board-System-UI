import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProfileData } from '../../models/Profile';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

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
  constructor(private userService: UserService,
              private snackbarService: SnackbarService,
  ) {}
  
  ngOnInit(): void {
    this.getUserDetails();
  }
  
  getUserDetails(){
    this.loading = true;
    this.userService.getUserDeatils().subscribe({
      next: (res) => {this.userDetails = res.user;},
      error: (err) => {this.snackbarService.openErrorSnackbar(err.error , "X")},
      complete: () => {this.loading = false}
    });
  }

}
