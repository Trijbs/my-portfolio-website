# Vercel Integration Guide

This portfolio website is now fully integrated with Vercel serverless functions for contact form and analytics functionality.

## 🚀 Quick Start

### 1. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Trijbs/my-portfolio-website)

### 2. Set Environment Variables

In your Vercel dashboard, go to **Settings → Environment Variables** and add:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### 3. Local Development

```bash
# Install Vercel CLI
npm install -g vercel

# Install dependencies
npm install

# Start development server
npm run dev
# or
vercel dev
```

## 📁 Project Structure

```
├── api/
│   ├── contact.js          # Contact form serverless function
│   └── analytics.js        # Analytics serverless function
├── js/
│   ├── contact-form.js     # Contact form handler (client-side)
│   ├── analytics.js        # Analytics tracking (client-side)
│   └── analytics-config.js # Analytics configuration
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies for Vercel
└── .env.local.example     # Environment variables template
```

## 🔧 Configuration

### Contact Form

The contact form automatically detects the environment and uses the appropriate API endpoint:

- **Local Development**: `http://localhost:3000/api/contact`
- **Production**: `https://your-domain.com/api/contact`

### Analytics

Analytics are configured in `js/analytics-config.js`:

```javascript
server: {
    enabled: true,
    endpoint: '/api/analytics',
    timeout: 5000
}
```

## 📧 Email Setup

### Gmail Configuration

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Set Environment Variables**:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: The generated app password (not your regular password)

### Alternative SMTP

You can also use other SMTP providers by modifying `api/contact.js`:

```javascript
const transporter = nodemailer.createTransporter({
    host: 'your-smtp-host.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

## 🔒 Security Features

### Rate Limiting

Both contact and analytics endpoints include rate limiting:

- **Contact Form**: 5 submissions per 15 minutes per IP
- **Analytics**: 1000 events per hour per IP

### Data Validation

- Email validation using regex
- Input sanitization
- Message length limits
- Required field validation

### CORS Configuration

Configured in `vercel.json` to allow cross-origin requests:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

## 📊 Analytics Features

### Client-Side Tracking

- Page views
- Click tracking with heatmap data
- Scroll tracking
- Form interactions
- Performance metrics
- Error tracking
- Device information

### Server-Side Storage

Analytics data is stored in-memory (for demo purposes). For production, consider:

- **Vercel KV** (Redis)
- **PlanetScale** (MySQL)
- **Supabase** (PostgreSQL)
- **MongoDB Atlas**

## 🛠️ Development

### Local Testing

```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'

# Test analytics
curl -X POST http://localhost:3000/api/analytics \
  -H "Content-Type: application/json" \
  -d '{"type":"page_view","url":"/","timestamp":"2024-01-01T00:00:00.000Z"}'
```

### Environment Files

- `.env.local` - Local development (not committed)
- `.env.local.example` - Template for environment variables

## 🚀 Deployment

### Automatic Deployment

Vercel automatically deploys when you push to your main branch.

### Manual Deployment

```bash
npm run deploy
# or
vercel --prod
```

### Custom Domain

1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings → Domains**
4. Add your custom domain
5. Update DNS records as instructed

## 📝 Customization

### Email Templates

Modify the email templates in `api/contact.js`:

- `notification` - Email sent to you
- `confirmation` - Email sent to the user

### Analytics Configuration

Update `js/analytics-config.js` to enable/disable features:

```javascript
tracking: {
    pageViews: true,
    clicks: true,
    scrolling: false,  // Disable scroll tracking
    // ... other options
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Email not sending**
   - Check environment variables are set correctly
   - Verify Gmail app password (not regular password)
   - Check Vercel function logs

2. **CORS errors**
   - Ensure `vercel.json` is properly configured
   - Check if domain is whitelisted

3. **Analytics not working**
   - Check browser console for errors
   - Verify analytics endpoint is accessible
   - Check privacy settings/ad blockers

### Debugging

View function logs in Vercel dashboard:
1. Go to your project
2. Click on **Functions** tab
3. Click on a function to view logs

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)

## 🤝 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review Vercel function logs
3. Open an issue on GitHub
4. Contact: rbdegroot@gmail.com