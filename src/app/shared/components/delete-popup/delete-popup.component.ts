import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
})
export class DeletePopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string,
    private matDialogRef: MatDialogRef<DeletePopupComponent>,
  ) {}

  sendResponse(res: boolean) {
    this.matDialogRef.close(res);
  }
}
