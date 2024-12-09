import { Component, input } from '@angular/core';
import { Sentiment } from '../../models/sentiment.model';
import { CommonModule } from '@angular/common';
import { ColorizeSentimentDirective } from '../../directives/colorize-sentiment.directive';

@Component({
  selector: 'app-message',
  imports: [CommonModule, ColorizeSentimentDirective],
  templateUrl: './message.component.html',
})
export class MessageComponent {
  // @Input({ required: true }) sentiment!: Sentiment;
  sentiment = input.required<Sentiment>();
}
