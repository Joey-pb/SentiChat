import { Component, Input } from '@angular/core';
import { Sentiment } from '../../models/sentiment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  @Input({ required: true }) sentiment!: Sentiment;
}
