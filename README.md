# SentiChat - Real-Time Chat with Sentiment Analysis (Angular)

SentiChat is a real-time chat application built with Angular and Tailwind CSS that facilitates conversations with a twist: sentiment analysis! The current version is for demonstration purposes.

![SentiChat login screen](https://i.ibb.co/Ry8brJ4/login.jpg)
![SentiChat desktop](https://i.ibb.co/QFTFw6w/desktop.jpg)
![SentiChat mobile](https://i.ibb.co/wd1K2gG/mobile.jpg)

## Features

- **Real-Time Chat:** Send and receive messages with real-time updates powered by Firestore.
- **Sentiment Analysis:** Powered by Google's [Gemini API](https://ai.google.dev/gemini-api/docs), SentiChat analyzes the sentiment of messages, providing insights in the overall tone of messages and mood of conversation.
- **User Protection:** SentiChat analysis prevents users from posting potentially harmful messages.
- **Angular Framework:** Built with [Angular](https://angular.dev) version 19.0.2
- **Firebase Integration:** Incorporates [Firebase](https://firebase.google.com/) for user authentication, secure data storage, and real-time updates.
- **Tailwind CSS:** Utilizes [Tailwind CSS](https://tailwindcss.com) for rapid, responsive, and customizable UI development.

## Planned Features

- User profiles
- Comments and likes for sentiments(messages)
- Graphing user sentiments
- Graphing overall sentiments of the chat

# Getting Started

## Installation

1. Clone the repository:

```bash
git clone https://github.com/joey-pb/sentichat.git
```

2. Navigate to the project directory

```bash
cd sentichat
```

3. Install dependencies

```bash
npm install
```

4. Configuration
   - Add your Firebase project configuration details. Requires [Firebase Authentication](https://firebase.google.com/docs/auth) and [Firestore](https://firebase.google.com/docs/firestore).
   - Generate a [Google Gemini API key](https://aistudio.google.com/)
   - Create a file named `environments/environment.prod.ts` or `environments/environment.ts` depending on your environment (development or production).
   - Inside the file, add your Firebase project configuration details and Gemini API key:

```ts
export const environment = {
  production: false,
  GeminiApiKey: //API key here
  firebaseConfig: {
    // Your Firebase configuration details here
  }
};
```

5. Ensure that Tailwind CSS is properly configured in your Angular project. You may need to install additional packages and configure your `tailwind.config.js` file. [Get started with Tailwind CSS](https://tailwindcss.com/docs/installation)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Deployment

To deploy SentiChat to a production environment, refer to the official [Angular documentation](https://angular.dev/cli/build/) for deployment strategies.

## Additional Resources and Notes

- For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
- Refer to the official [Firebase documentation](https://firebase.google.com/docs) for detailed information on configuration and data management:
- Feel free to customize the application further according to your needs.
