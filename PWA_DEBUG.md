# 🔧 PWA Debugging Guide - Chrome Installation Not Showing

## Step-by-Step Debugging

### Step 1: Verify Manifest File

**In Chrome DevTools:**
1. Press F12 to open DevTools
2. Go to **Application** tab
3. Click **Manifest** in left sidebar
4. You should see:
   - ✅ Manifest loaded successfully
   - ✅ All metadata fields visible
   - ✅ Icons listed with correct paths
   - ✅ No 404 errors in console

**If Manifest doesn't load:**
- Check that `/manifest.json` exists and is valid JSON
- Run: `npm run build` then `npm run start` to test production build
- Clear browser cache (Settings → Clear browsing data)

### Step 2: Verify Service Worker

**In Chrome DevTools:**
1. Go to **Application** → **Service Workers**
2. You should see:
   - ✅ `http://localhost:3000/sw.js` listed
   - ✅ Status shows "activated and running"
   - ✅ No red error indicator
*Tip:* the manifest now also includes screenshot entries with `form_factor` attributes (narrow/wide). They may reference the same PNG icons; errors in this section usually mean the file paths are wrong.**If Service Worker doesn't appear:**
1. Check **Console** tab for errors like:
   ```
   ❌ Service Worker registration failed
   ❌ Failed to load /sw.js
   ```
2. Verify `/public/sw.js` file exists
3. Check that `/sw.js` is being served (no 404)
4. Hard refresh: Ctrl+Shift+R or Cmd+Shift+R

### Step 3: Verify Icons

**In Chrome DevTools:**
1. Go to **Application** → **Manifest**
2. Scroll down to **Icons** section
3. For each icon, you should see:
   - ✅ Filename appears
   - ✅ Size is specified
   - ✅ Green checkmark (icon loaded successfully)
   - ❌ Red X means file is missing

**If icons show red X:**
1. Check that PNG files exist in `public/`:
   - `icon-192x192.png`
   - `icon-512x512.png`
   - `icon-maskable-192x192.png`
   - `icon-maskable-512x512.png`
2. Verify filenames match exactly (case-sensitive)
3. Check image files are not corrupted (try opening in image viewer)

### Step 4: Check Security Requirements

Chrome requires certain conditions for PWA to be installable:

```
✅ Served over HTTPS (or localhost for testing)
✅ Valid manifest.json
✅ At least one icon (192x192 or larger recommended)
✅ Service Worker registered
✅ Service Worker has fetch handler
✅ Not a redirect or error page
```

**Verify security:**
1. Check address bar - should NOT show "Not Secure"
2. For localhost, they bypass HTTPS requirement
3. In production, must use HTTPS

### Step 5: Console Error Checking

**Open Console tab and look for errors like:**

```
❌ Failed to load manifest.json
   → Fix: Verify file exists and path is correct

❌ Service Worker registration failed
   → Fix: Check /public/sw.js exists and is valid JS

❌ Manifest format is invalid
   → Fix: Validate JSON at https://jsonlint.com/

❌ Icon could not be loaded (404)
   → Fix: Verify PNG files exist in public/ folder

❌ No valid PNG icons in manifest
   → Fix: Add PNG icon entries to manifest.json
```

### Step 6: Test Installation Manually

Even without the install prompt, you can test:

1. **Chrome Desktop Testing:**
   - Click menu (⋮) → "Create shortcut..."
   - Select "Open as window"
   - This tests if PWA requirements are met

2. **Check Installation Readiness:**
   - DevTools → Lighthouse tab
   - Run "PWA" audit
   - Will show what's missing

### Step 7: Full Restart & Clear Cache

Sometimes caching causes issues:

```bash
# Stop dev server (Ctrl+C)
# Clear Node cache
npm cache clean --force

# Delete .next folder
rm -r .next  # Mac/Linux
rmdir /s .next  # Windows

# Restart dev server
npm run dev
```

**Then in Chrome:**
1. Press F12
2. Right-click refresh button
3. Select "Empty cache and hard refresh"

## Common Issues & Fixes

### Issue: Install button never appears

**Possible causes:**
- SVG-only icons (need PNG)
- Service Worker not registered
- Icons returning 404
- Manifest not found

**Fix:**
```
1. Add PNG icons to public/ folder
2. Update manifest.json with PNG icon paths
3. Verify /public/sw.js exists
4. Hard refresh browser (Ctrl+Shift+R)
5. Check DevTools console for errors
```

### Issue: Service Worker not showing in DevTools

**Possible causes:**
- SW.js has syntax errors
- SW.js not being served correctly
- Browser blocking registration

**Fix:**
```
1. Check DevTools Console for errors
2. Hard refresh the page
3. Verify /public/sw.js syntax is valid
4. Try in private/incognito window
```

### Issue: Icons showing red X in Manifest

**Possible causes:**
- PNG files don't exist
- Wrong filenames (case-sensitive)
- Files in wrong folder

**Fix:**
```
1. Verify files exist:
   ls public/icon*.png  # Mac/Linux
   dir public\icon*.png # Windows
2. Check filenames match manifest.json exactly
3. Use lowercase filenames only
```

### Issue: "Manifest format is invalid" error

**Possible causes:**
- JSON syntax errors
- Missing commas
- Trailing commas

**Fix:**
```
1. Validate JSON at: https://jsonlint.com/
2. Copy your manifest.json content
3. Paste into validator
4. Fix any reported errors
```

## Verification Checklist

Before testing PWA installation:

```
☐ /public/manifest.json exists and is valid JSON
☐ /public/sw.js exists and has valid JavaScript
☐ /public/icon-192x192.png exists
☐ /public/icon-512x512.png exists
☐ /public/icon.svg exists (optional but good to have)
☐ app/layout.tsx imports PWAMetaTags and ServiceWorkerRegistration
☐ DevTools shows Manifest is loaded
☐ DevTools shows Service Worker is registered
☐ DevTools shows icons with green checkmarks
☐ No errors in Console tab
```

## Testing in Production (Vercel/Netlify)

If testing locally works but production doesn't:

1. Deploy to Vercel/Netlify
2. Visit production URL in Chrome
3. Open DevTools
4. Check Manifest and Service Worker tabs
5. Verify icons load (check Network tab)

**If still not working:**
- Purge cache on hosting provider
- Wait 5 minutes for DNS propagation
- Try incognito window (fresh cache)

## Still Not Working?

Try this nuclear option:

1. Stop dev server
2. Delete `/public/manifest.json`
3. Regenerate manifest from scratch
4. Add explicit meta tags (already done in PWAMetaTags.tsx)
5. Verify all 4 PNG icons exist
6. Hard restart: `npm cache clean --force && npm run dev`

---

**Still stuck?** Check the Chrome DevTools Console for the exact error message and share that!
