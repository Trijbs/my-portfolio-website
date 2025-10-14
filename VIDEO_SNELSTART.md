# 🎬 Video Project - 5 Minuten Setup

## 🚀 Quick Start

Voeg je geanimeerde infographic (MP4) toe aan je portfolio in 3 eenvoudige stappen!

---

## ✅ Stap 1: Voeg Video Toe (2 min)

### A. Maak Videos Folder

```bash
# In je project root
mkdir public/videos
```

### B. Kopieer Je Video

```bash
# Kopieer je MP4 bestand
cp /pad/naar/jouw/video.mp4 public/videos/infographic.mp4
```

**Of via File Explorer:**
1. Navigeer naar `public/` folder
2. Maak nieuwe folder `videos`
3. Sleep je MP4 bestand naar `public/videos/`
4. Hernoem naar `infographic.mp4`

---

## ✅ Stap 2: Maak Thumbnail (1 min) - Optioneel

```bash
# Maak screenshot van je video en sla op als:
public/img/infographic-poster.jpg
```

**Tips:**
- Gebruik interessant frame uit video
- Formaat: JPG, 1200x800px
- Optimaliseer voor web (< 200KB)

**Geen thumbnail?** Geen probleem! Verwijder dan het `poster` attribute:

```html
<!-- In public/index.html, regel ~368 -->
<!-- VOOR: -->
<video poster="img/infographic-poster.jpg" muted loop playsinline>

<!-- NA: -->
<video muted loop playsinline>
```

---

## ✅ Stap 3: Pas Project Info Aan (2 min)

Open `public/index.html` en zoek naar regel ~356 (Video Project Card).

### Update Deze Velden:

#### 1. Video Pad (als je video een andere naam heeft)
```html
<!-- Regel ~368 -->
<source src="videos/infographic.mp4" type="video/mp4">

<!-- Verander naar jouw video naam: -->
<source src="videos/JOUW_VIDEO.mp4" type="video/mp4">
```

#### 2. Button Data Attributes
```html
<!-- Regel ~382 -->
<button class="btn btn-primary video-play" 
        data-video="videos/infographic.mp4" 
        data-title="Geanimeerde Infographic">

<!-- Update naar: -->
<button class="btn btn-primary video-play" 
        data-video="videos/JOUW_VIDEO.mp4" 
        data-title="Jouw Video Titel">
```

```html
<!-- Regel ~386 -->
<button class="btn btn-secondary video-download" 
        data-video="videos/infographic.mp4">

<!-- Update naar: -->
<button class="btn btn-secondary video-download" 
        data-video="videos/JOUW_VIDEO.mp4">
```

#### 3. Project Titel & Beschrijving
```html
<!-- Regel ~395 -->
<h3>Geanimeerde Infographic</h3>
<p>Een professioneel geanimeerde infographic...</p>

<!-- Verander naar: -->
<h3>Jouw Video Titel</h3>
<p>Jouw video beschrijving...</p>
```

#### 4. Tags (Optioneel)
```html
<!-- Regel ~401 -->
<span class="tag">Motion Design</span>
<span class="tag">Infographic</span>
<span class="tag">Animation</span>
<span class="tag">Video</span>

<!-- Pas aan naar jouw project -->
```

---

## 🧪 Test Lokaal

```bash
# Start development server
vercel dev

# Open in browser
http://localhost:3000
```

**Test:**
1. Scroll naar Projects sectie
2. Klik op "Video" filter
3. Hover over video card → Video speelt
4. Klik "Play Video" → Modal opent
5. Klik "Download" → Video download
6. Sluit modal met X of ESC

---

## 🚀 Deploy

```bash
# Deploy naar Vercel
vercel --prod

# Of via Git
git add .
git commit -m "Add video project"
git push origin main
```

---

## 🎯 Hoe Het Werkt

### Video Card Features:
- ✅ **Hover** → Video speelt automatisch (zonder geluid)
- ✅ **Play Button** → Opent video in fullscreen modal
- ✅ **Download Button** → Download video direct
- ✅ **Video Badge** → Geanimeerde gradient badge
- ✅ **Analytics** → Automatisch getrackt

### Modal Features:
- ✅ Fullscreen video player
- ✅ Native HTML5 controls
- ✅ Autoplay bij openen
- ✅ ESC om te sluiten
- ✅ Click buiten modal om te sluiten

---

## 📋 Checklist

- [ ] Video toegevoegd aan `public/videos/`
- [ ] Video is MP4 formaat (H.264)
- [ ] Video is < 50MB
- [ ] Poster image toegevoegd (optioneel)
- [ ] HTML aangepast met video pad
- [ ] Project titel & beschrijving aangepast
- [ ] Tags aangepast
- [ ] Lokaal getest
- [ ] Deployed naar productie

---

## 🐛 Problemen?

### Video laadt niet
```bash
# Check of bestand bestaat
ls -la public/videos/

# Moet tonen: infographic.mp4 (of jouw video naam)
```

### Video speelt niet automatisch
```html
<!-- Verify dat video 'muted' attribute heeft -->
<video muted loop playsinline>
```

### Download werkt niet
- Check of video URL correct is in button
- Test in incognito mode
- Check browser console (F12)

---

## 💡 Tips

### Video Optimalisatie
```
✅ Gebruik MP4 (H.264) formaat
✅ Houd bestandsgrootte onder 50MB
✅ Resolutie: 1920x1080 (Full HD)
✅ Comprimeer voor web
```

### Thumbnail
```
✅ Gebruik interessant frame
✅ JPG formaat, 1200x800px
✅ Optimaliseer (< 200KB)
```

### Beschrijving
```
✅ Wees specifiek
✅ Noem belangrijke features
✅ Vermeld tools gebruikt
✅ Houd het beknopt (2-3 zinnen)
```

---

## 📚 Meer Informatie

Voor gedetailleerde instructies, troubleshooting, en geavanceerde opties:

👉 **Lees**: `VIDEO_INTEGRATION_GUIDE.md`

---

## 🎊 Klaar!

Je video project is nu live op je portfolio! 🎬

**Features:**
- ✅ Professionele video showcase
- ✅ Hover autoplay preview
- ✅ Fullscreen modal
- ✅ Download functionaliteit
- ✅ Analytics tracking

**Test je live site en deel met de wereld!** 🚀

---

**Laatste Update**: December 2024  
**Versie**: 1.0  
**Status**: ✅ Klaar voor gebruik  

**Veel succes!** 🎬✨
