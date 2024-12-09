export const environment = {
  geminiApiKey: process.env['NG_APP_GEMINI_API_KEY'],
  firebase: {
    apiKey: process.env['NG_APP_FIREBASE_API_KEY'],
    authDomain: ['NG_APP_AUTH_DOMAIN'],
    databaseURL: ['NG_APP_DATABASE_URL'],
    projectId: ['NG_APP_PROJECT_ID'],
    storageBucket: ['NG_APP_STORAGE_BUCKET'],
    messagingSenderId: ['NG_APP_MESSAGING_SENDER_ID'],
    appId: ['NG_APP_APP_ID'],
  },
};
