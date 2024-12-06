import { Component, inject } from '@angular/core';
import { AuthFireService } from '../../services/auth-fire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  imports: [],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.css',
})
export class SidebarNavComponent {
  authFireService = inject(AuthFireService);
  router = inject(Router);
  currentUser = this.authFireService.currentUser;

  async onLogout() {
    await this.authFireService.logout();
    this.router.navigate(['/home']);
  }
}
