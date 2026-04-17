import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Unit 2 - Validation
    if (!email || !password) {
      return setError('Please fill in all fields');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setLoading(true);
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to ' + (isLogin ? 'log in' : 'sign up') + '. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container glass-panel">
        <div className="auth-header">
          <h1 className="auth-brand-devanagari">कालपत्र</h1>
          <h2>{isLogin ? 'Confront Yourself' : 'Make a Commitment'}</h2>
          <p>{isLogin ? 'Sign in to view your promises.' : 'Create an account to lock in your future.'}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button disabled={loading} className="btn-primary" type="submit">
            {loading ? 'Processing...' : (isLogin ? 'Enter System' : 'Create System')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have a record yet? " : "Already have a record? "}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Log In'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
