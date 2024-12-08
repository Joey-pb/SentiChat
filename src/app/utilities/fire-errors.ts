import { FirebaseError } from 'firebase/app';

export function getFirebaseErrors({ code }: FirebaseError): string {
  let message;

  switch (code) {
    case 'auth/email-already-in-use':
      message = 'Account already exists.';
      break;
    case 'auth/user-not-found':
      message = 'User not found.';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address.';
      break;
    case 'auth/invalid-credential':
      message = 'Invalid credentials.';
      break;
    case 'auth/weak-password':
      message = 'Password must be at least 6 characters.';
      break;
    default:
      message = 'An unknown error occurred.';
  }

  return message;
}
