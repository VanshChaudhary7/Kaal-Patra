import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { fetchCommitments } from '../../features/commitments/commitmentsSlice';
import { formatDateTime } from '../../utils/timeUtils';
import './History.css';

const HistoryList = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { items, status } = useSelector(state => state.commitments);
  
  const [selectedCommitment, setSelectedCommitment] = useState(null);

  useEffect(() => {
    if (user && status === 'idle') {
      dispatch(fetchCommitments(user.uid));
    }
  }, [user, status, dispatch]);

  const resolvedItems = items.filter(c => c.status === 'success' || c.status === 'failed');
  // Sort by deadline descending
  resolvedItems.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));

  if (status === 'loading') return <div className="loading-state">Loading history...</div>;
  if (resolvedItems.length === 0) return <div className="empty-state">Your history is blank. Wait for a commitment to mature.</div>;

  return (
    <div className="history-container">
      <div className="history-list">
        {resolvedItems.map(item => (
          <div 
            key={item.id} 
            className={`history-card glass-panel ${item.status === 'failed' ? 'border-danger' : 'border-success'}`}
            onClick={() => setSelectedCommitment(item)}
          >
            <div className="history-card-header">
              <span className={`status-text ${item.status}`}>{item.status.toUpperCase()}</span>
              <span className="history-date">{formatDateTime(item.deadline)}</span>
            </div>
            <p className="history-goal">"{item.goal}"</p>
          </div>
        ))}
      </div>

      {selectedCommitment && (
        <MessageReplayModal 
          commitment={selectedCommitment} 
          onClose={() => setSelectedCommitment(null)} 
        />
      )}
    </div>
  );
};

// Internal Component: Message Replay (Feature 9) side-by-side
const MessageReplayModal = ({ commitment, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel modal-content replay-modal" onClick={e => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose}>✕</button>
        <h2>The Record</h2>
        
        <div className="replay-grid">
          {/* Past Self */}
          <div className="replay-past">
            <h3>The Promise</h3>
            <div className="pad-box">
              <p><strong>Goal:</strong> {commitment.goal}</p>
              <p><strong>Sacrifice:</strong> {commitment.sacrifice}</p>
              {commitment.penalty && <p><strong>Stakes:</strong> {commitment.penalty}</p>}
            </div>
          </div>

          {/* Present Reality */}
          <div className={`replay-present ${commitment.status}`}>
            <h3>The Reality</h3>
            <div className="pad-box">
              <h4 className={commitment.status === 'success' ? 'success' : 'danger'}>
                {commitment.status === 'success' ? '✅ Achieved' : '❌ Failed'}
              </h4>
              
              {commitment.status === 'success' ? (
                <div>
                  <p><strong>Proof:</strong></p>
                  <p className="proof-text">{commitment.proof}</p>
                </div>
              ) : (
                <div>
                  <p><strong>Category:</strong> {commitment.failureCategory}</p>
                  <p><strong>Reason:</strong></p>
                  <p className="reason-text">{commitment.failureReason}</p>
                  <p className="penalty-callout">Did you enforce your penalty?</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
