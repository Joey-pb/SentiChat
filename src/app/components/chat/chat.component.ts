import { Component, inject, OnInit } from '@angular/core';

import { FirebaseError } from 'firebase/app';

import { MessageComponent } from '../message/message.component';

import { Sentiment } from '../../models/sentiment.model';

import { StoreFireService } from '../../services/store-fire.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-chat',
  imports: [MessageComponent],
  templateUrl: './chat.component.html',
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
