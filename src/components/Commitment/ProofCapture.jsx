import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCommitment } from '../../features/commitments/commitmentsSlice';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';

const ProofCapture = ({ commitment, outcome, onComplete }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  
  const [proofText, setProofText] = useState('');
  const [reason, setReason] = useState('');
  const [category, setCategory] = useState('discipline');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updates = {
      status: outcome, // 'success' or 'failed'
    };

    if (outcome === 'success') {
      updates.proof = proofText;
    } else {
      updates.failureReason = reason;
      updates.failureCategory = category;
    }

    try {
      await dispatch(updateCommitment({ 
        uid: user.uid, 
        commitmentId: commitment.id, 
        updates 
      })).unwrap();
      onComplete(); // Close modal
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel modal-content proof-content">
      {outcome === 'success' ? (
        <>
          <h3>Prove It</h3>
          <p>Words are cheap. Describe exactly how you achieved it or link to proof.</p>
          <form onSubmit={handleSubmit}>
            <textarea 
              value={proofText} 
              onChange={e => setProofText(e.target.value)} 
              required
              rows={4}
              placeholder="e.g. Here is the link to the PR..."
            />
            <button type="submit" className="btn-primary" disabled={loading}>Submit Proof</button>
          </form>
        </>
      ) : (
        <>
          <h3>Face Reality</h3>
          <p>Why did you fail? Be honest.</p>
          <form onSubmit={handleSubmit}>
            <label>Failure Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="discipline">Lack of Discipline</option>
              <option value="planning">Poor Planning</option>
              <option value="distraction">Distraction</option>
              <option value="external">Uncontrollable External Factor</option>
            </select>

            <label>Specific Reason</label>
            <textarea 
              value={reason} 
              onChange={e => setReason(e.target.value)} 
              required
              rows={4}
              placeholder="Explain exactly what happened..."
            />
            {commitment.penalty && (
              <div className="penalty-reminder">
                Remember your proposed penalty: <strong>{commitment.penalty}</strong>
              </div>
            )}
            <button type="submit" className="btn-danger-large" disabled={loading}>Accept Failure</button>
          </form>
        </>
      )}
    </div>
  );
};

ProofCapture.propTypes = {
  commitment: PropTypes.object.isRequired,
  outcome: PropTypes.oneOf(['success', 'failed']).isRequired,
  onComplete: PropTypes.func.isRequired
};

export default ProofCapture;
