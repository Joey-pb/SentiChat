import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseError } from 'firebase/app';

import { AuthFireService } from '../../services/auth-fire.service';
import { NotificationService } from '../../services/notification.service';
import { getFirebaseErrors } from '../../utilities/fire-errors';
import { StoreFireService } from '../../services/store-fire.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar-nav',
  imports: [],
  templateUrl: './sidebar-nav.component.html',
})
export class SidebarNavComponent {
  authFireService = inject(AuthFireService);
  storeFireService = inject(StoreFireService);
  notificationService = inject(NotificationService);
  sidebarService = inject(SidebarService);
  router = inject(Router);
  currentUser = this.authFireService.currentUser;

  async onLogout() {
    try {
      this.notificationService.showLoading();
      this.storeFireService.unsubscribeChat();
      await this.authFireService.logout();
      this.router.navigate(['/']);
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
