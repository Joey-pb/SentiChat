import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './components/util/modal/modal.component';
import { NotificationService } from './services/notification.service';
import { LoadingComponent } from './components/util/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SentiChat';
  notificationService = inject(NotificationService);
}
