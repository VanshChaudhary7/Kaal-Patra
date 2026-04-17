import HistoryList from '../components/History/HistoryList';
import './HistoryPage.css';

const HistoryPage = () => {
  return (
    <div className="page history-page">
      <h2>Failure Memory & Record</h2>
      <p className="page-subtitle">A permanent record of your unbroken and broken promises.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <HistoryList />
      </div>
    </div>
  );
};

export default HistoryPage;
