import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sentiment-analysis',
  imports: [],
  templateUrl: './sentiment-analysis.component.html',
  styleUrl: './sentiment-analysis.component.css',
})
export class SentimentAnalysisComponent {
  sentimentVal = input.required<FormControl<string>>();
}
