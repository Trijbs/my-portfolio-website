// Simple test to verify deployment structure
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing deployment structure...\n');

// Check required files
const requiredFiles = [
    'public/index.html',
    'public/info.html',
    'api/contact.js',
    'package.json',
    'vercel.json'
];

let allGood = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} is missing`);
        allGood = false;
    }
});

// Check vercel.json syntax
try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    console.log('✅ vercel.json is valid JSON');
    
    // Check for the problematic "public" property
    if (vercelConfig.public && typeof vercelConfig.public === 'string') {
        console.log('❌ Found problematic "public" property in vercel.json');
        allGood = false;
    } else {
        console.log('✅ vercel.json "public" property is correctly configured');
    }
    
    // Check if cleanUrls is enabled
    if (vercelConfig.cleanUrls) {
        console.log('✅ cleanUrls is enabled');
    } else {
        console.log('⚠️  cleanUrls is not enabled');
    }
    
} catch (error) {
    console.log('❌ vercel.json has syntax errors:', error.message);
    allGood = false;
}

// Check public directory structure
if (fs.existsSync('public')) {
    console.log('✅ public directory exists');
    const publicContents = fs.readdirSync('public');
    console.log('   Contents:', publicContents.join(', '));
} else {
    console.log('❌ public directory is missing');
    allGood = false;
}

console.log('\n' + '='.repeat(50));
if (allGood) {
    console.log('🎉 All checks passed! Ready to deploy.');
    console.log('\nTo deploy:');
    console.log('1. Set environment variables in Vercel dashboard:');
    console.log('   - EMAIL_USER=your-gmail@gmail.com');
    console.log('   - EMAIL_PASS=your-app-password');
    console.log('2. Run: vercel --prod');
} else {
    console.log('❌ Some issues found. Please fix them before deploying.');
}