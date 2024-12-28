import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddSprintComponent } from '../add-sprint/add-sprint.component';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html'
})
export class AddStoryComponent {
constructor(
    @Inject(MAT_DIALOG_DATA) public boardId: {boardId: string},
    private matDialogRef: MatDialogRef<AddSprintComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
  ) {
    console.log(boardId); 
  }
  
}
