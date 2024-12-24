import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { AuthService } from '../../../shared/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private titleService:Title,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Login");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (value: any) => {
          this.authService.saveUserToken(value.message);
          this.snackbarService.openSuccessSnackbar('Login Successful', 'X');
          this.router.navigate(['boards']);
        },
        error: (err) => {
          this.snackbarService.openErrorSnackbar(err.error.message, 'X');
        },
      });
    }
  }
}
