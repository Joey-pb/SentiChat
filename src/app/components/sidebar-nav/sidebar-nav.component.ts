import { Component, inject } from '@angular/core';
import { AuthFireService } from '../../services/auth-fire.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { FirebaseError } from 'firebase/app';
import { getFirebaseErrors } from '../../utilities/fire-errors';
import { StoreFireService } from '../../services/store-fire.service';

@Component({
  selector: 'app-sidebar-nav',
  imports: [],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.css',
})
export class SidebarNavComponent {
  authFireService = inject(AuthFireService);
  storeFireService = inject(StoreFireService);
  notificationService = inject(NotificationService);
  router = inject(Router);
  currentUser = this.authFireService.currentUser;

  async onLogout() {
    try {
      this.notificationService.showLoading();
      this.storeFireService.unsubscribeChat();
      await this.authFireService.logout();
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.firebaseError(error);
    } finally {
      this.notificationService.hideLoading();
    }
  }

  firebaseError(error: FirebaseError) {
    this.notificationService.showModal(getFirebaseErrors(error));
  }
}