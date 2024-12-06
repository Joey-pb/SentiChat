import { Timestamp } from 'firebase/firestore';

export interface Sentiment {
  id: string;
  user: string;
  text: string;
  timestamp: any;
}
