import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path : 'login' , component: LoginComponent},
  {
    path: 'boards' ,  loadChildren: () => import('./boards/boards.module').then(m => m.BoardsModule) , canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'boards',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
