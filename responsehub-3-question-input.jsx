import React, { useState, useRef } from 'react';

// ============================================================
// ResponseHub - Question Input Screen (Screen 3)
// Users paste questions or upload DDQ document
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
  Upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  FileWord: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8 13h2l1 4 1-4h2" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  AlertCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
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

// Sample selected fund
const selectedFund = {
  id: 'alceon-re-fund-ii',
  name: 'Alceon Real Estate Fund II',
  type: 'Real Estate',
};

// Sidebar Component
const Sidebar = ({ collapsed, setCollapsed, activeItem, setActiveItem }) => {
  return (
    <aside
      style={{
        width: collapsed ? '72px' : '295px',
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

// Main Question Input Screen
const QuestionInputScreen = ({ onGenerate }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('response-generation');
  const [questionText, setQuestionText] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.docx') || file.name.endsWith('.doc'))) {
      setUploadedFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate processing
    setTimeout(() => {
      setIsGenerating(false);
      onGenerate();
    }, 2000);
  };

  const canGenerate = questionText.trim().length > 0 || uploadedFile !== null;

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
          marginLeft: sidebarCollapsed ? '72px' : '295px',
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
                {selectedFund.name}
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '48px 32px',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {/* Page header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: '0 0 12px 0',
                letterSpacing: '-0.02em',
              }}
            >
              Enter Your DDQ Question
            </h2>
            <p style={{ fontSize: '16px', color: '#666', margin: 0, lineHeight: 1.6 }}>
              Paste your question below or upload a Word document containing DDQ questions
            </p>
          </div>

          {/* Input card */}
          <div
            style={{
              width: '100%',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e8e8e8',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Textarea section */}
            <div style={{ padding: '24px 24px 0 24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: '10px',
                }}
              >
                Question Text
              </label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Paste your due diligence question here...

Example: What is the fund's approach to ESG integration in the investment process, and how do you measure and report on ESG performance?"
                style={{
                  width: '100%',
                  minHeight: '180px',
                  padding: '16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '12px',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: '#1a1a1a',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s, background 0.2s',
                  boxSizing: 'border-box',
                  background: '#fafafa',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1a3a5c';
                  e.target.style.background = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e8e8e8';
                  e.target.style.background = '#fafafa';
                }}
              />
              {questionText.length > 0 && (
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#888' }}>
                  {questionText.length} characters
                </div>
              )}
            </div>

            {/* Divider with "or" */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '24px',
                gap: '16px',
              }}
            >
              <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
              <span style={{ fontSize: '13px', color: '#888', fontWeight: 500 }}>or</span>
              <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
            </div>

            {/* File upload section */}
            <div style={{ padding: '0 24px 24px 24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: '10px',
                }}
              >
                Upload DDQ Document
              </label>

              {!uploadedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${isDragging ? '#1a3a5c' : '#d4d4d4'}`,
                    borderRadius: '12px',
                    padding: '32px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: isDragging ? 'rgba(26, 58, 92, 0.04)' : '#fafafa',
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".doc,.docx"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(26, 58, 92, 0.08)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px auto',
                      color: '#1a3a5c',
                    }}
                  >
                    <Icons.Upload />
                  </div>
                  <p style={{ fontSize: '15px', color: '#1a1a1a', margin: '0 0 4px 0', fontWeight: 500 }}>
                    Drop your file here or click to browse
                  </p>
                  <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>
                    Supports Word documents (.doc, .docx)
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    border: '2px solid #22c55e',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: 'rgba(34, 197, 94, 0.04)',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'rgba(34, 197, 94, 0.1)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#22c55e',
                    }}
                  >
                    <Icons.FileWord />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', color: '#1a1a1a', margin: '0 0 2px 0', fontWeight: 600 }}>
                      {uploadedFile.name}
                    </p>
                    <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>
                      {(uploadedFile.size / 1024).toFixed(1)} KB • Ready to process
                    </p>
                  </div>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      background: '#22c55e',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <Icons.Check />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    style={{
                      width: '32px',
                      height: '32px',
                      background: '#f5f5f5',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#888',
                    }}
                  >
                    <Icons.X />
                  </button>
                </div>
              )}
            </div>

            {/* Action footer */}
            <div
              style={{
                padding: '20px 24px',
                borderTop: '1px solid #e8e8e8',
                background: '#fafafa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {canGenerate ? (
                  <>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        background: '#22c55e',
                        borderRadius: '50%',
                      }}
                    />
                    <span style={{ fontSize: '13px', color: '#22c55e', fontWeight: 500 }}>
                      Ready to generate
                    </span>
                  </>
                ) : (
                  <>
                    <Icons.AlertCircle />
                    <span style={{ fontSize: '13px', color: '#888' }}>
                      Enter a question or upload a file to continue
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                style={{
                  padding: '14px 28px',
                  background: canGenerate
                    ? 'linear-gradient(135deg, #1a3a5c 0%, #2a5a8c 100%)'
                    : '#e8e8e8',
                  border: 'none',
                  borderRadius: '12px',
                  color: canGenerate ? 'white' : '#a3a3a3',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: canGenerate && !isGenerating ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: canGenerate ? '0 6px 20px rgba(26, 58, 92, 0.25)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {isGenerating ? (
                  <>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <Icons.Sparkles />
                    Generate Response
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Helper text */}
          <div
            style={{
              marginTop: '24px',
              padding: '16px 20px',
              background: 'rgba(26, 58, 92, 0.04)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              maxWidth: '600px',
            }}
          >
            <div style={{ color: '#1a3a5c', marginTop: '2px' }}>
              <Icons.AlertCircle />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#555', margin: '0 0 4px 0', fontWeight: 500 }}>
                Tip: For best results
              </p>
              <p style={{ fontSize: '13px', color: '#888', margin: 0, lineHeight: 1.5 }}>
                Paste one question at a time for more accurate responses. When uploading a document, 
                questions will be processed sequentially.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default QuestionInputScreen;
