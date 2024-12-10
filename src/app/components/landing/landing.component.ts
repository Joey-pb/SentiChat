import { Component } from '@angular/core';

import { LoginComponent } from '../login/login.component';
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
