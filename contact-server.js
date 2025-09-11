/**
 * Contact Form Email Server
 * Handles contact form submissions and sends emails
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('validator');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3002;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000', 'https://trijbsworld.nl', 'https://www.trijbsworld.nl'],
    credentials: true
}));

// Rate limiting
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many contact form submissions, please try again later.',
        retryAfter: '15 minutes'
    }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Email configuration
const createTransporter = () => {
    // Gmail configuration (you'll need to set up app passwords)
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'rbdegroot@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password' // Use App Password, not regular password
        }
    });

    // Alternative: SMTP configuration for other providers
    /*
    return nodemailer.createTransporter({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    */
};

// Ensure messages directory exists
const ensureDirectoryExists = async (dir) => {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
};

// Store message to file
const storeMessage = async (messageData) => {
    const messagesDir = path.join(__dirname, 'messages');
    await ensureDirectoryExists(messagesDir);
    
    const messageFile = path.join(messagesDir, `${messageData.id}.json`);
    await fs.writeFile(messageFile, JSON.stringify(messageData, null, 2));
    
    // Also append to messages log
    const logFile = path.join(messagesDir, 'messages.log');
    const logEntry = `${new Date().toISOString()} - ${messageData.email} - ${messageData.subject}\n`;
    await fs.appendFile(logFile, logEntry);
};

// Validate contact form data
const validateContactData = (data) => {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !validator.isEmail(data.email)) {
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

// Email templates
const createEmailTemplate = (data) => {
    return {
        // Email to you (notification)
        notification: {
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER || 'rbdegroot@gmail.com'}>`,
            to: process.env.EMAIL_USER || 'rbdegroot@gmail.com',
            subject: `New Contact Form Message: ${data.subject || 'General Inquiry'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Message</h1>
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
                        
                        <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;">
                            <p style="margin: 0; color: #1976d2; font-size: 14px;">
                                <strong>Quick Actions:</strong><br>
                                • Click "Reply" above to respond directly<br>
                                • Message ID: ${data.id}<br>
                                • IP Address: ${data.ip || 'Unknown'}<br>
                                • User Agent: ${data.userAgent ? data.userAgent.substring(0, 50) + '...' : 'Unknown'}
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        
        // Confirmation email to sender
        confirmation: {
            from: `"Ruben Trijbels" <${process.env.EMAIL_USER || 'rbdegroot@gmail.com'}>`,
            to: data.email,
            subject: `Thanks for reaching out! - ${data.subject || 'Your message'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: #111; margin: 0; font-size: 24px;">Thanks for reaching out!</h1>
                        <p style="color: #333; margin: 10px 0 0 0;">I've received your message and will get back to you soon</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${data.name},</p>
                        
                        <p style="color: #333; line-height: 1.6;">
                            Thank you for contacting me through my portfolio website! I've received your message about 
                            <strong>"${data.subject || 'your inquiry'}"</strong> and I appreciate you taking the time to reach out.
                        </p>
                        
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00ff88;">
                            <h3 style="margin: 0 0 10px 0; color: #333;">Your Message Summary</h3>
                            <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${data.subject || 'General Inquiry'}</p>
                            <p style="margin: 5px 0; color: #666;"><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
                            <p style="margin: 5px 0; color: #666;"><strong>Message ID:</strong> ${data.id}</p>
                        </div>
                        
                        <p style="color: #333; line-height: 1.6;">
                            <strong>What happens next?</strong><br>
                            I typically respond to messages within 24 hours during business days. I'll review your message carefully 
                            and get back to you with a detailed response.
                        </p>
                        
                        <p style="color: #333; line-height: 1.6;">
                            In the meantime, feel free to:
                        </p>
                        
                        <ul style="color: #333; line-height: 1.6;">
                            <li>Check out my latest projects on <a href="https://github.com/trijbs" style="color: #00ff88;">GitHub</a></li>
                            <li>Follow me on <a href="https://instagram.com/trijbs.xyz" style="color: #00ff88;">Instagram</a> for behind-the-scenes content</li>
                            <li>Visit my website at <a href="https://trijbsworld.nl" style="color: #00ff88;">trijbsworld.nl</a></li>
                        </ul>
                        
                        <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                            <p style="margin: 0; color: #666; font-style: italic;">
                                "Great things are built through collaboration and clear communication."
                            </p>
                        </div>
                        
                        <p style="color: #333; line-height: 1.6;">
                            Best regards,<br>
                            <strong>Ruben Trijbels</strong><br>
                            Full-Stack Developer & Creative Designer<br>
                            <a href="mailto:rbdegroot@gmail.com" style="color: #00ff88;">rbdegroot@gmail.com</a>
                        </p>
                        
                        <div style="margin-top: 30px; padding: 15px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #4caf50;">
                            <p style="margin: 0; color: #2e7d32; font-size: 14px;">
                                <strong>Note:</strong> This is an automated confirmation. Please don't reply to this email. 
                                I'll respond to your original message directly.
                            </p>
                        </div>
                    </div>
                </div>
            `
        }
    };
};

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate input
        const errors = validateContactData({ name, email, subject, message });
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                errors,
                message: 'Please fix the following errors:'
            });
        }
        
        // Create message data
        const messageData = {
            id: uuidv4(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject || 'General Inquiry',
            message: message.trim(),
            timestamp: new Date().toISOString(),
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            status: 'new'
        };
        
        // Store message
        await storeMessage(messageData);
        
        // Create email templates
        const emailTemplates = createEmailTemplate(messageData);
        const transporter = createTransporter();
        
        // Send notification email to you
        await transporter.sendMail(emailTemplates.notification);
        
        // Send confirmation email to sender
        await transporter.sendMail(emailTemplates.confirmation);
        
        console.log(`📧 New contact form message from ${name} (${email})`);
        
        res.json({
            success: true,
            message: 'Message sent successfully! You should receive a confirmation email shortly.',
            messageId: messageData.id
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again or contact me directly.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Get messages (admin endpoint)
app.get('/api/messages', async (req, res) => {
    try {
        const messagesDir = path.join(__dirname, 'messages');
        await ensureDirectoryExists(messagesDir);
        
        const files = await fs.readdir(messagesDir);
        const messageFiles = files.filter(file => file.endsWith('.json'));
        
        const messages = await Promise.all(
            messageFiles.map(async (file) => {
                const content = await fs.readFile(path.join(messagesDir, file), 'utf8');
                return JSON.parse(content);
            })
        );
        
        // Sort by timestamp (newest first)
        messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        res.json({
            success: true,
            messages,
            count: messages.length
        });
        
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching messages'
        });
    }
});

// Mark message as read
app.patch('/api/messages/:id/read', async (req, res) => {
    try {
        const { id } = req.params;
        const messageFile = path.join(__dirname, 'messages', `${id}.json`);
        
        const content = await fs.readFile(messageFile, 'utf8');
        const messageData = JSON.parse(content);
        
        messageData.status = 'read';
        messageData.readAt = new Date().toISOString();
        
        await fs.writeFile(messageFile, JSON.stringify(messageData, null, 2));
        
        res.json({
            success: true,
            message: 'Message marked as read'
        });
        
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating message'
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'contact-form-server'
    });
});

// Serve admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact-admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`📧 Contact form server running on port ${PORT}`);
    console.log(`📊 Admin panel available at http://localhost:${PORT}/admin`);
    console.log(`🔗 API endpoint: http://localhost:${PORT}/api/contact`);
});

module.exports = app;