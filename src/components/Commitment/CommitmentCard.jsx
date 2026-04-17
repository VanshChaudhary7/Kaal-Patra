import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateCommitment } from '../../features/commitments/commitmentsSlice';
import { useAuth } from '../../context/AuthContext';
import { formatDateTime, getDetailedTimeRemaining } from '../../utils/timeUtils';
import './CommitmentCard.css';

const CommitmentCard = ({ commitment, onJudgeRequest, onDelete }) => {
  const { status, goal, sacrifice, deadline, penalty, reward, progressLogs = [], createdAt } = commitment;

  const dispatch = useDispatch();
  const { user } = useAuth();
  
  const isPending = status === 'pending_judgment';

  const [timeLeft, setTimeLeft] = useState(() => getDetailedTimeRemaining(deadline));
  const [dailyLog, setDailyLog] = useState('');
  
  const todayDateStr = new Date().toISOString().split('T')[0];
  const isCheckInRequired = !isPending && (!commitment.lastLoggedDate || commitment.lastLoggedDate !== todayDateStr);

  const handleLogProgress = async () => {
    if (!dailyLog.trim()) return;

    const updatedLogs = [...progressLogs, { date: todayDateStr, log: dailyLog.trim() }];
    
    try {
      await dispatch(updateCommitment({
        uid: user.uid,
        commitmentId: commitment.id,
        updates: {
          progressLogs: updatedLogs,
          lastLoggedDate: todayDateStr
        }
      })).unwrap();
      setDailyLog('');
    } catch (error) {
      console.error('Failed to log daily progress:', error);
    }
  };

  useEffect(() => {
    if (isPending) return;

    const interval = setInterval(() => {
      const remaining = getDetailedTimeRemaining(deadline);
      setTimeLeft(remaining);
      
      // If it just unlocked, you might want to call onJudgeRequest to pop it immediately,
      // but the CommitmentList handles the state migration already.
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, isPending]);

  return (
    <div className={`glass-panel commitment-card ${isPending ? 'pending-glow' : ''} ${isCheckInRequired ? 'needs-checkin' : ''}`}>
      <div className="card-header">
        <span className="status-badge">
          {isPending ? '⚠️ Unlocked - Judgment Required' : (isCheckInRequired ? '🚨 Check-in Required!' : '✅ Check-in Complete')}
        </span>
        {status === 'locked' && (
          <button className="btn-delete" onClick={() => onDelete(commitment.id)}>🗑️</button>
        )}
      </div>

      <div className="card-body">
        <h4>Goal</h4>
        <p className="card-primary-text">{goal}</p>
        
        <h4>Sacrifice</h4>
        <p className="card-secondary-text">{sacrifice}</p>

        {(penalty || reward) && (
          <div className="stakes-box">
            {penalty && <div><span className="stake-label danger">If fail:</span> {penalty}</div>}
            {reward && <div><span className="stake-label success">If win:</span> {reward}</div>}
          </div>
        )}

        {/* Visual Progress Roadmap */}
        {!isPending && (
          <div className="roadmap-container">
            <h4>Journey Map</h4>
            <div className="roadmap-visual">
              {progressLogs.length === 0 ? (
                <p className="roadmap-empty">No progress logged yet. Take your first step today!</p>
              ) : (
                <div className="roadmap-stepper">
                  {progressLogs.map((log, idx) => (
                    <div key={idx} className="roadmap-step" title={`${log.date}: ${log.log}`}>
                      <div className="step-dot filled"></div>
                      <div className="step-line joined"></div>
                    </div>
                  ))}
                  <div className="roadmap-step current-step">
                    <div className={`step-dot ${isCheckInRequired ? 'pulse' : 'done'}`}></div>
                  </div>
                </div>
              )}
            </div>
            {progressLogs.length > 0 && (
              <div className="latest-log">
                <strong>Latest log:</strong> {progressLogs[progressLogs.length - 1].log}
              </div>
            )}
            
            {isCheckInRequired && (
              <div className="daily-checkin-box">
                <input 
                  type="text" 
                  className="checkin-input" 
                  placeholder="What did you do today to get closer?"
                  value={dailyLog}
                  onChange={(e) => setDailyLog(e.target.value)}
                />
                <button className="btn-checkin" onClick={handleLogProgress}>Log</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card-footer">
        {!isPending && (
          <div className="live-countdown">
            <h5 className="countdown-title">⏳ UNLOCKS IN</h5>
            <div className="countdown-boxes">
              <div className="time-box">
                <span className="time-val">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="time-lbl">DAYS</span>
              </div>
              <div className="time-box">
                <span className="time-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-lbl">HRS</span>
              </div>
              <div className="time-box">
                <span className="time-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-lbl">MIN</span>
              </div>
              <div className="time-box">
                <span className="time-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-lbl">SEC</span>
              </div>
            </div>
            <div className="time-info-date">
              📅 on {formatDateTime(deadline)}
            </div>
          </div>
        )}
        
        {isPending && (
          <button 
            className="btn-judge-now" 
            onClick={() => onJudgeRequest(commitment)}
          >
            Face Your Judgment
          </button>
        )}
      </div>
    </div>
  );
};

CommitmentCard.propTypes = {
  commitment: PropTypes.object.isRequired,
  onJudgeRequest: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommitmentCard;
