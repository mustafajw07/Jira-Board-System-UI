import { NgModule } from '@angular/core';

import { BoardsRoutingModule } from './boards-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AllBoardsComponent } from './pages/all-boards/all-boards.component';
import { CommonModule } from '@angular/common';
import { AddBoardComponent } from './components/add-board/add-board.component';
import { BoardsTableComponent } from './components/boards-table/boards-table.component';
import { ProjectBoardComponent } from './pages/project-board/project-board.component';

@NgModule({
  declarations: [
    AllBoardsComponent,
    AddBoardComponent,
    BoardsTableComponent,
    ProjectBoardComponent,
  ],
  imports: [CommonModule, SharedModule, BoardsRoutingModule],
})
export class BoardsModule {}
