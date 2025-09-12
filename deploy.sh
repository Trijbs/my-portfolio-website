#!/bin/bash

# Portfolio Deployment Script
# Forces cache invalidation and ensures latest version is deployed

echo "🚀 Starting portfolio deployment..."

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found. Please run this script from the project root."
    exit 1
fi

# Update version number in files
TIMESTAMP=$(date +%s)
VERSION="2.0.${TIMESTAMP}"

echo "📝 Updating version to: $VERSION"

# Update version in cache-buster.js
sed -i.bak "s/const CURRENT_VERSION = '[^']*'/const CURRENT_VERSION = '$VERSION'/g" public/js/cache-buster.js

# Update CSS version in HTML files
sed -i.bak "s/css\/styles\.css?v=[^\"']*/css\/styles.css?v=$VERSION/g" public/index.html
sed -i.bak "s/css\/logo-footer\.css?v=[^\"']*/css\/logo-footer.css?v=$VERSION/g" public/index.html

# Update JS version in HTML files
sed -i.bak "s/js\/cache-buster\.js?v=[^\"']*/js\/cache-buster.js?v=$VERSION/g" public/index.html
sed -i.bak "s/js\/main\.js?v=[^\"']*/js\/main.js?v=$VERSION/g" public/index.html
sed -i.bak "s/js\/vercel-analytics\.js?v=[^\"']*/js\/vercel-analytics.js?v=$VERSION/g" public/index.html
sed -i.bak "s/js\/privacy-controls\.js?v=[^\"']*/js\/privacy-controls.js?v=$VERSION/g" public/index.html
sed -i.bak "s/js\/contact-form\.js?v=[^\"']*/js\/contact-form.js?v=$VERSION/g" public/index.html
sed -i.bak "s/js\/analytics-test\.js?v=[^\"']*/js\/analytics-test.js?v=$VERSION/g" public/index.html

# Clean up backup files
rm -f public/index.html.bak public/js/cache-buster.js.bak

echo "✅ Version numbers updated to: $VERSION"

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."

if command -v vercel &> /dev/null; then
    vercel --prod
    echo "✅ Deployment completed!"
    echo "🔗 Your site should be updated at your production domain"
    echo "💡 If you still see old content, try:"
    echo "   - Hard refresh (Ctrl+F5 or Cmd+Shift+R)"
    echo "   - Clear browser cache"
    echo "   - Wait 5-10 minutes for CDN propagation"
else
    echo "⚠️  Vercel CLI not found. Please install it with:"
    echo "   npm i -g vercel"
    echo "   Then run: vercel --prod"
fi

echo "🎉 Deployment script completed!"
echo "📋 Next steps:"
echo "   1. Wait 2-3 minutes for deployment to complete"
echo "   2. Visit your main domain"
echo "   3. If needed, hard refresh (Ctrl+F5)"
echo "   4. The cache buster will handle future updates automatically"