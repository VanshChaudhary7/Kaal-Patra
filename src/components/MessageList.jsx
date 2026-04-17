import { useState, useEffect } from 'react';
import { getMessages, deleteMessage } from '../utils/storageUtils';
import MessageCard from './MessageCard';
import './MessageList.css';

function MessageList({ refreshTrigger }) {
  const [messages, setMessages] = useState([]);

  const loadMessages = () => {
    const allMessages = getMessages();
    // Sort by unlock time (soonest first)
    allMessages.sort((a, b) => new Date(a.unlockAt) - new Date(b.unlockAt));
    setMessages(allMessages);
  };

  useEffect(() => {
    loadMessages();
  }, [refreshTrigger]);

  // Auto-refresh every 30 seconds to update lock status
  useEffect(() => {
    const interval = setInterval(() => {
      loadMessages();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id) => {
    const success = deleteMessage(id);
    if (success) {
      loadMessages();
    }
  };

  if (messages.length === 0) {
    return (
      <div className="message-list-container">
        <h2>Your Messages</h2>
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p className="empty-text">No messages yet</p>
          <p className="empty-subtext">Write your first letter to the future!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list-container">
      <h2>Your Messages ({messages.length})</h2>
      <div className="message-grid">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default MessageList;
