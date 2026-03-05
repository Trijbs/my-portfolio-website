#!/usr/bin/env node

/**
 * Email Configuration Test Script
 * Tests the email configuration to diagnose contact form issues
 */

import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Load environment variables
config();

console.log('🔍 Testing Email Configuration...\n');

// Check if environment variables are set
console.log('📋 Environment Variables Check:');
console.log('  EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Not set');
console.log('  EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Not set');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('\n❌ Error: EMAIL_USER and EMAIL_PASS must be set in .env file');
    console.log('\nPlease create a .env file with:');
    console.log('  EMAIL_USER=your-email@gmail.com');
    console.log('  EMAIL_PASS=your-app-password');
    process.exit(1);
}

// Check App Password format
console.log('\n📝 Password Format Check:');
const password = process.env.EMAIL_PASS;
const hasSpaces = password.includes(' ');
const length = password.replace(/\s/g, '').length;

console.log('  Contains spaces:', hasSpaces ? 'Yes' : 'No');

if (length !== 16) {
    console.warn('  ⚠️  Warning: Gmail App Password format looks unusual (expected 16 chars without spaces)');
}

// Create transporter
console.log('\n🔧 Creating Email Transporter...');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    debug: true,
    logger: true
});

// Test connection
console.log('\n🔌 Testing SMTP Connection...');
try {
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');
    
    // Send test email
    console.log('📧 Sending test email...');
    const testEmail = {
        from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: 'Contact Form Test - ' + new Date().toLocaleString(),
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #00ff88;">✅ Email Configuration Test Successful!</h2>
                    <p>Your contact form email configuration is working correctly.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p><strong>Test Details:</strong></p>
                    <ul>
                        <li>Email: ${process.env.EMAIL_USER}</li>
                        <li>Time: ${new Date().toLocaleString()}</li>
                        <li>Service: Gmail</li>
                    </ul>
                    <p style="color: #666; font-size: 14px; margin-top: 30px;">
                        This is an automated test email from your portfolio contact form configuration.
                    </p>
                </div>
            </div>
        `
    };
    
    const result = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('   Message ID:', result.messageId);
    console.log('   Response:', result.response);
    
    console.log('\n🎉 All tests passed! Your email configuration is working correctly.');
    console.log('   Check your inbox at:', process.env.EMAIL_USER);
    
} catch (error) {
    console.error('\n❌ Email configuration test failed!\n');
    console.error('Error details:');
    console.error('  Code:', error.code);
    console.error('  Message:', error.message);
    
    console.log('\n🔧 Troubleshooting Steps:\n');
    
    if (error.code === 'EAUTH' || error.message.includes('Invalid login')) {
        console.log('❌ Authentication Error - Invalid credentials');
        console.log('   Solutions:');
        console.log('   1. Make sure you\'re using a Gmail App Password, not your regular password');
        console.log('   2. Enable 2-Step Verification on your Google account');
        console.log('   3. Generate a new App Password at: https://myaccount.google.com/apppasswords');
        console.log('   4. Update EMAIL_PASS in your .env file with the new App Password');
    } else if (error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') {
        console.log('❌ Connection Error - Cannot reach Gmail servers');
        console.log('   Solutions:');
        console.log('   1. Check your internet connection');
        console.log('   2. Check if your firewall is blocking port 587 or 465');
        console.log('   3. Try again in a few minutes');
    } else if (error.message.includes('self signed certificate')) {
        console.log('❌ SSL Certificate Error');
        console.log('   Solutions:');
        console.log('   1. This is usually a network/proxy issue');
        console.log('   2. Try on a different network');
        console.log('   3. Check your antivirus/firewall settings');
    } else {
        console.log('❌ Unknown Error');
        console.log('   Solutions:');
        console.log('   1. Double-check your EMAIL_USER is a valid Gmail address');
        console.log('   2. Verify your EMAIL_PASS is correct');
        console.log('   3. Try generating a new App Password');
        console.log('   4. Check Google account security settings');
    }
    
    console.log('\n📚 More help:');
    console.log('   - Gmail App Passwords: https://support.google.com/accounts/answer/185833');
    console.log('   - 2-Step Verification: https://support.google.com/accounts/answer/185839');
    
    process.exit(1);
}
