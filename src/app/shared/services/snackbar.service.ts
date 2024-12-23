import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSuccessSnackbar(message: string , action: string){
    this.snackBar.open(message , action ,{
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar']
    })
  }

  openErrorSnackbar(message: string , action: string){
    this.snackBar.open(message , action ,{
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['red-snackbar']
    })
  }
}
