import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommitment } from '../../features/commitments/commitmentsSlice';
import { useAuth } from '../../context/AuthContext';
import './CommitmentForm.css';

const CommitmentForm = () => {
  const [goal, setGoal] = useState('');
  const [sacrifice, setSacrifice] = useState('');
  const [deadline, setDeadline] = useState('');
  const [penalty, setPenalty] = useState('');
  const [reward, setReward] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!goal || !sacrifice || !deadline) {
      return setError('Core fields (Goal, Sacrifice, Deadline) are required.');
    }

    const unlockDateObj = new Date(deadline);
    const unlockTime = unlockDateObj.getTime();
    
    if (isNaN(unlockTime)) {
      return setError('Invalid date format. Please provide a valid date.');
    }
    
    if (unlockTime <= Date.now()) {
      return setError('Deadline must be in the future.');
    }

    try {
      const newCommitment = {
        goal: goal.trim(),
        sacrifice: sacrifice.trim(),
        deadline: unlockDateObj.toISOString(),
        penalty: penalty.trim() || null,
        reward: reward.trim() || null,
        status: 'locked',
        proof: null,
        failureReason: null,
        failureCategory: null,
        progressLogs: [],
        lastLoggedDate: null
      };

      await dispatch(addCommitment({ uid: user.uid, commitmentData: newCommitment })).unwrap();
      
      // Reset form
      setGoal('');
      setSacrifice('');
      setDeadline('');
      setPenalty('');
      setReward('');
    } catch (err) {
      console.error(err);
      setError('Failed to create commitment. Database error.');
    }
  };

  return (
    <div className="glass-panel commitment-form-container">
      <h3>Force a Commitment</h3>
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="commitment-form">
        <label>1. What exactly will you achieve?</label>
        <textarea 
          placeholder="e.g. I will deploy KaalPatra to production."
          value={goal} onChange={e => setGoal(e.target.value)}
          required rows={2}
        />

        <label>2. What will you sacrifice for it?</label>
        <textarea 
          placeholder="e.g. I will not play video games this weekend."
          value={sacrifice} onChange={e => setSacrifice(e.target.value)}
          required rows={2}
        />

        <label>3. By When? (The Unlock Date)</label>
        <input 
          type="datetime-local" 
          value={deadline} 
          onChange={e => setDeadline(e.target.value)}
          onClick={(e) => {
            try {
              e.target.showPicker();
            } catch (err) {
              // Ignore for browsers that don't support showPicker (fallback to manual entry/click)
            }
          }}
          className="calendar-input"
          required
        />

        <hr className="form-divider" />
        <h4>Stakes (Optional but recommended)</h4>

        <label>If I Fail, my penalty is:</label>
        <input 
          type="text" placeholder="e.g. No social media for 3 days"
          value={penalty} onChange={e => setPenalty(e.target.value)}
        />

        <label>If I Succeed, my reward is:</label>
        <input 
          type="text" placeholder="e.g. I will buy that book."
          value={reward} onChange={e => setReward(e.target.value)}
        />

        <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>
          🔒 Lock It In
        </button>
      </form>
    </div>
  );
};

export default CommitmentForm;
