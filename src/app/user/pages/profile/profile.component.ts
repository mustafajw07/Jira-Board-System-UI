import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProfileData } from '../../models/Profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{
  loading = false;
  userDetails: ProfileData = {
    userName: '',
    role: {title: '' , id: ''},
    email: '',
    id:''
  };
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.getUserDetails();
  }
  
  getUserDetails(){
    this.loading = true;
    this.userService.getUserDeatils().subscribe({
      next: (res) => {
        this.loading = false;
        this.userDetails = res.user;
      }
    });
  }

}
