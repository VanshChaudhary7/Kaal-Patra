import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { fetchCommitments, deleteCommitment, updateCommitment } from '../../features/commitments/commitmentsSlice';
import CommitmentCard from './CommitmentCard';
import JudgmentModal from './JudgmentModal';
import { isUnlocked } from '../../utils/timeUtils';
import './CommitmentList.css';

const CommitmentList = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { items, status } = useSelector(state => state.commitments);
  const [judgingCommitment, setJudgingCommitment] = useState(null);

  useEffect(() => {
    if (user && status === 'idle') {
      dispatch(fetchCommitments(user.uid));
    }
  }, [user, status, dispatch]);

  // Tick checker to auto-unlock items whose time has passed
  useEffect(() => {
    const interval = setInterval(() => {
      const needsUpdate = items.filter(c => c.status === 'locked' && isUnlocked(c.deadline));
      needsUpdate.forEach(c => {
        dispatch(updateCommitment({
          uid: user.uid,
          commitmentId: c.id,
          updates: { status: 'pending_judgment' }
        }));
      });
    }, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [items, dispatch, user]);


  const activeItems = items.filter(c => c.status === 'locked' || c.status === 'pending_judgment');

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this locked commitment?")) {
      dispatch(deleteCommitment({ uid: user.uid, commitmentId: id }));
    }
  };

  if (status === 'loading') {
    return <div className="loading-state">Loading your promises...</div>;
  }

  if (activeItems.length === 0) {
    return <div className="empty-state">No active commitments. Make a promise to yourself.</div>;
  }

  return (
    <div className="commitment-list">
      {activeItems.map(item => (
        <CommitmentCard
          key={item.id}
          commitment={item}
          onDelete={handleDelete}
          onJudgeRequest={setJudgingCommitment}
        />
      ))}

      {judgingCommitment && (
        <JudgmentModal
          commitment={judgingCommitment}
          onClose={() => setJudgingCommitment(null)}
        />
      )}
    </div>
  );
};

export default CommitmentList;
