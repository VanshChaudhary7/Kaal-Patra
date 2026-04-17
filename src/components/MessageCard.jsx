import { isUnlocked, formatDateTime, getTimeRemaining } from '../utils/timeUtils';
import './MessageCard.css';

function MessageCard({ message, onDelete }) {
  const unlocked = isUnlocked(message.unlockAt);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      onDelete(message.id);
    }
  };

  return (
    <div className={`message-card ${unlocked ? 'unlocked' : 'locked'}`}>
      <div className="card-header">
        <span className="status-icon">
          {unlocked ? '🔓' : '🔒'}
        </span>
        <span className="status-text">
          {unlocked ? 'Unlocked' : 'Locked'}
        </span>
        <button 
          onClick={handleDelete} 
          className="delete-btn"
          aria-label="Delete message"
        >
          🗑️
        </button>
      </div>

      <div className="card-body">
        {unlocked ? (
          <p className="message-content">{message.message}</p>
        ) : (
          <p className="message-placeholder">
            This message will unlock on <strong>{formatDateTime(message.unlockAt)}</strong>
          </p>
        )}
      </div>

      <div className="card-footer">
        <div className="time-info">
          <span className="label">Created:</span>
          <span className="value">{formatDateTime(message.createdAt)}</span>
        </div>
        <div className="time-info">
          <span className="label">Unlocks:</span>
          <span className="value">{formatDateTime(message.unlockAt)}</span>
        </div>
        {!unlocked && (
          <div className="time-remaining">
            ⏰ {getTimeRemaining(message.unlockAt)}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageCard;
