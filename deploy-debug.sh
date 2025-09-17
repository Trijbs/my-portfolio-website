#!/bin/bash

echo "🔍 Vercel Deployment Debug Script"
echo "=================================="

# Check if vercel.json is valid JSON
echo "📋 Checking vercel.json syntax..."
if command -v jq &> /dev/null; then
    if jq empty vercel.json 2>/dev/null; then
        echo "✅ vercel.json is valid JSON"
    else
        echo "❌ vercel.json has syntax errors"
        jq . vercel.json
        exit 1
    fi
else
    echo "⚠️  jq not installed, skipping JSON validation"
fi

# Check if required files exist
echo ""
echo "📁 Checking required files..."
required_files=("public/index.html" "api/contact.js" "package.json")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
    fi
done

# Check if public directory structure is correct
echo ""
echo "📂 Checking public directory structure..."
if [ -d "public" ]; then
    echo "✅ public directory exists"
    echo "   Contents:"
    ls -la public/
else
    echo "❌ public directory is missing"
fi

# Check API directory
echo ""
echo "🔧 Checking API directory..."
if [ -d "api" ]; then
    echo "✅ api directory exists"
    echo "   Contents:"
    ls -la api/
else
    echo "❌ api directory is missing"
fi

# Check package.json
echo ""
echo "📦 Checking package.json..."
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
    if command -v node &> /dev/null; then
        echo "   Node version: $(node --version)"
        echo "   NPM version: $(npm --version)"
    fi
else
    echo "❌ package.json is missing"
fi

# Check environment variables (without showing values)
echo ""
echo "🔐 Environment variables check..."
echo "   EMAIL_USER: ${EMAIL_USER:+SET}"
echo "   EMAIL_PASS: ${EMAIL_PASS:+SET}"

echo ""
echo "🚀 Ready to deploy! Run: vercel --prod"
echo "   Or for preview: vercel"