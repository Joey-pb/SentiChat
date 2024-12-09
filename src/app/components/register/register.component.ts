import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFireService } from '../../services/auth-fire.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { FirebaseError } from 'firebase/app';
import { getFirebaseErrors } from '../../utilities/fire-errors';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  authFireService = inject(AuthFireService);
  notificationService = inject(NotificationService);
  router = inject(Router);
  fb = inject(FormBuilder);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  email = this.registerForm.get('email');
  username = this.registerForm.get('username');
  password = this.registerForm.get('password');

  async onRegister() {
    const { email, username, password } = this.registerForm.value;

    if (!this.registerForm.valid || !email || !username || !password) {
      return;
    }
    try {
      this.notificationService.showLoading();
      const { user } = await this.authFireService.register(email, password);
      await this.authFireService.setDisplayName(user, username);
      this.router.navigate(['/chat']);
      this.notificationService.hideLoading();
    } catch (err: any) {
      this.notificationService.hideLoading();
      this.firebaseError(err);
    } finally {
      this.notificationService.hideLoading;
    }
  }

  firebaseError(error: FirebaseError) {
    this.notificationService.showModal(getFirebaseErrors(error));
  }
}
