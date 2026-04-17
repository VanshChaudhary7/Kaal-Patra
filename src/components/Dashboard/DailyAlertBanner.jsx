import { useSelector } from 'react-redux';
import './DailyAlertBanner.css';

const DailyAlertBanner = () => {
  const { items } = useSelector(state => state.commitments);
  
  const todayDateStr = new Date().toISOString().split('T')[0];

  const needsCheckInCount = items.filter(commit => {
    // Only care about locked (active) commitments
    if (commit.status !== 'locked') return false;
    
    // Check if hasn't been logged today
    return !commit.lastLoggedDate || commit.lastLoggedDate !== todayDateStr;
  }).length;

  if (needsCheckInCount === 0) return null;

  return (
    <div className="daily-alert-banner">
      <div className="alert-content">
        <span className="alert-icon">⚠️</span>
        <div className="alert-text">
          <strong>Daily Check-in Required!</strong>
          <p>You have {needsCheckInCount} commitment{needsCheckInCount > 1 ? 's' : ''} that need a progress update today.</p>
        </div>
      </div>
    </div>
  );
};

export default DailyAlertBanner;
