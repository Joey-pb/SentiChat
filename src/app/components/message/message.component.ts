import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Sentiment } from '../../models/sentiment.model';

import { ColorizeSentimentDirective } from '../../directives/colorize-sentiment.directive';

@Component({
  selector: 'app-message',
  imports: [CommonModule, ColorizeSentimentDirective],
  templateUrl: './message.component.html',
})
export class MessageComponent {
  sentiment = input.required<Sentiment>();
}
