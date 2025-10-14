# 🚀 Ruben Trijbs Portfolio

> **Full-Stack Developer & Creative Designer Portfolio**  
> Modern, secure, and optimized portfolio website with Vercel Analytics integration

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://trijbsworld.nl)
[![Security Headers](https://img.shields.io/badge/Security-A+-green?style=flat&logo=security)](https://securityheaders.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Live Site:** [trijbsworld.nl](https://trijbsworld.nl)

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📊 Analytics Setup](#-analytics-setup)
- [🔒 Security Features](#-security-features)
- [⚡ Performance](#-performance)
- [🛠️ Development](#-development)
- [🚢 Deployment](#-deployment)
- [🔧 Configuration](#-configuration)
- [🐛 Troubleshooting](#-troubleshooting)
- [📈 Monitoring](#-monitoring)
- [🔄 Maintenance](#-maintenance)

---

## 🎯 Project Overview

A modern, full-stack portfolio website showcasing projects, skills, and professional experience. Built with performance, security, and user experience as top priorities.

### **Tech Stack**
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Vercel Serverless Functions
- **Analytics:** Vercel Analytics with Web Vitals
- **Deployment:** Vercel Platform
- **Email:** Nodemailer with Gmail SMTP
- **Icons:** Feather Icons
- **Fonts:** Google Fonts

---

## ✨ Features

### **Core Features**
- ✅ **Modern Portfolio Design** - Clean, professional layout with smooth animations
- ✅ **Vercel Analytics Integration** - Real-time visitor tracking and insights
- ✅ **Contact Form** - Functional email system with validation and spam protection
- ✅ **Live Project Demos** - Interactive project showcases with modal previews
- ✅ **Video Projects** - Embedded video content with play/download functionality
- ✅ **Figma Embeds** - Live Figma prototype previews
- ✅ **Mobile Responsive** - Optimized for all devices and screen sizes
- ✅ **Theme Toggle** - Dark mode and custom theme support
- ✅ **SEO Optimized** - Meta tags, structured data, and semantic HTML
- ✅ **Security Hardened** - A+ security rating with comprehensive headers
- ✅ **Performance Optimized** - Fast loading times and Core Web Vitals
- ✅ **GDPR Compliant** - Privacy controls and user consent management
- ✅ **Accessibility** - WCAG 2.1 compliant with keyboard navigation

### **Technical Features**
- 🔐 Content Security Policy (CSP)
- 🚀 Lazy loading images
- 📱 Progressive Web App ready
- 🎨 Custom CSS animations
- 📊 Custom event tracking
- 🔄 Cache busting system
- 🛡️ Rate limiting on API endpoints
- 📧 Email notifications with templates
- 🌐 Clean URLs and redirects
- 🔍 Search engine optimization

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18.0.0 or higher
- npm or yarn
- Vercel CLI (for deployment)
- Gmail account (for contact form)

### **1. Clone Repository**
```bash
git clone https://github.com/trijbs/my-portfolio-website.git
cd my-portfolio-website
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Setup**
Create a `.env` file in the root directory:
```env
# Email Configuration (Required for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Development Settings
PORT=3002
NODE_ENV=development
CORS_ORIGIN=http://localhost:3002
```

**Getting Gmail App Password:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password to `.env`

### **4. Local Development**
```bash
# Start Vercel development server (recommended)
vercel dev

# Or use Node.js server
node contact-server.js

# Or serve static files
npx serve public
```

Visit `http://localhost:3000` (Vercel) or `http://localhost:3002` (Node)

### **5. Test Email Configuration**
```bash
npm run test:email
```

### **6. Deploy to Vercel**
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## 📊 Analytics Setup

### **Vercel Analytics Integration**

The portfolio includes comprehensive analytics tracking for visitor insights and performance monitoring.

#### **1. Enable Analytics in Vercel Dashboard**
1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to the **Analytics** tab
3. Click **Enable Analytics**
4. Analytics will be automatically configured

#### **2. Analytics Features**
- 📊 **Page Views** - Track visitor traffic and popular pages
- 👥 **Unique Visitors** - Monitor user engagement
- 🌍 **Geographic Data** - See where visitors are from
- ⚡ **Core Web Vitals** - Monitor performance metrics (LCP, FID, CLS)
- 📱 **Device Analytics** - Desktop vs mobile traffic
- 🔗 **Referrer Tracking** - See where traffic comes from

#### **3. Custom Event Tracking**

The portfolio tracks these custom events:

```javascript
// Contact form submissions
track('contact_form_submit', { 
    subject: 'project inquiry',
    timestamp: Date.now() 
});

// Project interactions
track('project_demo_view', { project: 'urban-unleashed' });
track('project_details_view', { project: 'portfolio-website' });
track('figma_view', { project: 'design-system' });

// Video interactions
track('video_view', { video: 'infographic.mp4' });
track('video_download', { video: 'infographic.mp4' });

// Social media clicks
track('social_link_click', { platform: 'github' });

// Theme changes
track('theme_change', { theme: 'dark' });
```

#### **4. Test Analytics**

Open browser console on your live site and run:

```javascript
// Test if analytics is loaded
if (window.va) {
    console.log('✅ Vercel Analytics loaded');
    window.va('event', { name: 'test_event' });
} else {
    console.log('❌ Vercel Analytics not loaded');
}

// Or use the built-in test function
testAnalytics();
```

#### **5. Analytics Dashboard Access**
- **URL:** `https://vercel.com/[your-username]/[project-name]/analytics`
- **Real-time Data:** Updates every few minutes
- **Historical Data:** View trends over time
- **Export Data:** Download analytics reports

#### **6. Privacy Compliance**

Analytics respects user privacy:
- ✅ No cookies used
- ✅ No personal data collected
- ✅ GDPR compliant
- ✅ User can opt-out via privacy controls
- ✅ Respects Do Not Track (DNT) headers

---

## 🔒 Security Features

### **Security Rating: A+**

The portfolio implements comprehensive security measures to protect users and data.

#### **Security Headers**

All security headers are configured in `vercel.json`:

```json
{
  "headers": [
    {
      "key": "Strict-Transport-Security",
      "value": "max-age=31536000; includeSubDomains; preload"
    },
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "SAMEORIGIN"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "camera=(), microphone=(), geolocation=()"
    }
  ]
}
```

#### **Content Security Policy (CSP)**

Strict CSP prevents XSS attacks and unauthorized resource loading:

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' 
    https://unpkg.com 
    https://va.vercel-scripts.com 
    https://vitals.vercel-insights.com;
style-src 'self' 'unsafe-inline' 
    https://fonts.googleapis.com;
font-src 'self' 
    https://fonts.gstatic.com;
img-src 'self' data: https: http:;
connect-src 'self' 
    https://va.vercel-scripts.com 
    https://vitals.vercel-insights.com;
frame-src 'self' 
    https://trijbs.eu 
    https://*.vercel.app 
    https://www.figma.com 
    https://embed.figma.com;
object-src 'none';
base-uri 'self';
form-action 'self';
```

#### **API Security**

Contact form API includes:
- ✅ **Rate Limiting** - Max 3 requests per 15 minutes per IP
- ✅ **Input Validation** - Sanitizes all user input
- ✅ **CORS Protection** - Restricts cross-origin requests
- ✅ **Email Validation** - Validates email format
- ✅ **Spam Protection** - Honeypot and validation checks
- ✅ **Error Handling** - Secure error messages

#### **Test Security**

```bash
# Test security headers
curl -I https://trijbsworld.nl

# Check security rating
# Visit: https://securityheaders.com/?q=trijbsworld.nl

# Test SSL configuration
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=trijbsworld.nl
```

#### **Security Best Practices**
- 🔐 HTTPS enforced (automatic redirect)
- 🛡️ No sensitive data in client-side code
- 🔒 Environment variables for secrets
- 🚫 No inline scripts (except necessary)
- ✅ Regular dependency updates
- 🔍 Security audits with `npm audit`

---

## ⚡ Performance

### **Performance Scores**

Target and actual Lighthouse scores:

| Metric | Target | Actual |
|--------|--------|--------|
| Performance | 90+ | 95+ ⚡ |
| Accessibility | 95+ | 98+ ♿ |
| Best Practices | 95+ | 100 ✅ |
| SEO | 95+ | 100 🔍 |

### **Core Web Vitals**

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID** | < 100ms | First Input Delay |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **TTFB** | < 600ms | Time to First Byte |

### **Optimization Techniques**

#### **Image Optimization**
```html
<!-- Lazy loading with proper dimensions -->
<img src="img/project.webp" 
     alt="Project Screenshot" 
     width="600" 
     height="400" 
     loading="lazy"
     decoding="async">
```

#### **Resource Hints**
```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://va.vercel-scripts.com">
```

#### **Caching Strategy**
```json
{
  "source": "/css/(.*)",
  "headers": [{
    "key": "Cache-Control",
    "value": "public, max-age=31536000, immutable"
  }]
}
```

#### **Code Splitting**
- Separate JavaScript files for different features
- Async loading of non-critical scripts
- Deferred loading of analytics

#### **Performance Testing**
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://trijbsworld.nl --output html

# PageSpeed Insights
# Visit: https://pagespeed.web.dev/report?url=https://trijbsworld.nl

# WebPageTest
# Visit: https://www.webpagetest.org/
```

---

## 🛠️ Development

### **Project Structure**

```
my-portfolio-website/
├── api/                          # Vercel Serverless Functions
│   ├── contact.js               # Contact form handler
│   ├── analytics.js             # Analytics endpoint (optional)
│   └── test-email.js            # Email testing endpoint
├── public/                       # Static assets (served directly)
│   ├── css/                     # Stylesheets
│   │   ├── styles.css          # Main styles
│   │   └── logo-footer.css     # Footer logo styles
│   ├── js/                      # JavaScript files
│   │   ├── main.js             # Core functionality
│   │   ├── contact-form.js     # Form handling
│   │   ├── vercel-analytics.js # Analytics integration
│   │   ├── analytics-test.js   # Analytics testing
│   │   ├── cache-buster.js     # Cache management
│   │   └── privacy-controls.js # Privacy settings
│   ├── img/                     # Images and assets
│   │   ├── projects/           # Project screenshots
│   │   └── icons/              # Icons and logos
│   ├── videos/                  # Video files
│   │   └── infographic.mp4     # Project videos
│   ├── index.html              # Main homepage
│   ├── info.html               # Info/about page
│   └── security-test.html      # Security testing page
├── config/                       # Configuration files
│   └── CNAME                    # Custom domain config
├── .env                         # Environment variables (local)
├── .vercelignore               # Files to ignore in deployment
├── vercel.json                 # Vercel configuration
├── package.json                # Dependencies and scripts
├── contact-server.js           # Local development server
├── analytics-server.js         # Analytics dev server
├── test-email-config.js        # Email configuration test
├── test-deployment.js          # Deployment validation
├── deploy.sh                   # Deployment script
├── deploy-debug.sh             # Debug deployment script
└── README.md                   # This file
```

### **Key Files Explained**

#### **`public/js/main.js`**
Core functionality including:
- Mobile navigation toggle
- Modal windows (project details, live demos, videos)
- Theme switching (dark/light mode)
- Smooth scrolling
- Project filtering
- Skill bar animations
- Video player functionality
- Social link tracking
- Lazy loading images

#### **`public/js/contact-form.js`**
Contact form handler with:
- Real-time validation
- AJAX form submission
- Success/error messaging
- Field-level error display
- Loading states
- Analytics tracking

#### **`public/js/vercel-analytics.js`**
Analytics integration:
- Vercel Analytics script injection
- Custom event tracking methods
- Page view tracking
- Privacy-compliant tracking

#### **`api/contact.js`**
Serverless function for contact form:
- Rate limiting (3 requests per 15 min)
- Input validation and sanitization
- Email sending via Nodemailer
- Error handling and logging
- CORS configuration

#### **`vercel.json`**
Vercel platform configuration:
- Function settings (timeouts, regions)
- Security headers
- Redirects (HTTP to HTTPS)
- Cache control headers
- Clean URLs

### **Development Commands**

```bash
# Local development
vercel dev                    # Start Vercel dev server (port 3000)
node contact-server.js        # Start Node.js server (port 3002)
npx serve public              # Serve static files (port 3000)

# Testing
npm run test:email            # Test email configuration
node test-deployment.js       # Validate deployment structure
npm audit                     # Check for securit

## 🚢 Deployment

### **Deployment Methods**

#### **Method 1: Vercel CLI (Recommended)**

```bash
# Navigate to project directory
cd ~/my-portfolio-website

# Clear cache (if needed)
rm -rf .vercel

# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

#### **Method 2: Git Integration (Automatic)**

1. Push code to GitHub:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

2. Connect repository in Vercel Dashboard:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your Git repository
   - Configure settings and deploy

3. Automatic deployments on every push to `main`

#### **Method 3: Vercel Dashboard (Manual)**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Drag and drop your project folder
4. Configure environment variables
5. Click "Deploy"

### **Pre-Deployment Checklist**

Before deploying, ensure:

- [ ] `.env` file is NOT committed to Git
- [ ] Environment variables are set in Vercel Dashboard
- [ ] `vercel.json` is properly configured
- [ ] All dependencies are in `package.json`
- [ ] Contact form has been tested locally
- [ ] Images are optimized (WebP format recommended)
- [ ] No console errors in browser
- [ ] Security headers are configured
- [ ] Analytics script is included

### **Environment Variables Setup**

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `EMAIL_USER` | your-email@gmail.com | Production, Preview |
| `EMAIL_PASS` | your-gmail-app-password | Production, Preview |
| `NODE_ENV` | production | Production |

**Important:** Never commit `.env` file to Git!

### **Post-Deployment Verification**

After deployment, verify:

#### **1. Site Accessibility**
```bash
# Check if site is live
curl -I https://your-domain.vercel.app

# Should return: HTTP/2 200
```

#### **2. Contact Form**
- Visit your site
- Fill out contact form
- Check if email is received
- Verify confirmation email

#### **3. Analytics**
- Open browser console
- Run: `testAnalytics()`
- Check for successful tracking
- Verify in Vercel Analytics dashboard

#### **4. Security Headers**
```bash
# Test security headers
curl -I https://your-domain.vercel.app | grep -E "(Strict-Transport|Content-Security|X-Frame)"

# Or visit: https://securityheaders.com/?q=your-domain.vercel.app
```

#### **5. Performance**
- Run Lighthouse audit
- Check Core Web Vitals
- Test on mobile devices
- Verify lazy loading works

### **Custom Domain Setup**

#### **Add Custom Domain**

1. In Vercel Dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your domain (e.g., `trijbsworld.nl`)
4. Follow DNS configuration instructions

#### **DNS Configuration**

Add these records to your DNS provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### **SSL Certificate**

- Vercel automatically provisions SSL certificates
- HTTPS is enforced via redirect in `vercel.json`
- Certificate renews automatically

### **Deployment Troubleshooting**

#### **Issue: EPERM Error**

```bash
Error: EPERM: operation not permitted, scandir '/Users/username/.Trash'
```

**Solution:**
```bash
# Ensure you're in project directory
cd ~/my-portfolio-website

# Clear Vercel cache
rm -rf .vercel

# Deploy again
vercel --prod
```

See `VERCEL_DEPLOYMENT_FIX.md` for detailed solutions.

#### **Issue: Contact Form Not Working**

**Check:**
1. Environment variables are set in Vercel Dashboard
2. Gmail App Password is correct (16 characters)
3. 2-Step Verification is enabled on Gmail
4. Check Vercel function logs: `vercel logs`

**Test:**
```bash
# Test email configuration locally
npm run test:email
```

#### **Issue: Analytics Not Tracking**

**Check:**
1. Analytics is enabled in Vercel Dashboard
2. Script is loading (check Network tab)
3. Ad blockers are disabled
4. Privacy settings allow tracking

**Test:**
```javascript
// In browser console
if (window.va) {
    console.log('✅ Analytics loaded');
    window.va('event', { name: 'test' });
} else {
    console.log('❌ Analytics not loaded');
}
```

#### **Issue: 404 Errors**

**Check:**
1. Files are in `public/` directory
2. `cleanUrls: true` is in `vercel.json`
3. Redirects are properly configured
4. File names match exactly (case-sensitive)

### **Rollback Deployment**

If something goes wrong:

```bash
# List recent deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]

# Or promote a specific deployment in Vercel Dashboard
```

### **Deployment Scripts**

#### **Using deploy.sh**
```bash
# Make executable
chmod +x deploy.sh

# Deploy with cache busting
./deploy.sh
```

#### **Using deploy-debug.sh**
```bash
# Debug deployment issues
chmod +x deploy-debug.sh
./deploy-debug.sh
```

---

## 🔧 Configuration

### **vercel.json Configuration**

Complete configuration file:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "functions": {
    "api/contact.js": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; ..."
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "header",
          "key": "x-forwarded-proto",
          "value": "http"
        }
      ],
      "destination": "https://trijbsworld.nl/$1",
      "permanent": true
    }
  ]
}
```

### **package.json Configuration**

```json
{
  "name": "portfolio-vercel",
  "version": "2.0.0",
  "type": "module",
  "description": "Portfolio website with Vercel serverless functions",
  "scripts": {
    "dev": "vercel dev",
    "deploy": "vercel --prod",
    "test:email": "node test-email-config.js",
    "test:deploy": "node test-deployment.js"
  },
  "dependencies": {
    "@vercel/analytics": "^1.1.1",
    "nodemailer": "^6.9.7",
    "dotenv": "^16.3.1"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### **.vercelignore Configuration**

Files to exclude from deployment:

```
# Dependencies
node_modules

# Git
.git

# Environment files
.env.local
.env.development.local

# Logs
*.log

# OS files
.DS_Store
.Trash

# Development files
contact-server.js
analytics-server.js
test-email-config.js
test-deployment.js

# Documentation
DEPLOYMENT_CHECKLIST.md
VIDEO_TEST_INSTRUCTIONS.md
VERCEL_DEPLOYMENT_FIX.md

# Scripts
deploy.sh
deploy-debug.sh

# Test files
public/security-test.html
```

---

## 🐛 Troubleshooting

### **Common Issues and Solutions**

#### **1. Analytics Not Working**

**Symptoms:**
- No data in Vercel Analytics dashboard
- `window.va` is undefined
- Console errors about blocked scripts

**Solutions:**

```javascript
// Check if analytics is loaded
console.log('Analytics loaded:', typeof window.va !== 'undefined');

// Check for ad blockers
// Disable ad blockers and test again

// Verify script is loading
// Check Network tab in DevTools for va.vercel-scripts.com
```

**Steps:**
1. Enable Analytics in Vercel Dashboard
2. Disable ad blockers
3. Test in incognito mode
4. Check browser console for errors
5. Verify domain is correct in Vercel settings

#### **2. Contact Form Errors**

**Error: "Failed to send message"**

**Check:**
```bash
# Test email configuration
npm run test:email

# Check Vercel logs
vercel logs --follow

# Verify environment variables
vercel env ls
```

**Common causes:**
- Gmail App Password is incorrect
- 2-Step Verification not enabled
- Environment variables not set in Vercel
- Rate limit exceeded (3 requests per 15 min)

**Solutions:**
1. Regenerate Gmail App Password
2. Verify EMAIL_USER and EMAIL_PASS in Vercel Dashboard
3. Wait 15 minutes if rate limited
4. Check Vercel function logs for detailed errors

#### **3. Live Demo CSP Errors**

**Error:** `Refused to frame 'https://...' because it violates CSP`

**Solution:**

Add the domain to `frame-src` in `vercel.json`:

```json
{
  "key": "Content-Security-Policy",
  "value": "... frame-src 'self' https://your-demo-domain.com; ..."
}
```

Then redeploy:
```bash
vercel --prod
```

#### **4. Images Not Loading**

**Symptoms:**
- Broken image icons
- 404 errors for images
- Images load locally but not in production

**Check:**
1. Images are in `public/img/` directory
2. File paths are correct (case-sensitive)
3. Images are committed to Git
4. File formats are supported (jpg, png, webp, svg)

**Solution:**
```bash
# Verify image paths
ls -la public/img/

# Check if images are in Git
git ls-files public/img/

# Add missing images
git add public/img/
git commit -m "Add missing images"
git push
```

#### **5. Slow Performance**

**Symptoms:**
- Long load times
- Poor Lighthouse scores
- Slow Time to Interactive

**Solutions:**

```bash
# Run Lighthouse audit
lighthouse https://your-domain.vercel.app

# Check image sizes
# Optimize images to WebP format
# Use image compression tools

# Enable lazy loading
<img loading="lazy" src="...">

# Minimize JavaScript
# Remove unused code
# Split large files
```

**Optimization checklist:**
- [ ] Images optimized and compressed
- [ ] Lazy loading enabled
- [ ] Unused CSS/JS removed
- [ ] Fonts preloaded
- [ ] Cache headers configured
- [ ] CDN enabled (automatic with Vercel)

#### **6. Mobile Responsiveness Issues**

**Test on multiple devices:**
```bash
# Use Chrome DevTools
# Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
# Test on: iPhone, iPad, Android phones/tablets
```

**Common fixes:**
- Add vi

## 📈 Monitoring

### **Analytics Monitoring**

#### **Key Metrics to Track**

| Metric | Description | Target |
|--------|-------------|--------|
| **Page Views** | Total visits to your site | Increasing trend |
| **Unique Visitors** | Individual users | Growing monthly |
| **Bounce Rate** | Single-page sessions | < 50% |
| **Session Duration** | Time spent on site | > 2 minutes |
| **Conversion Rate** | Contact form submissions | > 2% |
| **Top Pages** | Most visited pages | Monitor trends |
| **Traffic Sources** | Where visitors come from | Diversified |
| **Geographic Data** | Visitor locations | Track expansion |

#### **Custom Event Tracking**

Monitor these custom events in Vercel Analytics:

```javascript
// Project interactions
track('project_demo_view', { project: 'urban-unleashed' });
track('project_details_view', { project: 'portfolio' });
track('figma_view', { project: 'design-system' });

// User actions
track('contact_form_submit', { subject: 'freelance' });
track('video_view', { video: 'infographic.mp4' });
track('video_download', { video: 'infographic.mp4' });
track('social_link_click', { platform: 'github' });
track('theme_change', { theme: 'dark' });

// Business card
track('business_card_view');
```

#### **Performance Monitoring**

Track Core Web Vitals:

```javascript
// Automatically tracked by Vercel Analytics
// View in: Vercel Dashboard → Analytics → Web Vitals

// LCP (Largest Contentful Paint) - Target: < 2.5s
// FID (First Input Delay) - Target: < 100ms
// CLS (Cumulative Layout Shift) - Target: < 0.1
// TTFB (Time to First Byte) - Target: < 600ms
```

#### **Analytics Dashboard**

Access your analytics:
- **URL:** `https://vercel.com/[username]/[project]/analytics`
- **Update Frequency:** Real-time (few minutes delay)
- **Data Retention:** 30 days (Hobby plan), longer for Pro
- **Export:** Download CSV reports

### **Error Monitoring**

#### **JavaScript Error Tracking**

Add to `main.js`:

```javascript
// Global error handler
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
    
    // Track error in analytics
    if (window.VercelAnalytics) {
        window.VercelAnalytics.trackEvent('javascript_error', {
            message: event.message,
            file: event.filename,
            line: event.lineno
        });
    }
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    
    if (window.VercelAnalytics) {
        window.VercelAnalytics.trackEvent('promise_rejection', {
            reason: event.reason?.message || 'Unknown'
        });
    }
});
```

#### **API Error Monitoring**

Monitor API failures:

```javascript
// In contact-form.js
fetch('/api/contact', options)
    .then(response => {
        if (!response.ok) {
            // Track API errors
            track('api_error', {
                endpoint: '/api/contact',
                status: response.status,
                statusText: response.statusText
            });
        }
        return response.json();
    })
    .catch(error => {
        // Track network errors
        track('network_error', {
            endpoint: '/api/contact',
            error: error.message
        });
    });
```

#### **Vercel Function Logs**

Monitor serverless function logs:

```bash
# View real-time logs
vercel logs --follow

# View logs for specific deployment
vercel logs [deployment-url]

# Filter by function
vercel logs --filter "api/contact"

# View last 100 logs
vercel logs --limit 100
```

### **Security Monitoring**

#### **CSP Violation Reporting**

Track Content Security Policy violations:

```javascript
// Add to main.js
document.addEventListener('securitypolicyviolation', (event) => {
    console.warn('CSP Violation:', {
        violatedDirective: event.violatedDirective,
        blockedURI: event.blockedURI,
        originalPolicy: event.originalPolicy
    });
    
    // Track in analytics
    if (window.VercelAnalytics) {
        window.VercelAnalytics.trackEvent('csp_violation', {
            directive: event.violatedDirective,
            uri: event.blockedURI
        });
    }
});
```

#### **Security Header Checks**

Regular security audits:

```bash
# Weekly security header check
curl -I https://trijbsworld.nl | grep -E "(Strict-Transport|Content-Security|X-Frame)"

# Monthly comprehensive scan
# Visit: https://securityheaders.com/?q=trijbsworld.nl

# SSL/TLS check
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=trijbsworld.nl
```

#### **Dependency Security**

Monitor for vulnerabilities:

```bash
# Check for security issues
npm audit

# View detailed report
npm audit --json

# Fix automatically (if possible)
npm audit fix

# Update specific package
npm update package-name
```

### **Uptime Monitoring**

#### **Vercel Status**

Monitor Vercel platform status:
- **URL:** https://www.vercel-status.com/
- **Subscribe:** Get notifications for incidents
- **RSS Feed:** https://www.vercel-status.com/history.rss

#### **External Monitoring Services**

Consider using:
- **UptimeRobot** - Free uptime monitoring
- **Pingdom** - Performance and uptime
- **StatusCake** - Website monitoring
- **Better Uptime** - Status pages

#### **Custom Health Check**

Create a health check endpoint:

```javascript
// api/health.js
export default async function handler(req, res) {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '2.0.0'
    });
}
```

Test:
```bash
curl https://your-domain.vercel.app/api/health
```

### **Performance Monitoring**

#### **Lighthouse CI**

Automate Lighthouse audits:

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=https://trijbsworld.nl

# Generate report
lhci upload --target=temporary-public-storage
```

#### **Real User Monitoring (RUM)**

Vercel Analytics provides RUM data:
- Page load times
- Core Web Vitals
- Device types
- Geographic performance

#### **Synthetic Monitoring**

Regular performance tests:

```bash
# Weekly Lighthouse audit
lighthouse https://trijbsworld.nl --output html --output-path ./reports/lighthouse-$(date +%Y%m%d).html

# PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://trijbsworld.nl"
```

---

## 🔄 Maintenance

### **Regular Maintenance Schedule**

#### **Daily Tasks**
- [ ] Monitor Vercel Analytics dashboard
- [ ] Check for deployment errors
- [ ] Review contact form submissions

#### **Weekly Tasks**
- [ ] Review analytics trends
- [ ] Check error logs
- [ ] Test contact form functionality
- [ ] Verify live demos are working
- [ ] Monitor Core Web Vitals
- [ ] Check security headers

#### **Monthly Tasks**
- [ ] Update dependencies (`npm update`)
- [ ] Run security audit (`npm audit`)
- [ ] Performance optimization review
- [ ] Content updates (projects, skills)
- [ ] Backup analytics data
- [ ] Review and respond to feedback
- [ ] Test on multiple devices/browsers
- [ ] Check broken links

#### **Quarterly Tasks**
- [ ] Comprehensive security audit
- [ ] Performance benchmark comparison
- [ ] Analytics deep dive and insights
- [ ] User experience testing
- [ ] SEO audit and improvements
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Update portfolio projects
- [ ] Review and update documentation

### **Update Procedures**

#### **Dependency Updates**

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update specific package
npm update package-name

# Update to latest major version
npm install package-name@latest

# Test after updates
npm run dev
vercel dev
```

#### **Security Updates**

```bash
# Check for vulnerabilities
npm audit

# View detailed vulnerability report
npm audit --json > audit-report.json

# Fix automatically (patch/minor updates)
npm audit fix

# Fix with breaking changes (use caution)
npm audit fix --force

# Update specific vulnerable package
npm update vulnerable-package
```

#### **Content Updates**

**Update Projects:**
1. Edit `projectDetails` in `public/js/main.js`
2. Add project images to `public/img/projects/`
3. Update project cards in `public/index.html`
4. Test locally: `vercel dev`
5. Deploy: `vercel --prod`

**Update Skills:**
1. Edit skills section in `public/index.html`
2. Update skill percentages
3. Add new technologies
4. Test and deploy

**Update Contact Information:**
1. Edit contact section in `public/index.html`
2. Update social media links
3. Verify email configuration
4. Test contact form

#### **Version Control**

```bash
# Create feature branch
git checkout -b feature/update-projects

# Make changes and commit
git add .
git commit -m "Update project portfolio"

# Push to remote
git push origin feature/update-projects

# Merge to main
git checkout main
git merge feature/update-projects
git push origin main

# Tag release
git tag -a v2.1.0 -m "Release version 2.1.0"
git push origin v2.1.0
```

### **Backup Strategy**

#### **Code Backup**
- ✅ **Git Repository** - Version control with full history
- ✅ **GitHub** - Remote repository (primary backup)
- ✅ **Vercel** - Automatic deployment history
- ✅ **Local Backup** - Regular local copies

#### **Data Backup**

**Analytics Data:**
```bash
# Export analytics data monthly
# Vercel Dashboard → Analytics → Export

# Save to backups folder
mkdir -p backups/analytics
mv analytics-export-$(date +%Y%m).csv backups/analytics/
```

**Contact Form Submissions:**
- Email records in Gmail
- Optional: Save to database or spreadsheet
- Export monthly for records

**Configuration Backup:**
```bash
# Backup environment variables
vercel env pull .env.backup

# Backup vercel.json
cp vercel.json backups/vercel.json.$(date +%Y%m%d)

# Backup package.json
cp package.json backups/package.json.$(date +%Y%m%d)
```

#### **Recov