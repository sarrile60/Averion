import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

const ACCESS_CODE = 'averion2026';
const STORAGE_KEY = 'averion_access_granted';

export function AccessGate({ children }) {
  const [granted, setGranted] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setGranted(true);
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim().toLowerCase() === ACCESS_CODE) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setGranted(true);
      setError('');
    } else {
      setError('Invalid access code');
      setCode('');
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#111111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          border: '2px solid rgba(255,255,255,0.2)',
          borderTopColor: '#ef4444',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    );
  }

  if (granted) {
    return children;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .access-input::placeholder {
          color: #6b7280;
        }
        .access-input:focus {
          outline: none;
          border-color: #ef4444;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
        }
        .access-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .access-btn:active {
          transform: translateY(0);
        }
      `}</style>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#1a1a1a',
        borderRadius: '16px',
        border: '1px solid #2a2a2a',
        padding: '48px 40px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        textAlign: 'center'
      }}>
        {/* Brand */}
        <div style={{ marginBottom: '8px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: '0',
            letterSpacing: '-0.5px'
          }}>
            <span style={{ color: '#ffffff' }}>Aver</span>
            <span style={{ color: '#ef4444' }}>ion</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p style={{
          color: '#9ca3af',
          fontSize: '14px',
          margin: '0 0 32px 0',
          fontWeight: '400'
        }}>
          Enter your access code to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            className="access-input"
            type="password"
            placeholder="Access Code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError('');
            }}
            autoFocus
            style={{
              width: '100%',
              padding: '14px 16px',
              background: '#111111',
              border: '1px solid #333333',
              borderRadius: '10px',
              color: '#ffffff',
              fontSize: '15px',
              boxSizing: 'border-box',
              marginBottom: error ? '8px' : '20px',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
          />

          {error && (
            <p style={{
              color: '#ef4444',
              fontSize: '13px',
              margin: '0 0 16px 0',
              textAlign: 'left'
            }}>
              {error}
            </p>
          )}

          <button
            className="access-btn"
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.3px'
            }}
          >
            Continue
          </button>
        </form>

        {/* Lock icon footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '24px'
        }}>
          <Lock size={12} color="#6b7280" />
          <span style={{
            color: '#6b7280',
            fontSize: '11px',
            fontWeight: '400'
          }}>
            Protected access
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccessGate;
