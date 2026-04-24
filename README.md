# 📄 KaalPatra (कालपत्र)

*A letter across time*

## Overview

KaalPatra is a React-based time-locked messaging application that allows users to write messages to their future selves. Messages remain locked until a predefined unlock time, promoting intentional reflection and delayed gratification.

## Features

- 📝 **Create Messages**: Write letters to your future self with custom unlock times
- 🔒 **Time-Locked**: Messages are locked and hidden until the specified unlock time
- 🔓 **Auto-Unlock**: Messages automatically become readable when the time arrives
- 💾 **Local Storage**: All messages persist in your browser's localStorage
- 🎨 **Dark Theme**: Beautiful dark-themed UI optimized for extended use
- 📱 **Responsive**: Works on desktop and mobile devices

## Tech Stack

- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **localStorage**: Client-side data persistence
- **CSS**: Component-scoped styling with the dark theme

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd kaalpatra
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
kaalpatra/
├── src/
│   ├── components/
│   │   ├── MessageForm.jsx       # Create new messages
│   │   ├── MessageForm.css
│   │   ├── MessageList.jsx       # Display all messages
│   │   ├── MessageList.css
│   │   ├── MessageCard.jsx       # Individual message card
│   │   └── MessageCard.css
│   ├── utils/
│   │   ├── timeUtils.js          # Time comparison functions
│   │   └── storageUtils.js       # localStorage operations
│   ├── App.jsx                   # Main app component
│   ├── App.css
│   ├── index.css                 # Global styles
│   └── main.jsx
└── package.json
```

## Usage

1. **Write a Message**: Enter your message in the text area
2. **Set Unlock Time**: Choose a future date and time using the date picker
3. **Lock It**: Click the "Lock Message" button
4. **Wait**: The message will remain locked until the unlock time
5. **View**: Once unlocked, the message content will be revealed

## Data Model

Each message is stored with the following structure:

```javascript
{
  id: "unique-uuid",
  message: "Your message content",
  createdAt: "2024-04-07T10:30:00.000Z",
  unlockAt: "2024-12-31T23:59:00.000Z"
}
```

## Notes

- Messages are stored in browser localStorage (no backend required)
- Clearing browser data will delete all messages
- Messages are device/browser specific
- Time comparisons use system time

## MSE2 Project

This project was created as part of the MSE2 (Modern Software Engineering) course, demonstrating:
- Component-based React architecture
- State management with hooks
- localStorage for data persistence
- Time-based logic implementation
- Responsive UI design

## License

MIT License - Created for educational purposes

---

Made with ❤️ for MSE2 Project
