#!/bin/bash

# Build script for optimized assets
# This script minifies CSS and JavaScript files

echo "Starting build optimization..."

# Create dist directory
mkdir -p dist/css dist/js

# Minify CSS files
echo "Minifying CSS files..."
# Simple CSS minification (remove comments, extra whitespace)
cat css/styles.css | sed 's/\/\*.*\*\///g' | tr -d '\n' | sed 's/  */ /g' | sed 's/; /;/g' | sed 's/: /:/g' | sed 's/{ /{/g' | sed 's/} /}/g' > dist/css/styles.min.css
cat css/logo-footer.css | sed 's/\/\*.*\*\///g' | tr -d '\n' | sed 's/  */ /g' | sed 's/; /;/g' | sed 's/: /:/g' | sed 's/{ /{/g' | sed 's/} /}/g' > dist/css/logo-footer.min.css

# Minify JavaScript files
echo "Minifying JavaScript files..."
# Simple JS minification (remove comments, extra whitespace)
cat js/main.js | sed 's/\/\/.*//g' | sed 's/\/\*.*\*\///g' | tr -d '\n' | sed 's/  */ /g' > dist/js/main.min.js
cat js/lazy-loading.js | sed 's/\/\/.*//g' | sed 's/\/\*.*\*\///g' | tr -d '\n' | sed 's/  */ /g' > dist/js/lazy-loading.min.js

echo "File size comparison:"
echo "Original CSS files:"
wc -c css/styles.css css/logo-footer.css
echo "Minified CSS files:"
wc -c dist/css/styles.min.css dist/css/logo-footer.min.css

echo "Original JS files:"
wc -c js/main.js js/lazy-loading.js
echo "Minified JS files:"
wc -c dist/js/main.min.js dist/js/lazy-loading.min.js

echo "Build optimization complete!"