# 🎬 Video Project Integratie - Complete Gids

## 🎯 Overzicht

Je portfolio ondersteunt nu **MP4 video projecten**! Perfect voor geanimeerde infographics, motion design, en video content.

---

## ✨ Features

### 1. **Video Preview Card**
- ✅ Video speelt automatisch af bij hover (zonder geluid)
- ✅ Grote play button overlay
- ✅ Pulse animatie voor aandacht
- ✅ Video badge met gradient
- ✅ Smooth hover effecten

### 2. **Twee Buttons**
- ✅ **"Play Video"** - Opent video in fullscreen modal
- ✅ **"Download"** - Download de video direct

### 3. **Video Modal**
- ✅ Fullscreen video player
- ✅ Native HTML5 controls
- ✅ Autoplay bij openen
- ✅ Keyboard shortcuts (ESC om te sluiten)
- ✅ Click buiten modal om te sluiten

### 4. **Analytics Tracking**
- ✅ Video views getrackt
- ✅ Video downloads getrackt
- ✅ Hover interactions getrackt

---

## 📁 Bestandsstructuur

### Waar Je Video Moet Plaatsen

```
project-root/
├── public/
│   ├── videos/              ← Maak deze folder
│   │   └── infographic.mp4  ← Jouw video hier
│   ├── img/
│   │   └── infographic-poster.jpg  ← Thumbnail (optioneel)
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
```

---

## 🚀 Setup Instructies

### Stap 1: Maak Videos Folder

```bash
# Maak de videos folder in public
mkdir public/videos

# Of via Windows Explorer/Finder:
# Navigeer naar public/ en maak een nieuwe folder "videos"
```

### Stap 2: Voeg Je Video Toe

```bash
# Kopieer je MP4 video naar de videos folder
cp /pad/naar/jouw/video.mp4 public/videos/infographic.mp4

# Of sleep je video bestand naar public/videos/ in je file explorer
```

**Belangrijk:**
- Video moet `.mp4` formaat zijn
- Aanbevolen: H.264 codec voor beste compatibiliteit
- Max bestandsgrootte: 50MB (voor snelle loading)
- Aanbevolen resolutie: 1920x1080 (Full HD)

### Stap 3: Maak Thumbnail (Optioneel maar Aanbevolen)

Een thumbnail zorgt voor snellere loading en betere UX:

```bash
# Maak een screenshot van je video en sla op als:
public/img/infographic-poster.jpg
```

**Tips voor thumbnail:**
- Gebruik een interessant frame uit je video
- Formaat: JPG of PNG
- Resolutie: 1200x800px
- Optimaliseer voor web (< 200KB)

---

## 📝 HTML Configuratie

De video project card is al toegevoegd aan `public/index.html` (regel ~356).

### Wat Je Moet Aanpassen:

#### 1. Video Pad
```html
<!-- Huidige configuratie -->
<source src="videos/infographic.mp4" type="video/mp4">

<!-- Als je video een andere naam heeft: -->
<source src="videos/JOUW_VIDEO_NAAM.mp4" type="video/mp4">
```

#### 2. Poster Image (Thumbnail)
```html
<!-- Huidige configuratie -->
<video poster="img/infographic-poster.jpg">

<!-- Als je geen poster hebt, verwijder het poster attribute: -->
<video muted loop playsinline>

<!-- Of gebruik een andere poster: -->
<video poster="img/JOUW_POSTER.jpg">
```

#### 3. Project Informatie
```html
<!-- Pas aan naar jouw project -->
<h3>Geanimeerde Infographic</h3>
<p>Een professioneel geanimeerde infographic...</p>

<!-- Bijvoorbeeld: -->
<h3>Mijn Awesome Video</h3>
<p>Een creatieve video die [beschrijving]...</p>
```

#### 4. Tags
```html
<!-- Huidige tags -->
<span class="tag">Motion Design</span>
<span class="tag">Infographic</span>
<span class="tag">Animation</span>
<span class="tag">Video</span>

<!-- Pas aan naar jouw project -->
<span class="tag">After Effects</span>
<span class="tag">2D Animation</span>
<span class="tag">Explainer Video</span>
```

#### 5. Stats
```html
<!-- Huidige stats -->
<div class="stat">
    <i data-feather="film"></i>
    <span>MP4 Video</span>
</div>
<div class="stat">
    <i data-feather="clock"></i>
    <span>HD Quality</span>
</div>

<!-- Bijvoorbeeld met video lengte: -->
<div class="stat">
    <i data-feather="clock"></i>
    <span>2:30 min</span>
</div>
<div class="stat">
    <i data-feather="film"></i>
    <span>1080p HD</span>
</div>
```

---

## 🎨 Hoe Het Werkt

### Video Preview (Hover Effect)

```javascript
// Video speelt automatisch bij hover
project.addEventListener('mouseenter', () => {
    video.play();
});

// Video pauzeert en reset bij mouse leave
project.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
});
```

### Play Button

```javascript
// Opent video in fullscreen modal
button.addEventListener('click', () => {
    openVideoModal(videoUrl, title);
});
```

### Download Button

```javascript
// Download video direct
button.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = filename;
    link.click();
});
```

---

## 🎯 Visueel Resultaat

```
┌─────────────────────────────────────────┐
│   🎬 Geanimeerde Infographic            │
│                                         │
│  ┌─────────────────────────────┐       │
│  │  [Video Badge]              │       │
│  │                             │       │
│  │  [Video Preview Playing]    │       │
│  │                             │       │
│  │  [Large Play Icon]          │       │
│  │                             │       │
│  │  Hover: Video plays         │       │
│  │  Click: Opens modal         │       │
│  │                             │       │
│  │  [Play Video] [Download]    │       │
│  └─────────────────────────────┘       │
│                                         │
│  Geanimeerde Infographic    [Video]    │
│  Een professioneel geanimeerde...       │
│                                         │
│  [Motion Design] [Infographic]          │
│  [Animation] [Video]                    │
│                                         │
│  🎬 MP4 Video  ⏱️ HD Quality            │
└─────────────────────────────────────────┘
```

---

## 🎨 Styling Details

### Video Badge
```css
.video-badge {
  background: linear-gradient(135deg, 
    #ff0080 0%,    /* Pink */
    #ff8c00 50%,   /* Orange */
    #40e0d0 100%   /* Turquoise */
  );
  animation: shimmer 3s ease-in-out infinite;
}
```

### Play Icon
```css
.play-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
```

### Video Hover Effect
```css
.project-card.video-project:hover .video-preview video {
  transform: scale(1.05);
}
```

---

## 📊 Analytics Tracking

### Automatisch Getrackte Events

**Video View Event:**
```javascript
{
  event: 'video_view',
  title: 'Geanimeerde Infographic',
  url: 'videos/infographic.mp4',
  page: window.location.pathname,
  timestamp: new Date().toISOString()
}
```

**Video Download Event:**
```javascript
{
  event: 'video_download',
  video: 'videos/infographic.mp4',
  page: window.location.pathname,
  timestamp: new Date().toISOString()
}
```

**Bekijk in Vercel Dashboard:**
```
Dashboard → Analytics → Events → Filter: "video"
```

---

## 🐛 Troubleshooting

### Probleem: Video laadt niet

**Mogelijke oorzaken:**

1. **Video bestand bestaat niet**
   ```bash
   # Check of bestand bestaat
   ls -la public/videos/
   
   # Moet tonen:
   infographic.mp4
   ```

2. **Verkeerd pad in HTML**
   ```html
   <!-- FOUT -->
   <source src="/videos/infographic.mp4">
   
   <!-- CORRECT -->
   <source src="videos/infographic.mp4">
   ```

3. **Video formaat niet ondersteund**
   ```
   Oplossing: Converteer naar MP4 (H.264)
   Tool: HandBrake, FFmpeg, of online converter
   ```

---

### Probleem: Video speelt niet automatisch bij hover

**Oplossing:**
1. Check browser console (F12) voor errors
2. Verify dat video `muted` attribute heeft
3. Test in verschillende browsers
4. Check of JavaScript geladen is

```html
<!-- Video MOET muted zijn voor autoplay -->
<video muted loop playsinline>
```

---

### Probleem: Download button werkt niet

**Oplossing:**
1. Check of video URL correct is
2. Verify CORS headers (voor externe videos)
3. Test in incognito mode
4. Check browser console voor errors

---

### Probleem: Video is te groot / laadt langzaam

**Oplossing: Optimaliseer je video**

```bash
# Met FFmpeg (gratis tool)
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4

# Dit verkleint de video zonder veel kwaliteitsverlies
```

**Aanbevolen settings:**
- Codec: H.264
- Resolutie: 1920x1080 (Full HD)
- Bitrate: 2-5 Mbps
- Audio: AAC, 128kbps
- Bestandsgrootte: < 50MB

---

## 💡 Best Practices

### 1. Video Optimalisatie
```
✅ Gebruik H.264 codec (beste compatibiliteit)
✅ Comprimeer video voor web
✅ Houd bestandsgrootte onder 50MB
✅ Gebruik 1920x1080 resolutie
✅ Voeg poster image toe
```

### 2. Thumbnail/Poster
```
✅ Maak aantrekkelijke thumbnail
✅ Gebruik interessant frame
✅ Optimaliseer voor web (< 200KB)
✅ Gebruik JPG formaat
✅ Resolutie: 1200x800px
```

### 3. Beschrijving
```
✅ Wees specifiek over de video
✅ Noem belangrijke features
✅ Vermeld tools/software gebruikt
✅ Voeg context toe
✅ Houd het beknopt (2-3 zinnen)
```

### 4. Tags
```
✅ Gebruik relevante tags
✅ Max 4-5 tags per video
✅ Mix technische en conceptuele tags
✅ Consistent naming
```

---

## 🎬 Meer Video's Toevoegen

### Dupliceer de Video Project Card

1. **Kopieer de hele video project card** in `public/index.html`
2. **Update de video URL**:
   ```html
   <source src="videos/NIEUWE_VIDEO.mp4" type="video/mp4">
   ```
3. **Update de buttons**:
   ```html
   <button class="btn btn-primary video-play" 
           data-video="videos/NIEUWE_VIDEO.mp4" 
           data-title="Nieuwe Video Titel">
   ```
4. **Update project info**:
   ```html
   <h3>Nieuwe Video Titel</h3>
   <p>Nieuwe beschrijving...</p>
   ```

---

## 🎯 Video Formaten

### Ondersteunde Formaten
- ✅ **MP4** (H.264) - Aanbevolen
- ✅ **WebM** (VP8/VP9) - Moderne browsers
- ✅ **OGG** (Theora) - Oudere browsers

### Aanbevolen: MP4 met Fallback
```html
<video muted loop playsinline poster="img/poster.jpg">
    <source src="videos/video.mp4" type="video/mp4">
    <source src="videos/video.webm" type="video/webm">
    Your browser does not support the video tag.
</video>
```

---

## 🔧 Geavanceerde Opties

### Custom Video Controls

Als je custom controls wilt (in plaats van native):

```html
<!-- Voeg toe aan video container -->
<div class="custom-video-controls">
    <button class="play-pause">
        <i data-feather="play"></i>
    </button>
    <div class="progress-bar">
        <div class="progress"></div>
    </div>
    <span class="time">0:00 / 0:00</span>
    <button class="fullscreen">
        <i data-feather="maximize"></i>
    </button>
</div>
```

### Video met Geluid

Als je video geluid heeft en je wilt dat het standaard aan staat:

```html
<!-- Verwijder 'muted' attribute -->
<video loop playsinline controls>
    <source src="videos/video-with-audio.mp4" type="video/mp4">
</video>
```

**Let op:** Browsers blokkeren vaak autoplay met geluid!

---

## 📱 Responsive Design

De video project card is volledig responsive:

### Desktop (> 1024px)
- Volledige video preview
- Hover autoplay
- Beide buttons zichtbaar
- Grid layout (3 kolommen)

### Tablet (768px - 1024px)
- Aangepaste video grootte
- Touch-friendly buttons
- Grid layout (2 kolommen)
- Optimized spacing

### Mobile (< 768px)
- Gestapelde layout
- Grotere touch targets
- Single column grid
- Video speelt niet automatisch (data besparing)

---

## ✅ Pre-Deployment Checklist

### Video Configuratie
- [ ] Video bestand toegevoegd aan `public/videos/`
- [ ] Video is geoptimaliseerd (< 50MB)
- [ ] Video formaat is MP4 (H.264)
- [ ] Poster image toegevoegd (optioneel)
- [ ] Video URL correct in HTML

### HTML Updates
- [ ] Video pad correct
- [ ] Project naam aangepast
- [ ] Beschrijving geschreven
- [ ] Tags toegevoegd
- [ ] Stats aangepast
- [ ] Buttons geconfigureerd

### Testing
- [ ] Lokaal getest
- [ ] Video speelt af bij hover
- [ ] Play button opent modal
- [ ] Download button werkt
- [ ] Modal sluit correct
- [ ] Responsive design getest
- [ ] Alle browsers getest

### Performance
- [ ] Video is gecomprimeerd
- [ ] Poster image geoptimaliseerd
- [ ] Loading tijd acceptabel
- [ ] Geen console errors

---

## 🚀 Deployment

### Lokaal Testen

```bash
# Start development server
vercel dev

# Of gebruik andere local server
npx serve public

# Open in browser
http://localhost:3000
```

**Test:**
- [ ] Scroll naar Projects sectie
- [ ] Klik op "Video" filter
- [ ] Zie video project card
- [ ] Hover over card → Video speelt
- [ ] Klik "Play Video" → Modal opent
- [ ] Video speelt in modal
- [ ] Klik "Download" → Video download
- [ ] Sluit modal met X of ESC

### Productie Deployment

```bash
# Deploy naar Vercel
vercel --prod

# Of via Git
git add public/videos/ public/index.html public/css/styles.css public/js/main.js
git commit -m "Add video project: Geanimeerde Infographic"
git push origin main
```

### Post-Deployment

1. **Test live site**
   - Bezoek je portfolio URL
   - Test video functionaliteit
   - Check responsive design
   - Verify analytics tracking

2. **Monitor performance**
   - Check loading times
   - Monitor bandwidth usage
   - Verify video plays smoothly

3. **Share met anderen**
   - Deel je portfolio link
   - Laat mensen je video zien
   - Collect feedback

---

## 📞 Hulp Nodig?

### Debugging
```bash
# Check console voor errors
F12 → Console

# Test video URL
Open video URL direct in browser

# Verify video formaat
ffprobe videos/infographic.mp4
```

### Common Issues
- Video laadt niet → Check bestandspad
- Autoplay werkt niet → Verify 'muted' attribute
- Download werkt niet → Check CORS headers
- Modal opent niet → Check JavaScript console

---

## 🎊 Resultaat

Je hebt nu:

### Features
- ✅ Professionele video showcase
- ✅ Hover autoplay preview
- ✅ Fullscreen video modal
- ✅ Download functionaliteit
- ✅ Analytics tracking
- ✅ Volledig responsive

### Benefits
- ✅ Showcase motion design werk
- ✅ Interactieve presentatie
- ✅ Betere engagement
- ✅ Trackbare metrics
- ✅ Professionele uitstraling

### Impact
- 🎬 Showcase video content
- 🚀 Verhoogde professionaliteit
- 📊 Meetbare resultaten
- 💼 Meer client interesse

---

**Laatste Update**: December 2024  
**Versie**: 1.0  
**Status**: ✅ Productie-klaar  

**Veel succes met je video project!** 🎬🚀
