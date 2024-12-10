export const environment = {
  geminiApiKey: import.meta.env['NG_APP_GEMINI_API_KEY'],
  firebase: {
    apiKey: import.meta.env['NG_APP_FIREBASE_API_KEY'],
    authDomain: import.meta.env['NG_APP_AUTH_DOMAIN'],
    databaseURL: import.meta.env['NG_APP_DATABASE_URL'],
    projectId: import.meta.env['NG_APP_PROJECT_ID'],
    storageBucket: import.meta.env['NG_APP_STORAGE_BUCKET'],
    messagingSenderId: import.meta.env['NG_APP_MESSAGING_SENDER_ID'],
    appId: import.meta.env['NG_APP_APP_ID'],
  },
};
