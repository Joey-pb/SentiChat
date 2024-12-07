import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreFireService } from '../../services/store-fire.service';
import { GeminiService } from '../../services/gemini.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ColorizeSentimentDirective } from '../../directives/colorize-sentiment.directive';

interface QueryResult {
  abusive?: boolean;
  classification?: string;
  description?: string;
  rating?: number;
}

@Component({
  selector: 'app-message-input',
  imports: [ReactiveFormsModule, FormsModule, ColorizeSentimentDirective],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css',
})
export class MessageInputComponent implements OnInit {
  geminiService = inject(GeminiService);
  storeFireService = inject(StoreFireService);
  sentiment = new FormControl('', Validators.required);
  hasQueryResult = false;
  queryResult: QueryResult = {};

  ngOnInit() {
    this.initializeSentimentAnalysis();
  }

  initializeSentimentAnalysis() {
    this.sentiment.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string | null) => {
          if (query) {
            return this.geminiService.analyzeSentiment(query);
          }
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) {
          this.queryResult = result[0] as QueryResult;
          this.toggleQueryResult();
        } else {
          this.queryResult = {};
        }
      });
  }

  toggleQueryResult() {
    this.hasQueryResult = !this.hasQueryResult;
  }

  async onPostSentiment() {
    await this.storeFireService.postSentiment(
      this.sentiment.value as string,
      this.queryResult.classification
    );
    this.sentiment.reset();
  }
}
