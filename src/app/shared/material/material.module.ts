import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

const MATERIAl = [
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatSnackBarModule,
  MatSelectModule,
  MatDialogModule,
  NgxMatSelectSearchModule,
  MatChipsModule,
  MatCardModule,
];

@NgModule({
  imports: [MATERIAl],
  exports: [MATERIAl],
})
export class MaterialModule {}
