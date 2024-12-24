import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ProfileComponent, LoginComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
