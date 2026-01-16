import React, { useState } from 'react';
import ResponseHubLanding from './responsehub-1-landing.jsx';
import AppShell from './responsehub-2-fund-selection.jsx';
import QuestionInputScreen from './responsehub-3-question-input.jsx';
import ResponseGenerationInterface from './responsehub-4-response-interface.jsx';

// Main App component that handles navigation between screens
const App = () => {
  const [currentScreen, setCurrentScreen] = useState(1);

  const navigateToScreen = (screenNumber) => {
    setCurrentScreen(screenNumber);
  };

  // Render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <ResponseHubLanding onSignIn={() => navigateToScreen(2)} />;
      case 2:
        return <AppShell onContinue={() => navigateToScreen(3)} />;
      case 3:
        return <QuestionInputScreen onGenerate={() => navigateToScreen(4)} />;
      case 4:
        return <ResponseGenerationInterface />;
      default:
        return <ResponseHubLanding onSignIn={() => navigateToScreen(2)} />;
    }
  };

  return <>{renderScreen()}</>;
};

export default App;
