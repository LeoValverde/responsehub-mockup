# ResponseHub Demo - Alceon Group

A 4-screen demo mockup showing the ResponseHub investor relations platform flow.

## Screen Flow

1. **Landing Page** (`responsehub-1-landing.jsx`)
   - Marketing landing page with SSO sign-in button
   - Click "Sign in with SSO" to proceed

2. **Fund Selection** (`responsehub-2-fund-selection.jsx`)
   - Select a fund from the dropdown
   - Click "Continue to Response Generation" to proceed

3. **Question Input** (`responsehub-3-question-input.jsx`)
   - Enter a DDQ question or upload a Word document
   - Click "Generate Response" to proceed

4. **Response Interface** (`responsehub-4-response-interface.jsx`)
   - View AI-generated response with sources
   - Edit, copy, or approve the response

## Setup & Run

### Prerequisites
- Node.js 16+ and npm installed

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`.

### Building for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

## Deploy to GitHub Pages

```bash
# Install dependencies (first time only)
npm install

# Deploy to GitHub Pages
npm run deploy
```

This will build the app and deploy it to: https://practiv.github.io/responsehub-mockup

## Demo Navigation

The demo uses simple React state management to navigate between screens. Each button is wired up to move to the next screen:

- Screen 1 → Screen 2: "Sign in with SSO"
- Screen 2 → Screen 3: "Continue to Response Generation" (after selecting a fund)
- Screen 3 → Screen 4: "Generate Response" (after entering a question)

## Tech Stack

- React 18
- Vite (for fast development)
- Inline CSS-in-JS styling (no external CSS frameworks)
- Google Fonts: Outfit & DM Sans

## Project Structure

```
response-hub-mockup/
├── index.html                           # HTML entry point
├── index.jsx                            # React entry point
├── App.jsx                              # Main app with navigation logic
├── responsehub-1-landing.jsx           # Screen 1: Landing page
├── responsehub-2-fund-selection.jsx    # Screen 2: Fund selection
├── responsehub-3-question-input.jsx    # Screen 3: Question input
├── responsehub-4-response-interface.jsx # Screen 4: Response interface
├── package.json                         # Dependencies
├── vite.config.js                       # Vite configuration
└── README.md                            # This file
```

## Notes

- This is a presentation demo, not a production application
- No backend or API integration
- All navigation is client-side using React state
- Fonts are loaded from Google Fonts CDN
