#!/bin/bash

# Vercel Deployment Script with Error Handling
# This script ensures clean deployment without permission errors

set -e  # Exit on error

echo "🚀 Starting Vercel Deployment..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    echo "⚠️  Warning: vercel.json not found"
fi

# Clean up any potential problematic files
echo "🧹 Cleaning up..."
rm -rf .vercel/cache 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

# Ensure .vercelignore is present
if [ ! -f ".vercelignore" ]; then
    echo "❌ Error: .vercelignore not found"
    exit 1
fi

echo "✅ Pre-deployment checks passed"
echo ""

# Check environment variables
echo "🔍 Checking environment variables..."
if [ -f ".env" ]; then
    if grep -q "EMAIL_USER" .env && grep -q "EMAIL_PASS" .env; then
        echo "✅ Environment variables found in .env"
        echo "⚠️  Remember to set these in Vercel dashboard:"
        echo "   - EMAIL_USER"
        echo "   - EMAIL_PASS"
    fi
fi
echo ""

# Deploy based on argument
if [ "$1" == "prod" ] || [ "$1" == "production" ]; then
    echo "🚀 Deploying to PRODUCTION..."
    echo ""
    vercel --prod
elif [ "$1" == "preview" ]; then
    echo "🔍 Creating PREVIEW deployment..."
    echo ""
    vercel
else
    echo "📋 Usage:"
    echo "  ./vercel-deploy.sh prod      # Deploy to production"
    echo "  ./vercel-deploy.sh preview   # Create preview deployment"
    echo ""
    echo "Which deployment would you like?"
    echo "1) Production"
    echo "2) Preview"
    read -p "Enter choice (1 or 2): " choice
    
    case $choice in
        1)
            echo ""
            echo "🚀 Deploying to PRODUCTION..."
            echo ""
            vercel --prod
            ;;
        2)
            echo ""
            echo "🔍 Creating PREVIEW deployment..."
            echo ""
            vercel
            ;;
        *)
            echo "❌ Invalid choice"
            exit 1
            ;;
    esac
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Next steps:"
echo "1. Check the deployment URL provided above"
echo "2. Test the contact form"
echo "3. Verify analytics are working"
echo "4. Check browser console for errors"
