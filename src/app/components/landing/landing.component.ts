import { Component, signal, viewChildren } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-landing',
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  showLogin = true;
  toggleForm() {
    this.showLogin = !this.showLogin;
  }
}
