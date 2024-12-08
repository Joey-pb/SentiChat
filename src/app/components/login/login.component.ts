import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthFireService } from '../../services/auth-fire.service';
import { NotificationService } from '../../services/notification.service';
import { FirebaseError } from 'firebase/app';
import { getFirebaseErrors } from '../../utilities/fire-errors';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authFireService = inject(AuthFireService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  email = this.loginForm.get('email');
  password = this.loginForm.get('password');

  async onLogin() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }
    try {
      this.notificationService.showLoading();
      await this.authFireService.login(email, password);
      this.router.navigate(['/chat']);
      this.notificationService.hideLoading();
    } catch (err: any) {
      this.firebaseError(err);
    } finally {
      this.notificationService.hideLoading();
    }
  }

  firebaseError(error: FirebaseError) {
    this.notificationService.showModal(getFirebaseErrors(error));
  }

  async onGoogleSignIn() {
    await this.authFireService.googleSignIn();
    this.router.navigate(['/chat']);
  }
}
