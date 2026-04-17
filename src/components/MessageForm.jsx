import { useState } from 'react';
import { saveMessage } from '../utils/storageUtils';
import './MessageForm.css';

function MessageForm({ onMessageCreated }) {
  const [message, setMessage] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    if (!unlockDate) {
      setError('Please select an unlock date and time');
      return;
    }

    const unlockTime = new Date(unlockDate).getTime();
    const now = new Date().getTime();

    if (unlockTime <= now) {
      setError('Unlock time must be in the future');
      return;
    }

    // Create message object
    const newMessage = {
      id: crypto.randomUUID(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      unlockAt: new Date(unlockDate).toISOString(),
    };

    // Save to localStorage
    const success = saveMessage(newMessage);
    
    if (success) {
      // Clear form
      setMessage('');
      setUnlockDate('');
      setError('');
      
      // Notify parent component
      if (onMessageCreated) {
        onMessageCreated();
      }
    } else {
      setError('Failed to save message. Please try again.');
    }
  };

  return (
    <div className="message-form-container">
      <h2>Write a Letter to Your Future Self</h2>
      <form onSubmit={handleSubmit} className="message-form">
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            rows={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unlockDate">Unlock On</label>
          <input
            type="datetime-local"
            id="unlockDate"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-btn">
          🔒 Lock Message
        </button>
      </form>
    </div>
  );
}

export default MessageForm;
