# 🚀 Quick Fix for Contact Form Error

## The Problem
Your contact form shows: *"Sorry, there was an error sending your message..."*

## The Solution (5 minutes)

### Step 1: Get Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. If you see "2-Step Verification is not turned on":
   - Click "2-Step Verification" and enable it first
   - Then return to App Passwords
3. Select **"Mail"** and **"Other"** (name it "Portfolio")
4. Click **"Generate"**
5. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 2: Update Vercel Environment Variables
1. Go to: https://vercel.com/dashboard
2. Click your project → **Settings** → **Environment Variables**
3. Update these:
   ```
   EMAIL_USER = rbdegroot@gmail.com
   EMAIL_PASS = abcdefghijklmnop  (paste your App Password WITHOUT spaces)
   ```
4. Click **"Save"**

### Step 3: Redeploy
```bash
vercel --prod
```

### Step 4: Test
Visit your website and try the contact form again!

---

## 🧪 Test Locally First (Optional)

1. Update `.env` file:
   ```bash
   EMAIL_USER=rbdegroot@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run test:
   ```bash
   npm run test:email
   ```

4. If you see ✅ "All tests passed!" → Deploy to Vercel!

---

## ❓ Still Not Working?

### Check Vercel Logs:
1. Vercel Dashboard → Your Project → Deployments
2. Click latest deployment → **Functions** tab
3. Click `/api/contact` → Look for error messages

### Common Issues:

**"Invalid login" or "EAUTH"**
- You're using your regular Gmail password instead of App Password
- Solution: Generate a new App Password (Step 1 above)

**"Email credentials not configured"**
- Environment variables not set in Vercel
- Solution: Complete Step 2 above and redeploy

**"SMTP verification failed"**
- App Password is incorrect
- Solution: Generate a new App Password

---

## 📞 Emergency Contact
If still broken, users can email you directly at: **rbdegroot@gmail.com**

The error message now shows this email address automatically.
