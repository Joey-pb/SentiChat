import { Component, inject, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { StoreFireService } from '../../services/store-fire.service';
import { Sentiment } from '../../models/sentiment.model';
import { NotificationService } from '../../services/notification.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-chat',
  imports: [MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  storeFireService = inject(StoreFireService);
  notificationService = inject(NotificationService);
  sentiments: Sentiment[] = [];

  ngOnInit() {
    this.notificationService.showLoading();
    this.loadChat();
  }

  loadChat() {
    try {
      this.storeFireService.getSentiments();
    } catch (err: any) {
      this.firebaseError(err);
    } finally {
      this.notificationService.hideLoading();
    }
  }

  firebaseError(err: FirebaseError) {
    this.notificationService.showModal(err.message);
  }
}
