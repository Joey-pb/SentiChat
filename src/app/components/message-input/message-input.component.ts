import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreFireService } from '../../services/store-fire.service';
import { GeminiService } from '../../services/gemini.service';
import { SentimentAnalysisComponent } from '../sentiment-analysis/sentiment-analysis.component';

@Component({
  selector: 'app-message-input',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css',
})
export class MessageInputComponent {
  geminiService = inject(GeminiService);
  storeFireService = inject(StoreFireService);
  sentiment = new FormControl('', Validators.required);

  async onPostSentiment() {
    this.geminiService
      .analyzeSentiment(this.sentiment.value as string)
      .then((result) => {
        console.log(result);
      });
    await this.storeFireService.postSentiment(this.sentiment.value as string);
  }
}
