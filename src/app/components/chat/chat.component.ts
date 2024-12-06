import { Component, inject, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { StoreFireService } from '../../services/store-fire.service';
import { Sentiment } from '../../models/sentiment.model';
import { NotificationService } from '../../services/notification.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-chat',
  imports: [MessageComponent, MessageInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  storeFireService = inject(StoreFireService);
  sentiments: Sentiment[] = [];

  ngOnInit() {
    this.storeFireService.getSentiments();
  }
}
