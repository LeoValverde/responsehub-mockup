import React, { useState } from 'react';

// ResponseHub Landing Page - Final Version
// Clean white design with Alceon's signature navy blue
// Features the actual Alceon logo with kingfisher bird

const ResponseHubLanding = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Alceon brand colors extracted from their logo
  const alceonBlue = '#1a3a5c';
  const alceonBlueLight = '#2a5a8c';
  const alceonBlueDark = '#0f2a44';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafafa',
      fontFamily: "'Outfit', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradient orbs - subtle blue tones */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-100px',
        width: '500px',
        height: '500px',
        background: 'linear-gradient(135deg, rgba(26, 58, 92, 0.08) 0%, rgba(26, 58, 92, 0.02) 100%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-100px',
        width: '400px',
        height: '400px',
        background: 'linear-gradient(135deg, rgba(26, 58, 92, 0.06) 0%, rgba(26, 58, 92, 0.01) 100%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <header style={{
        padding: '28px 56px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <img
          src="/assets/alceon-logo.png"
          alt="Alceon"
          style={{
            height: '72px',
            width: 'auto'
          }}
        />
        <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Help</a>
          <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Contact</a>
        </nav>
      </header>

      {/* Main content - split layout */}
      <main style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 'calc(100vh - 160px)',
        padding: '0 56px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        gap: '80px'
      }}>
        {/* Left side - Marketing content */}
        <div style={{ maxWidth: '520px' }}>
          {/* Status badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'white',
            border: '1px solid #e5e5e5',
            borderRadius: '100px',
            padding: '6px 14px',
            marginBottom: '32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%' }} />
            <span style={{ color: '#666', fontSize: '12px', fontWeight: 500 }}>Investor Relations Platform</span>
          </div>

          {/* Main heading */}
          <h1 style={{
            color: '#1a1a1a',
            fontSize: '52px',
            fontWeight: 700,
            margin: '0 0 20px 0',
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>
            Response<span style={{ color: alceonBlue }}>Hub</span>
          </h1>

          <p style={{
            color: '#555',
            fontSize: '18px',
            lineHeight: 1.7,
            margin: '0 0 40px 0'
          }}>
            Streamline your due diligence workflow with AI-powered response 
            generation. Deliver accurate, consistent answers backed by your 
            knowledge base and historical responses.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { title: 'Smart Response Generation', desc: 'AI drafts based on your documentation' },
              { title: 'Full Source Traceability', desc: 'Every answer linked to source materials' },
              { title: 'Consistency Assurance', desc: 'Maintain alignment across all communications' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: `linear-gradient(135deg, ${alceonBlue} 0%, ${alceonBlueLight} 100%)`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '15px', marginBottom: '2px' }}>{item.title}</div>
                  <div style={{ color: '#777', fontSize: '14px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Login card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.04)',
          maxWidth: '420px',
          width: '100%',
          justifySelf: 'center'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{
              color: '#1a1a1a',
              fontSize: '24px',
              fontWeight: 700,
              margin: '0 0 8px 0'
            }}>Welcome back</h2>
            <p style={{ color: '#888', fontSize: '15px', margin: 0 }}>
              Sign in to access your workspace
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              color: '#444', 
              fontSize: '13px', 
              marginBottom: '8px', 
              fontWeight: 600 
            }}>
              Work email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@alceon.com.au"
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={{
                width: '100%',
                padding: '16px 18px',
                background: inputFocused ? 'white' : '#f8f8f8',
                border: `2px solid ${inputFocused ? alceonBlue : '#e8e8e8'}`,
                borderRadius: '12px',
                color: '#1a1a1a',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            onClick={onSignIn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: '100%',
              padding: '16px',
              background: isHovered
                ? `linear-gradient(135deg, ${alceonBlueDark} 0%, ${alceonBlue} 100%)`
                : `linear-gradient(135deg, ${alceonBlue} 0%, ${alceonBlueLight} 100%)`,
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s',
              boxShadow: isHovered
                ? '0 12px 28px rgba(26, 58, 92, 0.35)'
                : '0 6px 20px rgba(26, 58, 92, 0.25)',
              transform: isHovered ? 'translateY(-2px)' : 'none'
            }}
          >
            Sign in with SSO
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '28px',
            paddingTop: '24px',
            borderTop: '1px solid #eee'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#f0f0f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <div style={{ color: '#666', fontSize: '12px' }}>Enterprise security enabled</div>
              <div style={{ color: '#999', fontSize: '11px' }}>MFA required for all accounts</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px 56px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ color: '#999', fontSize: '12px' }}>
          © 2026 Alceon Group Pty Ltd · AFSL 345692
        </span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '12px' }}>Privacy</a>
          <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '12px' }}>Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default ResponseHubLanding;
