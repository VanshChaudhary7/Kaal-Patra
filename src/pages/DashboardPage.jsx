import DailyAlertBanner from '../components/Dashboard/DailyAlertBanner';
import CommitmentForm from '../components/Commitment/CommitmentForm';
import CommitmentList from '../components/Commitment/CommitmentList';
import { IntegrityScore, IntegrityStreak } from '../components/Dashboard/StatsComponents';
import './DashboardPage.css';

const DashboardPage = () => {
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
          
          <h2>Active Commitments</h2>
          <CommitmentList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
