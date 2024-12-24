import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { BoardsRoutingModule } from './boards-routing.module';
import { AddBoardComponent } from './components/add-board/add-board.component';
import { BoardsTableComponent } from './components/boards-table/boards-table.component';
import { AllBoardsComponent } from './pages/all-boards/all-boards.component';

@NgModule({
  declarations: [AllBoardsComponent, AddBoardComponent, BoardsTableComponent],
  imports: [CommonModule, SharedModule, BoardsRoutingModule],
})
export class BoardsModule {}
