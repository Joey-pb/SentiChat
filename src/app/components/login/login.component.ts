import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthFireService } from '../../services/auth-fire.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authFireService = inject(AuthFireService);
  router = inject(Router);
  notifications = inject(NotificationService);

  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // email = this.loginForm.get('email');
  // password = this.loginForm.get('password');

  async onLogin() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }
    try {
      this.notifications.showLoading();
      await this.authFireService.login(email, password);
      this.router.navigate(['/chat']);
      this.notifications.hideLoading();
    } catch (err: any) {
      console.log(err);
    }
  }

  async onGoogleSignIn() {
    await this.authFireService.googleSignIn();
    this.router.navigate(['/chat']);
  }
}
