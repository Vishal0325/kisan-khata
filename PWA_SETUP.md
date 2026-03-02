# PWA (Progressive Web App) Setup Guide

## What's Been Configured

Your Kisan Khata app is now set up as a Progressive Web App (PWA) with the following features:

### 1. **Manifest File** (`/public/manifest.json`)
- App name: "Kisan Khata - Digital Farm Credit Management"
- Short name: "KisanKhata"
- Display mode: "standalone" (appears like a native app, no browser UI)
- Theme color: #059669 (Emerald Green)
- Background color: #ffffff (White)
- Includes app shortcuts for Farmers and Vendors sections

### 2. **Service Worker** (`/public/sw.js`)
- Enables offline functionality
- Caches essential app pages and assets
- Auto-registers when app loads
- Provides fallback support when network unavailable

### 3. **Viewport Configuration**
- viewport-fit: "cover" - Handles phone notches/dynamic island
- Device width initial scale set to 1
- Maximum scale disabled to prevent zoom issues
- User scalable disabled for app-like experience

### 4. **Meta Tags** (in `app/layout.tsx`)
- Apple Web App capability enabled
- Status bar style: black-translucent
- Theme color: #059669
- Custom icons configured
- Open Graph metadata for social sharing

### 5. **Icons**
- Primary icon: `/public/icon.svg` (Emerald green with farmer illustration)
- Supports both regular and maskable icon purposes
- SVG format for crisp scaling on all devices

## How to Install on Mobile

### On iOS (Apple devices):
1. Open the app in Safari
2. Tap the **Share** button (↗️)
3. Scroll down and tap **"Add to Home Screen"**
4. Name the shortcut (or keep default)
5. Tap **Add**

### On Android (Chrome/Firefox):
1. Open the app in Chrome or Firefox
2. Look for the **Install** prompt (usually appears automatically)
3. Or tap the **menu** (⋮) → **"Install app"**
4. Confirm the installation
5. App will appear on home screen

## Features Available After Installation

✅ **Offline Mode** - Browse previously visited pages without internet  
✅ **App Icon** - Appears on home screen with emerald-green icon  
✅ **Standalone Display** - Opens fullscreen without browser chrome  
✅ **Notch Support** - Content doesn't get hidden by phone notches/islands  
✅ **Persistent Storage** - App data persists between sessions  
✅ **Quick Shortcuts** - Long-press the app icon to access Farmers/Vendors pages  
✅ **Push Notifications** Ready - Can be added to receive updates  

## Testing the PWA Locally

1. Run the dev server:
   ```bash
   npm run dev
   ```

2. Open DevTools (F12 or Cmd+Option+I)

3. Go to **Application** tab → **Manifest**
   - You should see the manifest.json loaded

4. Go to **Application** tab → **Service Workers**
   - You should see the service worker registered

5. Use Chrome's "Install" feature (see Android steps above) to test full PWA experience

## Icon Regeneration Script

If you prefer a CLI solution instead of using online tools, a Node script is included to convert `icon.svg` into the required PNG files.

```bash
# run from workspace root
npm run icons   # shortcut defined below
```

The script (`scripts/generate-pwa-icons.js`) resizes the SVG into 96×96, 192×192 and 512×512 PNGs along with maskable versions.

Add the following `package.json` script if it's not already defined:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "icons": "node scripts/generate-pwa-icons.js"
}
```

## Online Status Detection

The app automatically works offline with cached pages. To enhance offline experience in the future, you can:

1. Add an offline indicator component
2. Store data in IndexedDB for offline access
3. Sync data when connection returns

## Updating the App Manifest

To modify app name, colors, or icons:
1. Edit `/public/manifest.json`
2. Replace the icon at `/public/icon.svg`
3. Redeploy the app

Users with the app installed will get updates on next app open.

## Best Practices for PWA

✓ App loads fast (under 3 seconds)  
✓ Works offline  
✓ Can be installed on home screen  
✓ Has proper app icon  
✓ Responsive design (mobile-first)  
✓ Secure (HTTPS in production)  

## Notes

- Service Worker may take a few seconds to register. Refresh if needed.
- For production, ensure your site uses HTTPS
- Some features (like push notifications) require HTTPS
- Offline functionality works best with modern browsers (Chrome 40+, Safari 11.3+, Firefox 44+)

---

**Ready to install? Try it on your phone!** 📱
