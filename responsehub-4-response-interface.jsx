import React, { useState } from 'react';

// ============================================================
// ResponseHub - Response Generation Interface
// Shows DDQ question, AI-generated answer, and source references
// ============================================================

// Icons
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
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </svg>
  ),
  History: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  BookOpen: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Copy: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  RotateCcw: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Quote: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  ),
};

// Navigation items
const navItems = [
  { id: 'response-generation', label: 'Response Generation', icon: Icons.MessageSquare },
  { id: 'knowledge-base', label: 'Knowledge Base Management', icon: Icons.Database },
  { id: 'kb-search', label: 'Knowledge Base Search', icon: Icons.Search },
  { id: 'lc-queues', label: 'L&C Queues', icon: Icons.ClipboardCheck },
  { id: 'audit-logs', label: 'Audit Logs', icon: Icons.FileText },
];

// Sample data
const currentQuestion = {
  id: 'q-001',
  text: 'What is the fund\'s approach to ESG integration in the investment process, and how do you measure and report on ESG performance?',
  source: 'Investor DDQ - Q47',
};

const initialAnswer = `Alceon Real Estate Fund II integrates Environmental, Social, and Governance (ESG) considerations throughout the entire investment lifecycle, from initial screening to exit.

Our ESG integration approach includes:

1. **Investment Screening**: All potential investments undergo ESG due diligence as part of our standard assessment process. We evaluate environmental risks, social impact considerations, and governance structures before proceeding with any investment.

2. **Active Ownership**: Post-investment, we work closely with portfolio companies and asset managers to implement ESG improvements. This includes energy efficiency initiatives, tenant engagement programs, and governance enhancements.

3. **Measurement & Reporting**: We track key ESG metrics including energy consumption, carbon emissions, water usage, and waste management across our portfolio. These metrics are reported quarterly to investors through our ESG dashboard and annually in our Sustainability Report.

4. **Industry Alignment**: Our approach is aligned with the UN Principles for Responsible Investment (UN PRI), and we benchmark our performance against GRESB standards for real estate investments.`;

const similarQuestions = [
  {
    id: 'hist-1',
    question: 'How does the fund incorporate ESG factors into investment decisions?',
    answer: 'The fund incorporates ESG factors through a systematic integration process that evaluates environmental risks, social impact, and governance quality at every stage of the investment cycle...',
    date: '2025-11-15',
    fund: 'Alceon RE Fund I',
    similarity: 94,
  },
  {
    id: 'hist-2',
    question: 'Describe your responsible investment policy and how ESG risks are assessed.',
    answer: 'Our Responsible Investment Policy establishes a framework for identifying, assessing, and managing ESG risks across all investment activities. We conduct thorough ESG due diligence...',
    date: '2025-10-22',
    fund: 'Alceon RE Fund II',
    similarity: 89,
  },
  {
    id: 'hist-3',
    question: 'What sustainability reporting do you provide to investors?',
    answer: 'We provide comprehensive sustainability reporting through multiple channels: quarterly ESG metrics dashboards, annual Sustainability Reports aligned with GRI standards...',
    date: '2025-09-08',
    fund: 'Alceon RE Fund II',
    similarity: 76,
  },
];

const documentReference = {
  id: 'doc-1',
  title: 'Alceon ESG Policy & Framework 2025',
  type: 'Policy Document',
  date: '2025-01-15',
  citation: 'Section 4.2 - ESG Integration in Investment Process: "Alceon integrates ESG considerations throughout the investment lifecycle, from initial screening and due diligence through to active ownership and exit. Our approach is guided by materiality assessments that identify the most significant ESG factors for each asset class and investment strategy. We measure performance against established frameworks including GRESB for real estate and UN PRI reporting requirements."',
  page: 'Page 12-14',
};

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
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>Sarah Mitchell</div>
            <div style={{ fontSize: '12px', color: '#888' }}>IR Manager</div>
          </div>
        )}
      </div>
    </aside>
  );
};

// Historical Q&A Card
const HistoricalQACard = ({ item, isExpanded, onToggle }) => {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.2s',
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '16px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            background: 'rgba(26, 58, 92, 0.08)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1a3a5c',
            flexShrink: 0,
          }}
        >
          <Icons.History />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#1a3a5c',
                background: 'rgba(26, 58, 92, 0.1)',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              {item.similarity}% match
            </span>
            <span style={{ fontSize: '12px', color: '#888' }}>{item.fund}</span>
            <span style={{ fontSize: '12px', color: '#ccc' }}>•</span>
            <span style={{ fontSize: '12px', color: '#888' }}>{item.date}</span>
          </div>
          <p style={{ fontSize: '14px', color: '#1a1a1a', margin: 0, lineHeight: 1.5 }}>
            {item.question}
          </p>
        </div>
        <div
          style={{
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
            color: '#888',
          }}
        >
          <Icons.ChevronRight />
        </div>
      </button>

      {/* Expanded answer */}
      {isExpanded && (
        <div
          style={{
            padding: '0 16px 16px 60px',
            borderTop: '1px solid #f0f0f0',
          }}
        >
          <div
            style={{
              background: '#f8f9fa',
              borderRadius: '8px',
              padding: '14px',
              marginTop: '12px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Approved Answer
            </div>
            <p style={{ fontSize: '13px', color: '#555', margin: 0, lineHeight: 1.6 }}>
              {item.answer}
            </p>
          </div>
          <button
            style={{
              marginTop: '12px',
              padding: '8px 14px',
              background: 'transparent',
              border: '1px solid #e8e8e8',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#1a3a5c',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Icons.Copy />
            Use this answer
          </button>
        </div>
      )}
    </div>
  );
};

// Document Reference Card
const DocumentReferenceCard = ({ doc }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: '16px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            background: 'rgba(34, 197, 94, 0.1)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#22c55e',
            flexShrink: 0,
          }}
        >
          <Icons.BookOpen />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#22c55e',
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              {doc.type}
            </span>
            <span style={{ fontSize: '12px', color: '#888' }}>{doc.page}</span>
          </div>
          <p style={{ fontSize: '14px', color: '#1a1a1a', margin: 0, fontWeight: 500 }}>
            {doc.title}
          </p>
        </div>
        <div
          style={{
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
            color: '#888',
          }}
        >
          <Icons.ChevronRight />
        </div>
      </button>

      {/* Citation */}
      {isExpanded && (
        <div style={{ padding: '0 16px 16px 60px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.02) 100%)',
              borderLeft: '3px solid #22c55e',
              borderRadius: '0 8px 8px 0',
              padding: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ color: '#22c55e', opacity: 0.5 }}>
                <Icons.Quote />
              </span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Relevant Citation
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#555', margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>
              "{doc.citation}"
            </p>
          </div>
          <button
            style={{
              marginTop: '12px',
              padding: '8px 14px',
              background: 'transparent',
              border: '1px solid #e8e8e8',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#555',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Icons.ExternalLink />
            View full document
          </button>
        </div>
      )}
    </div>
  );
};

// Main Response Generation Interface
const ResponseGenerationInterface = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('response-generation');
  const [answer, setAnswer] = useState(initialAnswer);
  const [expandedHistoryId, setExpandedHistoryId] = useState('hist-1');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const handleReset = () => {
    setAnswer(initialAnswer);
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

      {/* Main content */}
      <main
        style={{
          marginLeft: sidebarCollapsed ? '72px' : '280px',
          transition: 'margin-left 0.25s ease',
          minHeight: '100vh',
        }}
      >
        {/* Header */}
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
              Response Generation
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                Alceon Real Estate Fund II
              </span>
              <button
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
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>
            {/* Left column - Question & Answer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Question Card */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #e8e8e8',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#888',
                      background: '#f0f0f0',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {currentQuestion.source}
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {currentQuestion.text}
                </h2>
              </div>

              {/* Answer Editor Card */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e8e8e8',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                }}
              >
                {/* Editor header */}
                <div
                  style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #e8e8e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(135deg, #1a3a5c 0%, #2a5a8c 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      <Icons.Sparkles />
                    </div>
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                        Proposed Answer
                      </span>
                      <span style={{ fontSize: '12px', color: '#888', marginLeft: '8px' }}>
                        AI-generated • Editable
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    style={{
                      padding: '6px 12px',
                      background: 'transparent',
                      border: '1px solid #e8e8e8',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#666',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Icons.RotateCcw />
                    Reset
                  </button>
                </div>

                {/* Textarea */}
                <div style={{ padding: '20px 24px' }}>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '350px',
                      padding: '16px',
                      border: '2px solid #e8e8e8',
                      borderRadius: '12px',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: '#1a1a1a',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#1a3a5c')}
                    onBlur={(e) => (e.target.style.borderColor = '#e8e8e8')}
                  />
                </div>

                {/* Actions */}
                <div
                  style={{
                    padding: '16px 24px',
                    borderTop: '1px solid #e8e8e8',
                    background: '#fafafa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontSize: '13px', color: '#888' }}>
                    {answer.length} characters • {answer.split(/\s+/).filter(Boolean).length} words
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      style={{
                        padding: '12px 20px',
                        background: 'transparent',
                        border: '1px solid #e8e8e8',
                        borderRadius: '10px',
                        fontSize: '14px',
                        color: '#555',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Icons.Copy />
                      Copy
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSaving}
                      style={{
                        padding: '12px 24px',
                        background: isSaving
                          ? '#22c55e'
                          : 'linear-gradient(135deg, #1a3a5c 0%, #2a5a8c 100%)',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: isSaving ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(26, 58, 92, 0.25)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {isSaving ? (
                        <>
                          <Icons.Check />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Icons.Check />
                          Submit as Approved
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - References */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Similar Questions Section */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                    Similar Questions
                  </h3>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#888',
                      background: '#f0f0f0',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    {similarQuestions.length}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {similarQuestions.map((item) => (
                    <HistoricalQACard
                      key={item.id}
                      item={item}
                      isExpanded={expandedHistoryId === item.id}
                      onToggle={() =>
                        setExpandedHistoryId(expandedHistoryId === item.id ? null : item.id)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Knowledge Base Section */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                    Knowledge Base References
                  </h3>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#888',
                      background: '#f0f0f0',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    1
                  </span>
                </div>
                <DocumentReferenceCard doc={documentReference} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResponseGenerationInterface;
