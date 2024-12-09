import { Component, inject, input } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  notificationService = inject(NotificationService);
  message = input('');
}
