# 🚀 Portfolio with Vercel Serverless Functions

## Quick Start

1. **Deploy to Vercel**: [vercel.com](https://vercel.com) → Import from GitHub
2. **Set Environment Variables** in Vercel dashboard:
   - `EMAIL_USER`: rbdegroot@gmail.com
   - `EMAIL_PASS`: your-gmail-app-password
3. **Get Gmail App Password**: Google Account → Security → App passwords
4. **Redeploy** and test your contact form!

## Features

✅ **Contact Form**: Real email sending  
✅ **Analytics**: User behavior tracking  
✅ **Serverless**: No server management  
✅ **Free**: 100% free hosting  
✅ **Fast**: Global CDN  

## Local Development

```bash
npm install -g vercel
vercel dev
```

## File Structure

```
api/
├── contact.js      # Contact form handler
└── analytics.js    # Analytics data collector
js/
├── contact-form.js # Frontend contact form
└── analytics.js    # Frontend analytics
vercel.json         # Vercel configuration
```

## Support

Check `VERCEL_SETUP_GUIDE.md` for detailed instructions!