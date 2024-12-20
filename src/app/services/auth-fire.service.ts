import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

import { GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthFireService {
  private firebaseAuth = inject(Auth);
  private currentUser$ = authState(this.firebaseAuth);
  currentUser = toSignal<User | null>(this.currentUser$);
  private googleProvider = new GoogleAuthProvider();
  private githubProvider = new GithubAuthProvider();

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
  githubSignIn(): Promise<UserCredential> {
    return signInWithPopup(this.firebaseAuth, this.githubProvider);
  }

  logout(): Promise<void> {
    return signOut(this.firebaseAuth);
  }
}
