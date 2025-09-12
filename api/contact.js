import nodemailer from 'nodemailer';

// Rate limiting storage (in-memory for simplicity)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per window

// Check rate limit for IP
const checkRateLimit = (ip) => {
    const now = Date.now();
    const userRequests = rateLimitStore.get(ip) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
    
    if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
        return false;
    }
    
    // Add current request
    validRequests.push(now);
    rateLimitStore.set(ip, validRequests);
    
    return true;
};

// Validate contact form data
const validateContactData = (data) => {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Please provide a valid email address');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
};

// Create email transporter with better configuration
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        },
        debug: true, // Enable debug logging
        logger: true // Enable logger
    });
};

// Create email templates
const createEmailTemplate = (data) => {
    return {
        // Notification email to you
        notification: {
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: data.email,
            subject: `New Contact: ${data.subject} - from ${data.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #ff4d6d 0%, #1e90ff 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">From your portfolio website</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #333; margin: 0 0 10px 0; border-bottom: 2px solid #ff4d6d; padding-bottom: 5px;">Contact Details</h3>
                            <p style="margin: 5px 0; color: #666;"><strong>Name:</strong> ${data.name}</p>
                            <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #1e90ff;">${data.email}</a></p>
                            <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${data.subject}</p>
                            <p style="margin: 5px 0; color: #666;"><strong>Date:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
                            <p style="margin: 5px 0; color: #666;"><strong>IP:</strong> ${data.ip}</p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #333; margin: 0 0 10px 0; border-bottom: 2px solid #ff4d6d; padding-bottom: 5px;">Message</h3>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #1e90ff;">
                                <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="mailto:${data.email}?subject=Re: ${data.subject}" 
                               style="background: linear-gradient(135deg, #ff4d6d, #1e90ff); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
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

        console.log('Contact form submission:', {
            name: name?.substring(0, 20) + '...',
            email: email?.substring(0, 20) + '...',
            subject: subject?.substring(0, 30) + '...',
            ip: clientIP
        });

        // Check rate limit
        if (!checkRateLimit(clientIP)) {
            console.log('Rate limit exceeded for IP:', clientIP);
            return res.status(429).json({
                success: false,
                message: 'Too many requests. Please try again in 15 minutes.'
            });
        }

        // Validate input
        const errors = validateContactData({ name, email, subject, message });
        if (errors.length > 0) {
            console.log('Validation errors:', errors);
            return res.status(400).json({
                success: false,
                errors,
                message: 'Please fix the following errors:'
            });
        }

        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email credentials not configured');
            console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
            console.error('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
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

        console.log('Attempting to send email with configuration:', {
            from: messageData.email,
            to: process.env.EMAIL_USER,
            subject: messageData.subject,
            emailUser: process.env.EMAIL_USER ? 'Set' : 'Not set',
            emailPass: process.env.EMAIL_PASS ? 'Set' : 'Not set'
        });

        // Create email templates
        const emailTemplates = createEmailTemplate(messageData);
        const transporter = createTransporter();

        try {
            // Test the transporter connection
            console.log('Verifying SMTP connection...');
            await transporter.verify();
            console.log('✅ SMTP connection verified successfully');
        } catch (verifyError) {
            console.error('❌ SMTP verification failed:', verifyError);
            return res.status(500).json({
                success: false,
                message: 'Email service configuration error. Please contact me directly at rbdegroot@gmail.com',
                error: verifyError.message
            });
        }

        try {
            // Send notification email to you
            console.log('📧 Sending notification email...');
            const notificationResult = await transporter.sendMail(emailTemplates.notification);
            console.log('✅ Notification email sent:', notificationResult.messageId);

            // Send confirmation email to sender
            console.log('📧 Sending confirmation email...');
            const confirmationResult = await transporter.sendMail(emailTemplates.confirmation);
            console.log('✅ Confirmation email sent:', confirmationResult.messageId);

            console.log(`🎉 New contact from ${name} (${email}) processed successfully`);

            return res.status(200).json({
                success: true,
                message: 'Message sent successfully! You should receive a confirmation email shortly.',
                messageId: notificationResult.messageId
            });
        } catch (emailError) {
            console.error('❌ Email sending failed:', emailError);
            
            // Return more specific error information
            return res.status(500).json({
                success: false,
                message: `Failed to send email: ${emailError.message}. Please contact me directly at rbdegroot@gmail.com`,
                error: emailError.code || emailError.message
            });
        }

    } catch (error) {
        console.error('❌ Contact form error:', error);

        return res.status(500).json({
            success: false,
            message: 'Sorry, there was an error processing your message. Please try again or contact me directly at rbdegroot@gmail.com',
            error: error.message
        });
    }
}