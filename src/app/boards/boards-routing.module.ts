import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBoardsComponent } from './pages/all-boards/all-boards.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      component: AllBoardsComponent,
      canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
