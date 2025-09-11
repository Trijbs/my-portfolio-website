/**
 * Vercel Serverless Function for Contact Form
 * Handles contact form submissions and sends emails
 */

const nodemailer = require('nodemailer');

// Rate limiting storage (in-memory for serverless)
const rateLimitStore = new Map();

// Clean up old rate limit entries
const cleanupRateLimit = () => {
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;
    
    for (const [key, data] of rateLimitStore.entries()) {
        if (now - data.firstAttempt > fifteenMinutes) {
            rateLimitStore.delete(key);
        }
    }
};

// Check rate limit
const checkRateLimit = (ip) => {
    cleanupRateLimit();
    
    const key = ip;
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;
    
    if (!rateLimitStore.has(key)) {
        rateLimitStore.set(key, {
            count: 1,
            firstAttempt: now
        });
        return true;
    }
    
    const data = rateLimitStore.get(key);
    
    // Reset if more than 15 minutes have passed
    if (now - data.firstAttempt > fifteenMinutes) {
        rateLimitStore.set(key, {
            count: 1,
            firstAttempt: now
        });
        return true;
    }
    
    // Check if under limit
    if (data.count < 5) {
        data.count++;
        return true;
    }
    
    return false;
};

// Validate email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate contact data
const validateContactData = (data) => {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please provide a valid email address');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (data.name && data.name.length > 100) {
        errors.push('Name is too long');
    }
    
    if (data.message && data.message.length > 5000) {
        errors.push('Message is too long');
    }
    
    return errors;
};

// Create email transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Create email templates
const createEmailTemplate = (data) => {
    const messageId = generateId();
    
    return {
        // Email to you (notification)
        notification: {
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Contact: ${data.subject || 'General Inquiry'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Message</h1>
                        <p style="color: #e0e0e0; margin: 10px 0 0 0;">From your portfolio website</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
                            <h3 style="margin: 0 0 10px 0; color: #333;">Contact Information</h3>
                            <p style="margin: 5px 0; color: #666;"><strong>Name:</strong> ${data.name}</p>
                            <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #667eea;">${data.email}</a></p>
                            <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${data.subject || 'General Inquiry'}</p>
                            <p style="margin: 5px 0; color: #666;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #333; margin-bottom: 10px;">Message</h3>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
                                <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                            </div>
                        </div>
                        
                        <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                            <a href="mailto:${data.email}?subject=Re: ${data.subject || 'Your inquiry'}" 
                               style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                Reply to ${data.name}
                            </a>
                        </div>
                    </div>
                </div>
            `
        },
        
        // Confirmation email to sender
        confirmation: {
            from: `"Ruben Trijbels" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: `Thanks for reaching out! - ${data.subject || 'Your message'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: #111; margin: 0; font-size: 24px;">Thanks for reaching out!</h1>
                        <p style="color: #333; margin: 10px 0 0 0;">I've received your message and will get back to you soon</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${data.name},</p>
                        
                        <p style="color: #333; line-height: 1.6;">
                            Thank you for contacting me! I've received your message about 
                            <strong>"${data.subject || 'your inquiry'}"</strong> and I appreciate you taking the time to reach out.
                        </p>
                        
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00ff88;">
                            <h3 style="margin: 0 0 10px 0; color: #333;">What happens next?</h3>
                            <p style="margin: 0; color: #666;">I typically respond within 24 hours during business days. I'll review your message and get back to you with a detailed response.</p>
                        </div>
                        
                        <p style="color: #333; line-height: 1.6;">
                            In the meantime, feel free to check out:
                        </p>
                        
                        <ul style="color: #333; line-height: 1.6;">
                            <li>My latest projects on <a href="https://github.com/trijbs" style="color: #00ff88;">GitHub</a></li>
                            <li>Follow me on <a href="https://instagram.com/trijbs.xyz" style="color: #00ff88;">Instagram</a></li>
                            <li>Visit <a href="https://trijbsworld.nl" style="color: #00ff88;">trijbsworld.nl</a></li>
                        </ul>
                        
                        <p style="color: #333; line-height: 1.6;">
                            Best regards,<br>
                            <strong>Ruben Trijbels</strong><br>
                            Full-Stack Developer & Creative Designer<br>
                            <a href="mailto:rbdegroot@gmail.com" style="color: #00ff88;">rbdegroot@gmail.com</a>
                        </p>
                    </div>
                </div>
            `
        }
    };
};

// Main handler function for Vercel
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    try {
        const { name, email, subject, message } = req.body;

        // Get client IP for rate limiting
        const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';

        // Check rate limit
        if (!checkRateLimit(clientIP)) {
            return res.status(429).json({
                success: false,
                message: 'Too many requests. Please try again in 15 minutes.'
            });
        }

        // Validate input
        const errors = validateContactData({ name, email, subject, message });
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                errors,
                message: 'Please fix the following errors:'
            });
        }

        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email credentials not configured');
            return res.status(500).json({
                success: false,
                message: 'Email service not configured. Please contact me directly at rbdegroot@gmail.com'
            });
        }

        // Create message data
        const messageData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject || 'General Inquiry',
            message: message.trim(),
            timestamp: new Date().toISOString(),
            ip: clientIP
        };

        // Create email templates
        const emailTemplates = createEmailTemplate(messageData);
        const transporter = createTransporter();

        // Send notification email to you
        await transporter.sendMail(emailTemplates.notification);

        // Send confirmation email to sender
        await transporter.sendMail(emailTemplates.confirmation);

        console.log(`📧 New contact from ${name} (${email})`);

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully! You should receive a confirmation email shortly.'
        });

    } catch (error) {
        console.error('Contact form error:', error);

        return res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again or contact me directly at rbdegroot@gmail.com'
        });
    }
}