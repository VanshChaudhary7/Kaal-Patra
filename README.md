# Kaal-Patra (कालपत्र)

Kaal-Patra tracks your commitments. It records your promises, measures your consistency, and displays your integrity score. We built it for the MSE2 course using React, Redux, and Firebase.

## Features

- **Commitment Engine**: Create promises with specific deadlines and stakes.
- **Dual-Tier Streak System**: Tracks your daily check-ins across all active commitments to calculate a single global streak.
- **Integrity Score**: Measures your reliability based on your success and failure rates.
- **Community Leaderboard**: Compares your performance against others in real-time.
- **AI Coach**: Analyzes your streak and active commitments to generate motivational feedback via the Groq API.
- **Local Caching**: Loads your dashboard instantly using browser storage while fetching updates in the background.

## Technology Stack

- **Frontend**: React 19 (Vite)
- **State Management**: Redux Toolkit, React Context API
- **Routing**: React Router DOM
- **Backend & Auth**: Firebase (Firestore, Authentication)
- **Styling**: Vanilla CSS (Glassmorphism, cubic-bezier animations)
- **AI Integration**: Groq API (Llama 3)

## Local Setup

Follow these steps to run Kaal-Patra locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahakaal2005/Kaal-Patra.git
   cd Kaal-Patra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   Create a `.env` file in the root directory and add your Firebase and Groq API keys:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## Development Roles

We divided the project into four feature-based roles for full-stack implementation:

- **Core Infrastructure & Global State**: Configured Vite, Firebase Auth, React Router, and the Redux store.
- **Commitments Engine**: Built the async Redux thunks, form validation, and Firestore write logic.
- **Analytics & Derived State**: Engineered the Integrity Score and dual-tier streak algorithms using ES6 array methods.
- **AI & Time Mechanics**: Handled Groq integration, local state for countdown timers, and auto-expiring commitments.
