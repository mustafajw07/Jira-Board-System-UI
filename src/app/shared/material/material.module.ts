import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';


const MATERIAl = [
  MatButtonModule,
  MatMenuModule,
  MatIconModule, 
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatSnackBarModule
]

@NgModule({
  imports: [
    MATERIAl,
  ],
  exports: [
    MATERIAl
  ]
})
export class MaterialModule { }
