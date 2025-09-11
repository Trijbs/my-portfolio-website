#!/bin/bash

# Vercel Deployment Script
# This script helps deploy the portfolio to Vercel

echo "🚀 Deploying Portfolio to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if .env.local exists for local development
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp .env.local.example .env.local
    echo "📝 Please edit .env.local with your email credentials"
fi

# Deploy to production
echo "🌐 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "📧 Don't forget to set EMAIL_USER and EMAIL_PASS in Vercel dashboard"
echo "🔗 Visit: https://vercel.com/dashboard to manage your deployment"