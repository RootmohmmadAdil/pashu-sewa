# 🚀 Quick Start Guide - PashuSewa React App

## Installation Steps

### 1. Navigate to the React Frontend
```powershell
cd "c:\Users\MD ADIL\Downloads\pashusewa-main\pashusewa-main\frontend-react"
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Start Development Server
```powershell
npm run dev
```

The app will open at: **http://localhost:3000**

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
frontend-react/
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Main app with routing
│   ├── App.css               # All styles
│   ├── config.js             # API config
│   │
│   ├── components/           # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ReportCard.jsx
│   │   └── StatusModal.jsx
│   │
│   ├── pages/                # Page components
│   │   ├── UserReport.jsx    # User reporting page
│   │   └── AdminPanel.jsx    # Admin dashboard
│   │
│   ├── services/
│   │   └── api.js            # API calls
│   │
│   └── utils/
│       ├── hooks.js          # Custom hooks
│       └── animalDetection.js # AI detection
│
├── package.json
├── vite.config.js
└── index.html
```

## Routes

- **`/`** - User Report Page (report injured animals)
- **`/admin`** - Admin Panel (manage reports, NGO dashboard)

## Configuration

### Update API URL
Edit `src/config.js` to point to your backend:

```javascript
export const API_URL = "https://your-backend-url.workers.dev";
```

## Features

### User Page (/)
- 📸 Upload/capture photo
- 📍 Auto GPS location
- 🤖 AI animal detection
- ✅ Submit reports
- 📊 View recent reports

### Admin Page (/admin)
- 📋 View all reports
- 📏 Distance-based filtering
- 🔄 Update report status
- 🗺️ Google Maps integration
- 🎯 Location radius filter

## Build for Production

```powershell
npm run build
```

Output will be in the `dist/` folder. Deploy this folder to:
- Cloudflare Pages
- Vercel
- Netlify
- Any static hosting

## Notes

✅ **Zero HTML files** - Everything is React components  
✅ **Same visual design** - No UI changes  
✅ **All features preserved** - Complete functionality  
✅ **Well-structured code** - Clean architecture  

## Troubleshooting

### Port already in use?
The dev server uses port 3000 by default. Change it in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001  // Change to any available port
  }
})
```

### API errors?
Check `src/config.js` has the correct backend URL.

## Development Tips

- Hot reload is enabled - changes appear instantly
- Check browser console for any errors
- Use React DevTools extension for debugging

## Support

For issues, check:
1. Node.js version (v14+)
2. npm is installed
3. All dependencies installed (`npm install`)
4. Backend API is running and accessible

---

**Happy Coding! 🎉**
