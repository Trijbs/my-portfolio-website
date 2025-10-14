# 🎨 Figma Snelstart - 5 Minuten Setup

## ✅ Wat is er toegevoegd?

Je portfolio heeft nu **Figma integratie**! Je kunt nu:
- ✅ Figma designs tonen in de projecten sectie
- ✅ Directe links naar Figma bestanden
- ✅ Interactieve previews in een modal
- ✅ Mooie Figma icon animatie
- ✅ Automatische analytics tracking

---

## 🚀 Snelle Setup (5 minuten)

### Stap 1: Verkrijg je Figma URLs (2 min)

#### A. Figma File URL
1. Open je Figma bestand
2. Klik **"Share"** rechtsboven
3. Zet op **"Anyone with the link can view"**
4. Kopieer de URL

**Voorbeeld:**
```
https://www.figma.com/file/abc123xyz/Mijn-Design-Project
```

#### B. Maak Embed URL
Neem je Figma URL en voeg toe aan dit formaat:

```
https://www.figma.com/embed?embed_host=share&url=JOUW_FIGMA_URL
```

**Voorbeeld:**
```
https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/abc123xyz/Mijn-Design-Project
```

---

### Stap 2: Update HTML (2 min)

Open `public/index.html` en zoek naar regel ~302:

```html
<!-- ZOEK NAAR DIT: -->
<button class="btn btn-primary figma-view" 
        data-figma-url="YOUR_FIGMA_URL_HERE" 
        data-title="Design Project">

<!-- VERVANG MET: -->
<button class="btn btn-primary figma-view" 
        data-figma-url="https://www.figma.com/file/abc123xyz/Mijn-Design-Project" 
        data-title="Mijn Design Project">
```

```html
<!-- ZOEK NAAR DIT: -->
<button class="btn btn-secondary figma-embed" 
        data-figma-embed="YOUR_FIGMA_EMBED_URL" 
        data-title="Design Project">

<!-- VERVANG MET: -->
<button class="btn btn-secondary figma-embed" 
        data-figma-embed="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/abc123xyz/Mijn-Design-Project" 
        data-title="Mijn Design Project">
```

**Update ook de project info:**
```html
<h3>UI/UX Design System</h3>  <!-- Verander naar jouw project naam -->
<p>A comprehensive design system...</p>  <!-- Verander beschrijving -->
```

---

### Stap 3: Test & Deploy (1 min)

```bash
# Test lokaal
vercel dev

# Deploy naar productie
vercel --prod
```

**Test de buttons:**
- ✅ "View in Figma" → Opent Figma in nieuwe tab
- ✅ "Preview" → Toont Figma embed in modal

---

## 🎯 Wat Doen de Buttons?

### "View in Figma" Button
- Opent je Figma bestand in een nieuwe tab
- Gebruikers kunnen het volledige design zien
- Kunnen comments achterlaten (als je dat toestaat)
- Altijd de laatste versie

### "Preview" Button
- Toont Figma embed binnen je website
- Geen nieuwe tab nodig
- Interactieve prototypes werken
- Professionele presentatie

---

## 📝 Meerdere Figma Projecten Toevoegen

Kopieer het hele project block en pas aan:

```html
<!-- Figma Project 1 -->
<div class="project-card figma-project" data-category="design creative">
    <!-- ... project content ... -->
</div>

<!-- Figma Project 2 -->
<div class="project-card figma-project" data-category="design web">
    <div class="project-image">
        <div class="figma-preview">
            <div class="figma-icon">
                <!-- Figma SVG (zie FIGMA_INTEGRATION_GUIDE.md) -->
            </div>
            <p class="figma-label">Figma Design</p>
        </div>
        <div class="project-overlay">
            <div class="project-actions">
                <button class="btn btn-primary figma-view" 
                        data-figma-url="https://www.figma.com/file/xyz789/Project-2" 
                        data-title="Project 2">
                    <i data-feather="figma"></i>
                    View in Figma
                </button>
                <button class="btn btn-secondary figma-embed" 
                        data-figma-embed="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/xyz789/Project-2" 
                        data-title="Project 2">
                    <i data-feather="eye"></i>
                    Preview
                </button>
            </div>
        </div>
    </div>
    <div class="project-content">
        <div class="project-header">
            <h3>Jouw Project Naam</h3>
            <div class="project-status">
                <span class="status-badge design">Figma</span>
            </div>
        </div>
        <p>Jouw project beschrijving...</p>
        <div class="project-tags">
            <span class="tag">Figma</span>
            <span class="tag">UI/UX</span>
            <span class="tag">Jouw Tag</span>
        </div>
        <div class="project-stats">
            <div class="stat">
                <i data-feather="layers"></i>
                <span>Aantal Components</span>
            </div>
            <div class="stat">
                <i data-feather="palette"></i>
                <span>Design System</span>
            </div>
        </div>
    </div>
</div>
```

---

## 🎨 Filter Buttons

Er is een nieuwe **"Design"** filter toegevoegd:

```html
<button class="filter-btn" data-filter="design">Design</button>
```

**Gebruik categories:**
- `data-category="design"` → Alleen design projecten
- `data-category="design web"` → Design + Web projecten
- `data-category="design creative"` → Design + Creative projecten

---

## 🐛 Problemen Oplossen

### "Figma URL not configured yet" alert
**Oplossing:** Vervang `YOUR_FIGMA_URL_HERE` met je echte URL

### Figma embed laadt niet
**Oplossing:** 
1. Check of Figma bestand publiek is ("Anyone with the link can view")
2. Gebruik het juiste embed formaat
3. Test URL in incognito browser

### Button doet niets
**Oplossing:**
1. Check browser console (F12)
2. Ververs de pagina
3. Check of Feather icons geladen zijn

---

## 📊 Features

### ✅ Wat Werkt:
- Figma icon met float animatie
- Twee buttons (View & Preview)
- Modal voor embed preview
- Analytics tracking
- Responsive design
- Filter functionaliteit
- Mooie gradient badge

### 🎨 Styling:
- Figma kleuren gradient badge
- Animated floating icon
- Smooth hover effects
- Professional layout

---

## 📚 Meer Informatie

Voor gedetailleerde instructies, zie:
- **`FIGMA_INTEGRATION_GUIDE.md`** - Complete gids met alle opties

---

## ✅ Checklist

Voordat je deploy:

- [ ] Figma bestand is publiek viewable
- [ ] File URL ingevuld
- [ ] Embed URL ingevuld
- [ ] Project naam aangepast
- [ ] Beschrijving aangepast
- [ ] Tags aangepast
- [ ] Lokaal getest
- [ ] Beide buttons werken

---

## 🎊 Klaar!

Je Figma projecten zijn nu live in je portfolio!

**Volgende stappen:**
1. Voeg meer Figma projecten toe
2. Test op verschillende devices
3. Deel met potentiële klanten

---

## 💡 Tips

1. **Gebruik duidelijke namen** voor je Figma bestanden
2. **Voeg screenshots toe** aan je Figma bestand voor betere previews
3. **Organiseer je Figma** met frames en pages
4. **Update regelmatig** je designs
5. **Monitor analytics** om te zien welke designs populair zijn

---

**Tijd**: 5 minuten  
**Moeilijkheid**: ⭐ Makkelijk  
**Impact**: 🚀 Hoog  

**Succes!** 🎨
