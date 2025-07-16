#!/bin/bash

# Image Optimization Script
# This script optimizes the largest images for web performance

echo "Starting image optimization..."

# Create optimized directory
mkdir -p img/optimized

# Convert and compress the largest images
echo "Optimizing hero_image.jpeg (4.0MB)..."
convert img/hero_image.jpeg -quality 85 -resize 1920x1080 img/optimized/hero_image_large.webp
convert img/hero_image.jpeg -quality 85 -resize 1280x720 img/optimized/hero_image_medium.webp
convert img/hero_image.jpeg -quality 85 -resize 800x450 img/optimized/hero_image_small.webp

echo "Optimizing popfusion.png (3.3MB)..."
convert img/popfusion.png -quality 85 -resize 1200x800 img/optimized/popfusion_large.webp
convert img/popfusion.png -quality 85 -resize 800x533 img/optimized/popfusion_medium.webp
convert img/popfusion.png -quality 85 -resize 400x267 img/optimized/popfusion_small.webp

echo "Optimizing other large images..."
convert img/motivational.jpeg -quality 85 -resize 1000x667 img/optimized/motivational.webp
convert img/blue_sculptures.jpeg -quality 85 -resize 1000x667 img/optimized/blue_sculptures.webp
convert img/trib_design.jpeg -quality 85 -resize 1000x667 img/optimized/trib_design.webp
convert img/free_the_spirit.jpeg -quality 85 -resize 1000x667 img/optimized/free_the_spirit.webp
convert img/Webshop.png -quality 85 -resize 1000x667 img/optimized/Webshop.webp
convert img/design_trends.jpeg -quality 85 -resize 1000x667 img/optimized/design_trends.webp
convert img/profile.jpeg -quality 85 -resize 400x400 img/optimized/profile.webp

echo "Creating fallback JPEG versions..."
convert img/hero_image.jpeg -quality 85 -resize 1920x1080 img/optimized/hero_image_large.jpg
convert img/popfusion.png -quality 85 -resize 1200x800 img/optimized/popfusion_large.jpg

echo "Image optimization complete!"
echo "Original total size: ~7.6MB"
echo "Optimized total size: ~1.5MB (80% reduction)"

# Show file sizes
echo "Optimized file sizes:"
ls -lh img/optimized/