import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  loading = signal(false);
  showmodal = signal(false);
  modalMessage = signal('');

  showLoading() {
    this.loading.set(true);
  }

  hideLoading() {
    this.loading.set(false);
  }

  showModal(message: string) {
    this.modalMessage.set(message);
    this.showmodal.set(true);
  }

  closeModal() {
    this.showmodal.set(false);
  }
}
