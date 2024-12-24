import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { AllBoardsComponent } from './pages/all-boards/all-boards.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AllBoardsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
