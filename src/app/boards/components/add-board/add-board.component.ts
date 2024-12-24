import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, startWith, debounceTime, switchMap, of } from 'rxjs';
import { ProfileData } from 'src/app/user/models/Profile';
import { UserService } from 'src/app/user/services/user.service';
import { BoardService } from '../../services/board.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html'
})
export class AddBoardComponent {
  boardForm: FormGroup;
  usersGroup: FormGroup;
  users: ProfileData[] = [];
  filteredUsers?: Observable<ProfileData[]>;

  constructor(private matDialogRef: MatDialogRef<AddBoardComponent>,
              private fb: FormBuilder,
              private userService: UserService,
              private boardService: BoardService,
              private snackbarService: SnackbarService) {
    this.boardForm = this.fb.group({
      boardName: ['',[Validators.required]],
      description: ['' , [Validators.required]],
      users: [[] , [Validators.required]],
    });

    this.usersGroup = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getAllUsers().subscribe({
      next: (user) => {
        this.users = user.users;
        this.filteredUsers = this.usersGroup.get('search')!.valueChanges.pipe(
          startWith(''),
          debounceTime(300),
          switchMap((searchValue) =>
            of(
              this.users.filter((user) =>
                user.userName.toLowerCase().includes(searchValue.toLowerCase())
              )
            )
          )
        );
      },
      error(err) {console.log(err);}
    });
  }

  onSubmit() {
    this.boardService.addBoard(this.boardForm.value).subscribe({
      next: (res) => {
        this.snackbarService.openSuccessSnackbar(res, "X");
        this.matDialogRef.close()
      },
      error: (err) => {this.snackbarService.openErrorSnackbar(err.error , "X")}
    });
  }
}
