# Cloudflare Pages Deployment Guide

## Deployment Options

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Build your project** (Already done! ✅)
   ```bash
   npm run build
   ```
   Output is in the `dist/` folder

2. **Go to Cloudflare Dashboard**
   - Visit https://dash.cloudflare.com/
   - Go to "Pages" section
   - Click "Create a project"

3. **Choose Direct Upload**
   - Click "Upload assets"
   - Name your project: `pashusewa-react` or any name you prefer

4. **Upload the dist folder**
   - Drag and drop the entire `dist/` folder
   - Or browse and select all files from `dist/`

5. **Deploy**
   - Click "Deploy site"
   - Your app will be live at: `https://pashusewa-react.pages.dev`

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler** (if not already installed)
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   wrangler pages deploy dist --project-name=pashusewa-react
   ```

### Option 3: Connect to Git Repository

1. **Push code to GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Add React frontend"
   git push
   ```

2. **Connect in Cloudflare Dashboard**
   - Go to Pages → "Create a project"
   - Click "Connect to Git"
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Root directory: `frontend-react`

## Build Settings

When connecting via Git, use these settings:

- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `frontend-react` (if deploying from subdirectory)
- **Node version**: 18 or higher

## Environment Variables

No environment variables needed! The API URL is configured in `src/config.js`

## After Deployment

1. Your site will be available at: `https://your-project-name.pages.dev`
2. Update the CORS settings in your backend to allow this new domain
3. Optionally add a custom domain

## Backend Configuration

Your backend is already deployed at:
- `https://pashusewa.pashusewa-india.workers.dev`

Make sure to update CORS in `backend/worker.js`:

```javascript
const allowedOrigins = [
  "https://pashusewa.pages.dev",
  "https://your-new-domain.pages.dev"  // Add your new React deployment
];
```

## Database Configuration

Your D1 Database ID: `f9965a11-85bc-4558-a4ff-5160a9444c8c`

This is already configured in `backend/wrangler.toml`. No changes needed for frontend deployment.

## Testing After Deployment

1. Visit your deployed URL
2. Test user reporting page (/)
3. Test admin panel (/admin)
4. Verify API calls work correctly
5. Test on mobile devices

## Troubleshooting

### CORS Errors?
Update `backend/worker.js` to include your new Pages domain in `allowedOrigins`

### 404 on page refresh?
Cloudflare Pages handles SPA routing automatically. No extra configuration needed for React Router.

### Build fails?
- Check Node.js version (18+)
- Run `npm install` first
- Check for any errors in code

## Quick Deploy Command

```bash
# Build
npm run build

# Deploy (if using Wrangler)
wrangler pages deploy dist --project-name=pashusewa-react
```

---

**Need help?** Check Cloudflare Pages docs: https://developers.cloudflare.com/pages/
