const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // Only allow GET requests for testing
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    try {
        // Check environment variables
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        console.log('Environment check:');
        console.log('EMAIL_USER:', emailUser ? 'Set' : 'Not set');
        console.log('EMAIL_PASS:', emailPass ? 'Set' : 'Not set');

        if (!emailUser || !emailPass) {
            return res.status(500).json({
                success: false,
                message: 'Email credentials not configured',
                config: {
                    EMAIL_USER: emailUser ? 'Set' : 'Not set',
                    EMAIL_PASS: emailPass ? 'Set' : 'Not set'
                }
            });
        }

        // Create transporter
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass
            },
            tls: {
                rejectUnauthorized: false
            },
            debug: true,
            logger: true
        });

        // Test connection
        console.log('Testing SMTP connection...');
        await transporter.verify();
        console.log('SMTP connection successful');

        // Send test email
        const testEmail = {
            from: `"Portfolio Test" <${emailUser}>`,
            to: emailUser,
            subject: 'Test Email from Portfolio Contact Form',
            html: `
                <h2>Email Configuration Test</h2>
                <p>This is a test email to verify that your email configuration is working correctly.</p>
                <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                <p><strong>From:</strong> ${emailUser}</p>
                <p>If you receive this email, your contact form should be working properly!</p>
            `
        };

        console.log('Sending test email...');
        const result = await transporter.sendMail(testEmail);
        console.log('Test email sent:', result.messageId);

        return res.status(200).json({
            success: true,
            message: 'Email configuration test successful!',
            details: {
                messageId: result.messageId,
                from: emailUser,
                to: emailUser,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Email test failed:', error);
        
        return res.status(500).json({
            success: false,
            message: 'Email test failed',
            error: {
                message: error.message,
                code: error.code,
                command: error.command
            }
        });
    }
}