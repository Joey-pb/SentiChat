import { inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from '@angular/fire/firestore';

import { CollectionReference, DocumentReference } from 'firebase/firestore';
import { Unsubscribe } from 'firebase/auth';

import { AuthFireService } from './auth-fire.service';

import { Sentiment } from '../models/sentiment.model';

@Injectable({
  providedIn: 'root',
})
export class StoreFireService {
  private firestore = inject(Firestore);
  private authService = inject(AuthFireService);
  private sentiments = collection(
    this.firestore,
    'sentiments'
  ) as CollectionReference<Sentiment>;
  chat = signal<Sentiment[]>([]);
  unsubscribe!: Unsubscribe;

  getSentiments() {
    try {
      const q = query(this.sentiments, orderBy('timestamp', 'desc'));
      this.unsubscribe = onSnapshot(q, async (snapshot) => {
        const updatedChat = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const sentiment = { ...doc.data(), id: doc.id } as Sentiment;
            sentiment.timestamp = sentiment.timestamp.toDate();
            return sentiment;
          })
        );
        this.chat.set(updatedChat);
      });
      return this.unsubscribe;
    } catch (err: any) {
      throw err;
    }
  }

  unsubscribeChat() {
    return this.unsubscribe();
  }

  async postSentiment(
    sentiment: string,
    classification: string | undefined
  ): Promise<DocumentReference> {
    try {
      return await addDoc(this.sentiments, {
        text: sentiment,
        classification: classification,
        user: this.authService.currentUser()!.displayName,
        timestamp: Timestamp.now(),
      } as Sentiment);
    } catch (err: any) {
      throw err;
    }
  }
}
