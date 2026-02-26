# 🚀 Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

Check your versions:
```bash
node --version  # Should be v16 or higher
npm --version   # Should be 7 or higher
```

---

## 📦 Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd vite-project
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React 19.2.0
- React Router DOM 7.1.3
- Framer Motion 11.15.0
- Tailwind CSS 3.4.1
- Lucide React 0.468.0
- Vite 7.3.1
- And all other dependencies

**Expected time**: 30-60 seconds

### Step 3: Start Development Server
```bash
npm run dev
```

You should see:
```
  VITE v7.3.1  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 4: Open in Browser
Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🎉 Success!

You should now see the LuxeStore homepage with:
- Animated hero section
- Featured products
- Category cards
- Smooth animations

---

## 🛠️ Available Commands

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement (HMR)
- URL: http://localhost:5173
- Auto-reloads on file changes

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder
- Minified code
- Optimized assets
- Ready for deployment

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing
- URL: http://localhost:4173
- Tests the actual production build

### Lint Code
```bash
npm run lint
```
Runs ESLint to check code quality
- Identifies potential issues
- Enforces code standards

---

## 🔧 Troubleshooting

### Issue: Port 5173 already in use
**Solution**: Kill the process using that port or use a different port
```bash
npm run dev -- --port 3000
```

### Issue: Module not found errors
**Solution**: Delete node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build fails
**Solution**: Clear cache and rebuild
```bash
npm run build -- --force
```

### Issue: Styles not loading
**Solution**: Ensure Tailwind CSS is properly configured
```bash
# Check if tailwind.config.js exists
# Check if postcss.config.js exists
# Restart dev server
```

---

## 📁 Project Structure After Installation

```
vite-project/
├── node_modules/          # Dependencies (auto-generated)
├── dist/                  # Production build (after npm run build)
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # React components
│   ├── context/          # Context providers
│   ├── data/             # Product data
│   ├── pages/            # Page components
│   ├── App.jsx           # Main app
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── README.md             # Documentation
```

---

## 🌐 Browser Support

This project works on all modern browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

**Note**: Internet Explorer is not supported

---

## 📱 Testing on Mobile

### Option 1: Use Browser DevTools
1. Open Chrome DevTools (F12)
2. Click the device toggle icon
3. Select a mobile device
4. Refresh the page

### Option 2: Test on Real Device
1. Find your local IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Start dev server with host flag:
   ```bash
   npm run dev -- --host
   ```

3. Open on mobile device:
   ```
   http://YOUR_IP_ADDRESS:5173
   ```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to Netlify
1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop the `dist/` folder to [Netlify](https://app.netlify.com/drop)

### Deploy to GitHub Pages
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

---

## 🔐 Environment Variables

This project doesn't require environment variables for basic functionality.

If you want to add API integration later, create a `.env` file:
```env
VITE_API_URL=https://your-api.com
VITE_API_KEY=your-api-key
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📊 Performance Tips

### Development
- Use `npm run dev` for fast HMR
- Keep browser DevTools open to monitor performance
- Use React DevTools extension

### Production
- Always run `npm run build` before deploying
- Enable gzip compression on your server
- Use a CDN for static assets
- Enable caching headers

---

## 🆘 Getting Help

### Documentation
- [README.md](./README.md) - Full project documentation
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [FEATURES.md](./FEATURES.md) - Complete features list
- [PAGES_GUIDE.md](./PAGES_GUIDE.md) - Visual page guide

### Resources
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

## ✅ Verification Checklist

After installation, verify everything works:

- [ ] Development server starts without errors
- [ ] Homepage loads with animations
- [ ] Navigation works (all pages accessible)
- [ ] Search functionality works
- [ ] Products page shows all products
- [ ] Filters work on products page
- [ ] Product details page loads
- [ ] Add to cart works
- [ ] Add to wishlist works
- [ ] Cart page shows items
- [ ] Wishlist page shows items
- [ ] Theme toggle works (dark/light)
- [ ] Toast notifications appear
- [ ] Mobile menu works (resize browser)
- [ ] All animations are smooth
- [ ] No console errors

---

## 🎓 Next Steps

1. **Explore the Code**
   - Check out `src/components/` for reusable components
   - Look at `src/pages/` for page implementations
   - Review `src/context/` for state management

2. **Customize**
   - Change colors in `tailwind.config.js`
   - Add more products in `src/data/products.js`
   - Modify components to fit your needs

3. **Extend**
   - Add backend API integration
   - Implement user authentication
   - Add payment processing
   - Create admin dashboard

---

## 🎉 You're All Set!

Your LuxeStore e-commerce application is now running!

**Start exploring**: http://localhost:5173

Enjoy building with React! 🚀
