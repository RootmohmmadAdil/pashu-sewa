# PashuSewa - React Application

This is the React version of the PashuSewa Animal Rescue Reporting System. The application has been fully converted from vanilla HTML/JS to React with zero visual changes.

## 🚀 Project Structure

```
frontend-react/
├── index.html              # Root HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.jsx            # Application entry point
│   ├── App.jsx             # Main App component with routing
│   ├── App.css             # Global styles (unchanged from original)
│   ├── config.js           # API configuration
│   ├── components/         # Reusable React components
│   │   ├── Header.jsx      # Header component
│   │   ├── Footer.jsx      # Footer component
│   │   ├── ReportCard.jsx  # Report card display component
│   │   └── StatusModal.jsx # Status update modal component
│   ├── pages/              # Page components
│   │   ├── UserReport.jsx  # User reporting page (index.html conversion)
│   │   └── AdminPanel.jsx  # Admin panel page (admin.html conversion)
│   ├── services/           # API service layer
│   │   └── api.js          # API calls (fetch reports, create, update)
│   └── utils/              # Utility functions and hooks
│       ├── hooks.js        # Custom React hooks (geolocation, etc.)
│       └── animalDetection.js  # Animal detection logic
└── .gitignore
```

## 📦 Installation

1. Navigate to the frontend-react directory:
   ```bash
   cd frontend-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔧 Key Features

### React Components
- **UserReport Page**: Handles animal injury reporting with image upload, location detection, and AI-powered animal recognition
- **AdminPanel Page**: NGO dashboard for managing reports with location-based filtering and status updates
- **Reusable Components**: Header, Footer, ReportCard, StatusModal

### Custom Hooks
- `useGeolocation`: Manages user location with automatic fetching and manual refresh
- Utility functions for distance calculation, image conversion, and animal detection

### State Management
- React hooks (useState, useEffect) for component state
- No external state management library needed

### Routing
- React Router v6 for navigation between User and Admin pages
- Clean URL structure: `/` for user page, `/admin` for admin panel

## 🎨 Styling

All original CSS has been preserved in `src/App.css` with zero visual changes. The application maintains:
- Responsive design for mobile and desktop
- Original color scheme and branding
- All animations and transitions
- Grid layouts and flex containers

## 🔌 API Integration

The application connects to the same Cloudflare Workers backend:
- Base URL configured in `src/config.js`
- API endpoints:
  - GET `/api/reports` - Fetch all reports
  - POST `/api/report` - Create new report
  - POST `/api/update-status` - Update report status

## 🆕 React Conversion Highlights

### Before (Vanilla JS)
- Direct DOM manipulation
- Event listeners attached manually
- Global variables and functions
- Separate HTML files for each page

### After (React)
- Component-based architecture
- React hooks for state and effects
- Clean separation of concerns
- Single-page application with routing

## 📱 Features Maintained

✅ Smart photo upload with AI animal detection  
✅ GPS location tracking with manual refresh  
✅ Auto-generated injury notes  
✅ Real-time report submission  
✅ Mobile-optimized interface  
✅ NGO dashboard with filtering  
✅ Location-based report filtering  
✅ Distance calculation  
✅ Status management (Pending → In Progress → Resolved)  
✅ Google Maps integration  

## 🔄 Deployment

### Development
The React app runs on `http://localhost:3000` during development.

### Production
Build the application and deploy the `dist/` folder to any static hosting service:
- Cloudflare Pages
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any other static file hosting

### Configuration
Update the API URL in `src/config.js` to match your backend deployment.

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Vite** - Build tool and dev server
- **Native Web APIs** - Geolocation, FileReader, Canvas (for animal detection)

## 📝 Notes

- No HTML files in the pages - everything is pure React components
- Well-structured code with clear separation of concerns
- All functionality from the original application preserved
- Same backend API - no changes required
- Zero visual differences from the original design
