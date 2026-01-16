import React, { useState } from 'react';

// ============================================================
// ResponseHub - App Shell with Sidebar Navigation
// Interior layout for authenticated users
// ============================================================

// Icons as simple SVG components
const Icons = {
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  MessageSquare: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Database: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  ClipboardCheck: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Building: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9v.01" />
      <path d="M9 12v.01" />
      <path d="M9 15v.01" />
      <path d="M9 18v.01" />
    </svg>
  ),
};

// Navigation items configuration
const navItems = [
  { id: 'response-generation', label: 'Response Generation', icon: Icons.MessageSquare },
  { id: 'knowledge-base', label: 'Knowledge Base Management', icon: Icons.Database },
  { id: 'kb-search', label: 'Knowledge Base Search', icon: Icons.Search },
  { id: 'lc-queues', label: 'L&C Queues', icon: Icons.ClipboardCheck },
  { id: 'audit-logs', label: 'Audit Logs', icon: Icons.FileText },
];

// Sample funds data
const funds = [
  { id: 'alceon-re-fund-i', name: 'Alceon Real Estate Fund I', type: 'Real Estate' },
  { id: 'alceon-re-fund-ii', name: 'Alceon Real Estate Fund II', type: 'Real Estate' },
  { id: 'alceon-pe-fund-i', name: 'Alceon Private Equity Fund I', type: 'Private Equity' },
  { id: 'alceon-credit-fund', name: 'Alceon Credit Opportunities Fund', type: 'Credit' },
  { id: 'alceon-liquid', name: 'Alceon High Conviction Fund', type: 'Liquid Strategies' },
];

// Sidebar Component
const Sidebar = ({ collapsed, setCollapsed, activeItem, setActiveItem }) => {
  return (
    <aside
      style={{
        width: collapsed ? '72px' : '280px',
        minHeight: '100vh',
        background: '#ffffff',
        borderRight: '1px solid #e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo area */}
      <div
        style={{
          padding: collapsed ? '20px 16px' : '20px 24px',
          borderBottom: '1px solid #e8e8e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          minHeight: '72px',
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #1a3a5c 0%, #2a5a8c 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
              }}
            >
              <img
                src="/assets/bird-logo.svg"
                alt="Alceon"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a' }}>ResponseHub</div>
              <div style={{ fontSize: '11px', color: '#888', letterSpacing: '0.02em' }}>Alceon Group</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: '32px',
            height: '32px',
            border: 'none',
            background: '#f5f5f5',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            transition: 'all 0.2s',
          }}
        >
          {collapsed ? <Icons.Menu /> : <Icons.ChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              style={{
                width: '100%',
                padding: collapsed ? '12px' : '12px 16px',
                marginBottom: '4px',
                border: 'none',
                background: isActive ? 'rgba(26, 58, 92, 0.08)' : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: '12px',
                color: isActive ? '#1a3a5c' : '#555',
                transition: 'all 0.15s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '24px',
                    background: '#1a3a5c',
                    borderRadius: '0 3px 3px 0',
                  }}
                />
              )}
              <Icon />
              {!collapsed && (
                <span style={{ fontSize: '14px', fontWeight: isActive ? 600 : 500 }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User section */}
      <div
        style={{
          padding: collapsed ? '16px' : '16px 20px',
          borderTop: '1px solid #e8e8e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            background: '#f0f0f0',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
          }}
        >
          <Icons.User />
        </div>
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Sarah Mitchell
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>IR Manager</div>
          </div>
        )}
      </div>
    </aside>
  );
};

// Fund Selector Component (for Response Generation)
const FundSelector = ({ selectedFund, setSelectedFund, onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 140px)',
        padding: '40px',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '80px',
          height: '80px',
          background: 'rgba(26, 58, 92, 0.08)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1a3a5c',
          marginBottom: '32px',
        }}
      >
        <Icons.Building />
      </div>

      {/* Heading */}
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#1a1a1a',
          margin: '0 0 12px 0',
          letterSpacing: '-0.02em',
        }}
      >
        Select a Fund
      </h1>
      <p
        style={{
          fontSize: '16px',
          color: '#666',
          margin: '0 0 40px 0',
          textAlign: 'center',
          maxWidth: '400px',
          lineHeight: 1.6,
        }}
      >
        Choose the fund you want to generate responses for. Each fund has its own knowledge base and response history.
      </p>

      {/* Select dropdown */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            padding: '18px 20px',
            background: '#ffffff',
            border: '2px solid #e8e8e8',
            borderRadius: '12px',
            fontSize: '15px',
            color: selectedFund ? '#1a1a1a' : '#888',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.2s',
            boxShadow: isOpen ? '0 8px 24px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#1a3a5c')}
          onBlur={(e) => {
            if (!isOpen) e.currentTarget.style.borderColor = '#e8e8e8';
          }}
        >
          <span>
            {selectedFund
              ? funds.find((f) => f.id === selectedFund)?.name
              : 'Choose a fund...'}
          </span>
          <div
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s',
              color: '#888',
            }}
          >
            <Icons.ChevronDown />
          </div>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: '#ffffff',
              border: '1px solid #e8e8e8',
              borderRadius: '12px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              zIndex: 50,
              overflow: 'hidden',
            }}
          >
            {funds.map((fund) => (
              <button
                key={fund.id}
                onClick={() => {
                  setSelectedFund(fund.id);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  border: 'none',
                  background: selectedFund === fund.id ? 'rgba(26, 58, 92, 0.06)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '2px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (selectedFund !== fund.id) e.currentTarget.style.background = '#f8f8f8';
                }}
                onMouseLeave={(e) => {
                  if (selectedFund !== fund.id) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: selectedFund === fund.id ? 600 : 500,
                    color: selectedFund === fund.id ? '#1a3a5c' : '#1a1a1a',
                  }}
                >
                  {fund.name}
                </span>
                <span style={{ fontSize: '12px', color: '#888' }}>{fund.type}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Continue button (appears when fund selected) */}
      {selectedFund && (
        <button
          onClick={onContinue}
          style={{
            marginTop: '24px',
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #1a3a5c 0%, #2a5a8c 100%)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(26, 58, 92, 0.25)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(26, 58, 92, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 58, 92, 0.25)';
          }}
        >
          Continue to Response Generation
        </button>
      )}
    </div>
  );
};

// Placeholder pages for other sections
const PlaceholderPage = ({ title }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 140px)',
      color: '#888',
    }}
  >
    <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
      {title}
    </h2>
    <p style={{ fontSize: '14px' }}>This section is under development</p>
  </div>
);

// Main App Shell Component
const AppShell = ({ onContinue }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('response-generation');
  const [selectedFund, setSelectedFund] = useState(null);

  // Render active page content
  const renderContent = () => {
    switch (activeItem) {
      case 'response-generation':
        return <FundSelector selectedFund={selectedFund} setSelectedFund={setSelectedFund} onContinue={onContinue} />;
      case 'knowledge-base':
        return <PlaceholderPage title="Knowledge Base Management" />;
      case 'kb-search':
        return <PlaceholderPage title="Knowledge Base Search" />;
      case 'lc-queues':
        return <PlaceholderPage title="L&C Queues" />;
      case 'audit-logs':
        return <PlaceholderPage title="Audit Logs" />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fafafa',
        fontFamily: "'Outfit', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main content area */}
      <main
        style={{
          marginLeft: sidebarCollapsed ? '72px' : '280px',
          transition: 'margin-left 0.25s ease',
          minHeight: '100vh',
        }}
      >
        {/* Top header bar */}
        <header
          style={{
            height: '72px',
            background: '#ffffff',
            borderBottom: '1px solid #e8e8e8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
              {navItems.find((item) => item.id === activeItem)?.label}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {selectedFund && activeItem === 'response-generation' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  background: 'rgba(26, 58, 92, 0.06)',
                  borderRadius: '8px',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    background: '#22c55e',
                    borderRadius: '50%',
                  }}
                />
                <span style={{ fontSize: '13px', color: '#1a3a5c', fontWeight: 500 }}>
                  {funds.find((f) => f.id === selectedFund)?.name}
                </span>
                <button
                  onClick={() => setSelectedFund(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#888',
                    cursor: 'pointer',
                    padding: '2px',
                    fontSize: '16px',
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <div style={{ padding: '0' }}>{renderContent()}</div>
      </main>
    </div>
  );
};

export default AppShell;
