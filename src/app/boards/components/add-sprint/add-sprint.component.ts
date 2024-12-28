import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SprintService } from '../../services/sprint.service';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
})
export class AddSprintComponent {
  protected sprintForm: FormGroup;
  protected minDate: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public boardId: {boardId: string},
    private matDialogRef: MatDialogRef<AddSprintComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private sprintService: SprintService
  ) {
    this.sprintForm = this.fb.group({
      sprintNo: ['', [Validators.required]],
      sprintName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      boardId: [this.boardId]
    });
  }

  onSubmit(){
    this.sprintService.addSprint(this.sprintForm.value).subscribe({
      next : () => {this.snackbarService.openSuccessSnackbar("Sprint added successfully" , "X")},
      error : (err) => {this.snackbarService.openErrorSnackbar(err.message , "X")},
      complete : () => {this.matDialogRef.close()}
    });
  }
}
