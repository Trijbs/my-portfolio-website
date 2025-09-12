# Email Troubleshooting Guide

## Issue: Contact form not sending emails

### Step 1: Check Environment Variables

1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to Settings → Environment Variables
4. Ensure you have these variables set:
   - `EMAIL_USER`: Your Gmail address (e.g., `rbdegroot@gmail.com`)
   - `EMAIL_PASS`: Your Gmail App Password (NOT your regular password)

### Step 2: Set up Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to Security → 2-Step Verification → App passwords
4. Generate a new app password for "Mail"
5. Use this 16-character password as your `EMAIL_PASS` environment variable

### Step 3: Test Email Configuration

Visit this URL to test your email setup:
```
https://your-vercel-domain.vercel.app/api/test-email
```

This will:
- Check if environment variables are set
- Test SMTP connection
- Send a test email to yourself

### Step 4: Check Vercel Function Logs

1. Go to Vercel dashboard → Functions tab
2. Click on the contact function
3. Check the logs for error messages

### Step 5: Common Issues and Solutions

#### Issue: "Invalid login" error
**Solution**: Make sure you're using an App Password, not your regular Gmail password.

#### Issue: "Less secure app access" error
**Solution**: Use App Passwords instead of enabling less secure apps.

#### Issue: Environment variables not found
**Solution**: 
1. Check variable names are exactly `EMAIL_USER` and `EMAIL_PASS`
2. Redeploy after adding environment variables
3. Make sure variables are set for Production environment

#### Issue: SMTP connection timeout
**Solution**: 
1. Check if your hosting provider blocks SMTP ports
2. Try using port 587 instead of 465
3. Enable "Allow less secure apps" temporarily for testing

### Step 6: Debug Information

The contact form now includes detailed logging. Check the Vercel function logs for:
- ✅ SMTP connection verified successfully
- 📧 Sending notification email...
- ✅ Notification email sent: [message-id]
- 📧 Sending confirmation email...
- ✅ Confirmation email sent: [message-id]

### Step 7: Alternative Email Services

If Gmail continues to have issues, consider using:
- SendGrid
- Mailgun
- AWS SES
- Resend

### Manual Test

You can manually test the contact form by sending a POST request:

```bash
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message to verify the contact form is working."
  }'
```

### Contact for Help

If you're still having issues, the error messages in the contact form will now be more detailed. Check:
1. Browser console for JavaScript errors
2. Vercel function logs for server errors
3. Network tab in browser dev tools for API response details