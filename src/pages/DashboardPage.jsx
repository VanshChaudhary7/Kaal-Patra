import { useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { fetchCommitments } from '../features/commitments/commitmentsSlice';
import DailyAlertBanner from '../components/Dashboard/DailyAlertBanner';
import CommitmentForm from '../components/Commitment/CommitmentForm';
import { IntegrityScore, IntegrityStreak } from '../components/Dashboard/StatsComponents';
import './DashboardPage.css';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user }  = useAuth();
  
  // Track if we've fired the fetch for this mount so we don't spam Firestore
  const fetchFired = useRef(false);

  // useLayoutEffect fires synchronously BEFORE the browser paints.
  // Because we now hydrate from cache in AuthContext, data might already be there.
  // We still fetch once on mount to get the latest updates silently in the background.
  useLayoutEffect(() => {
    if (user && !fetchFired.current) {
      fetchFired.current = true;
      dispatch(fetchCommitments(user.uid));
    }
  }, [user, dispatch]);

  return (
    <div className="page dashboard-page">
      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <IntegrityScore />
          <IntegrityStreak />
        </aside>
        
        <div className="dashboard-main">
          <DailyAlertBanner />
          <CommitmentForm />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
