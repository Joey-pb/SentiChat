import { Component, inject, output, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFireService } from '../../services/auth-fire.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authFireService = inject(AuthFireService);
  router = inject(Router);
  fb = inject(FormBuilder);
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  email = this.registerForm.get('email');
  username = this.registerForm.get('username');
  password = this.registerForm.get('password');

  async onRegister() {
    const { email, username, password } = this.registerForm.value;

    if (!this.registerForm.valid || !email || !username || !password) {
      return;
    }

    const { user } = await this.authFireService.register(email, password);
    await this.authFireService.setDisplayName(user, username);
    this.router.navigate(['/chat']);
  }
}
