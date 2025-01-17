import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, startWith, debounceTime, switchMap, of } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ProfileData } from 'src/app/user/models/Profile';
import { UserService } from 'src/app/user/services/user.service';

import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
})
export class AddBoardComponent {
  protected boardForm: FormGroup;
  protected usersGroup: FormGroup;
  protected users: ProfileData[] = [];
  protected filteredUsers?: Observable<ProfileData[]>;

  constructor(
    private matDialogRef: MatDialogRef<AddBoardComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private userService: UserService,
    private boardService: BoardService,
  ) {
    this.boardForm = this.fb.group({
      boardName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      users: [[], [Validators.required]],
    });

    this.usersGroup = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (user) => {
        this.users = user.users;
        this.filteredUsers = this.usersGroup.get('search')!.valueChanges.pipe(
          startWith(''),
          debounceTime(300),
          switchMap((searchValue) =>
            of(
              this.users.filter((user) =>
                user.userName.toLowerCase().includes(searchValue.toLowerCase()),
              ),
            ),
          ),
        );
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
    });
  }

  onSubmit() {
    this.boardService.addBoard(this.boardForm.value).subscribe({
      next: (res) => {
        this.snackbarService.openSuccessSnackbar(res, 'X');
        this.matDialogRef.close();
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
    });
  }
}
