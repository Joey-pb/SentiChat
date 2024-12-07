import { inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  onSnapshot,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Sentiment } from '../models/sentiment.model';
import { AuthFireService } from './auth-fire.service';
import { Timestamp } from '@angular/fire/firestore';
import { CollectionReference, DocumentReference } from 'firebase/firestore';

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

  getSentiments() {
    const q = query(this.sentiments, orderBy('timestamp', 'desc'));

    return onSnapshot(q, async (snapshot) => {
      const updatedChat = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const sentiment = { ...doc.data(), id: doc.id } as Sentiment;
          sentiment.timestamp = sentiment.timestamp.toDate();
          return sentiment;
        })
      );
      this.chat.set(updatedChat);
    });
  }

  async postSentiment(
    sentiment: string,
    classification: string | undefined
  ): Promise<DocumentReference> {
    return await addDoc(this.sentiments, {
      text: sentiment,
      classification: classification,
      user: this.authService.currentUser()!.displayName,
      timestamp: Timestamp.now(),
    } as Sentiment);
  }
}
