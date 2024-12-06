import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { GoogleAuthProvider, signOut } from 'firebase/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthFireService {
  private firebaseAuth = inject(Auth);
  private currentUser$ = authState(this.firebaseAuth);
  currentUser = toSignal<User | null>(this.currentUser$);
  private googleProvider = new GoogleAuthProvider();

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  setDisplayName(user: User, username: string): Promise<void> {
    return updateProfile(user, { displayName: username });
  }

  googleSignIn(): Promise<UserCredential> {
    return signInWithPopup(this.firebaseAuth, this.googleProvider);
  }

  logout(): Promise<void> {
    return signOut(this.firebaseAuth);
  }
}
