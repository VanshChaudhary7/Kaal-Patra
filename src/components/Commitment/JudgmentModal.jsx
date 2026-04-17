import { useState } from 'react';
import PropTypes from 'prop-types';
import ProofCapture from './ProofCapture';
import './JudgmentModal.css';

const JudgmentModal = ({ commitment, onClose }) => {
  const [outcome, setOutcome] = useState(null); // 'success' or 'failed'

  // If outcome is selected, render the follow-up ProofCapture form
  if (outcome) {
    return (
      <div className="modal-overlay">
        <ProofCapture 
          commitment={commitment} 
          outcome={outcome} 
          onComplete={onClose} 
        />
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content judgment-content">
        <h2>The Time Has Come.</h2>
        <p>You promised to:</p>
        <div className="promise-quote">"{commitment.goal}"</div>
        
        <p className="judgment-question">Did you honor this commitment?</p>
        
        <div className="judgment-actions">
          <button className="btn-success-large" onClick={() => setOutcome('success')}>
            ✅ Yes, I did it.
          </button>
          <button className="btn-danger-large" onClick={() => setOutcome('failed')}>
            ❌ No, I failed.
          </button>
        </div>
        <p className="modal-note">You cannot skip this. Do not lie to yourself.</p>
      </div>
    </div>
  );
};

JudgmentModal.propTypes = {
  commitment: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default JudgmentModal;
