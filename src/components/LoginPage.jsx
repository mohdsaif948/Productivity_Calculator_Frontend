import React, { useState } from 'react';

const LoginPage = ({ onLogin, onEmailSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    if (onEmailSignIn) {
      onEmailSignIn(email, password);
    }
  };

  return (
    <div className="login-page" style={{ display: 'flex' }}>
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome to TaskFlow</h1>
          <p>Sign in to unlock your productivity analytics</p>
        </div>
        <form onSubmit={handleEmailSignIn} style={{ marginBottom: 24 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 25,
              border: '1.5px solid #eee',
              marginBottom: 14,
              fontSize: 16,
              background: 'rgba(255,255,255,0.18)',
              color: '#222',
              outline: 'none',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 25,
              border: '1.5px solid #eee',
              marginBottom: 14,
              fontSize: 16,
              background: 'rgba(255,255,255,0.18)',
              color: '#222',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            className="google-btn"
            style={{
              width: '100%',
              background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
              color: '#fff',
              marginBottom: 10,
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              borderRadius: 50,
              padding: '13px 0',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
              transition: 'background 0.2s, transform 0.2s',
            }}
          >
            Sign In
          </button>
        </form>
        <div style={{ margin: '12px 0', color: '#fff', fontWeight: 500 }}>or</div>
        <button className="google-btn" onClick={onLogin} style={{ width: '100%' }}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="google-logo" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage; 