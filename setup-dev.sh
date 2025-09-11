#!/bin/bash

# Development Setup Script
# Sets up the portfolio for local development with Vercel

echo "🛠️  Setting up Portfolio for Local Development..."

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "⚠️  Please edit .env.local with your email credentials:"
    echo "   - EMAIL_USER: Your Gmail address"
    echo "   - EMAIL_PASS: Your Gmail app password (not regular password)"
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development server:"
echo "   npm run dev"
echo "   or"
echo "   vercel dev"
echo ""
echo "📧 Email Setup Instructions:"
echo "   1. Enable 2FA on your Gmail account"
echo "   2. Generate an App Password (not your regular password)"
echo "   3. Update .env.local with your credentials"
echo ""
echo "🌐 The site will be available at: http://localhost:3000"