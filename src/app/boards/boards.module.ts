import { NgModule } from '@angular/core';

import { BoardsRoutingModule } from './boards-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AllBoardsComponent } from './pages/all-boards/all-boards.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AllBoardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BoardsRoutingModule
  ]
})

export class BoardsModule { }
