# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, JavaScript, and deployed on Vercel with serverless functions.

## Features

- 🎨 Modern, responsive design
- 🌙 Dark/Light theme toggle
- 📧 Contact form with email notifications
- 📊 Analytics tracking
- 🔒 GDPR compliant privacy controls
- 🚀 Fast loading with optimized assets
- 📱 Mobile-first responsive design

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js with Vercel Serverless Functions
- **Email**: Nodemailer with Gmail SMTP
- **Deployment**: Vercel
- **Analytics**: Custom analytics system

## Project Structure

```
├── public/                 # Static files served by Vercel
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── img/               # Images and assets
│   ├── index.html         # Main page
│   └── info.html          # Info page
├── api/                   # Vercel serverless functions
│   ├── contact.js         # Contact form handler
│   └── analytics.js       # Analytics endpoint
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel configuration
└── README.md             # This file
```

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Development**
   ```bash
   npm run dev
   ```

5. **Deploy to Vercel**
   ```bash
   npm run deploy
   ```

## Environment Variables

- `EMAIL_USER`: Gmail address for sending contact form emails
- `EMAIL_PASS`: Gmail app password (not your regular password)

## Contact Form Setup

The contact form uses Gmail SMTP to send emails. To set this up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an app password for the application
3. Use the app password in the `EMAIL_PASS` environment variable

## Analytics

The website includes a custom analytics system that tracks:
- Page views
- User interactions
- Form submissions
- Scroll depth
- Time on page

All analytics respect user privacy preferences and GDPR compliance.

## Deployment

The site is configured for deployment on Vercel with:
- Static file serving from the `public` directory
- Serverless functions for contact form and analytics
- Automatic HTTPS and CDN
- Environment variable management

## License

MIT License - feel free to use this code for your own portfolio!

## Contact

- Email: rbdegroot@gmail.com
- GitHub: [@trijbs](https://github.com/trijbs)
- Instagram: [@trijbs.xyz](https://instagram.com/trijbs.xyz)