# 🎨 Figma Integration Guide

## 📋 Overzicht

Deze gids legt uit hoe je Figma designs kunt toevoegen aan je portfolio projecten sectie.

---

## 🚀 Snelstart

### Stap 1: Verkrijg je Figma URLs

Je hebt **2 URLs** nodig van je Figma bestand:

#### A. **Figma File URL** (voor directe link)
```
https://www.figma.com/file/XXXXXXXXXX/Your-Design-Name
```

**Hoe te verkrijgen:**
1. Open je Figma bestand
2. Klik op **"Share"** rechtsboven
3. Zorg dat **"Anyone with the link can view"** is ingeschakeld
4. Kopieer de link

#### B. **Figma Embed URL** (voor preview in modal)
```
https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/XXXXXXXXXX/Your-Design-Name
```

**Hoe te maken:**
1. Neem je Figma File URL
2. Voeg deze toe aan het embed formaat:
   ```
   https://www.figma.com/embed?embed_host=share&url=JOUW_FIGMA_URL
   ```

**Voorbeeld:**
```
Originele URL:
https://www.figma.com/file/abc123/My-Design

Embed URL:
https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/abc123/My-Design
```

---

## 📝 Figma Project Toevoegen

### Optie 1: Gebruik het Template (Makkelijk)

In `public/index.html` staat al een Figma project template. Vervang de placeholder URLs:

```html
<!-- Zoek naar dit in index.html (regel ~302) -->
<button class="btn btn-primary figma-view" 
        data-figma-url="YOUR_FIGMA_URL_HERE" 
        data-title="Design Project">
    <i data-feather="figma"></i>
    View in Figma
</button>
<button class="btn btn-secondary figma-embed" 
        data-figma-embed="YOUR_FIGMA_EMBED_URL" 
        data-title="Design Project">
    <i data-feather="eye"></i>
    Preview
</button>
```

**Vervang:**
- `YOUR_FIGMA_URL_HERE` → Je Figma File URL
- `YOUR_FIGMA_EMBED_URL` → Je Figma Embed URL
- `Design Project` → Je project naam

**Update ook de project informatie:**
```html
<h3>UI/UX Design System</h3>  <!-- Verander titel -->
<p>A comprehensive design system...</p>  <!-- Verander beschrijving -->
<span class="tag">Figma</span>  <!-- Pas tags aan -->
```

---

### Optie 2: Nieuw Figma Project Toevoegen (Geavanceerd)

Voeg een nieuw Figma project toe aan de projects grid:

```html
<!-- Voeg dit toe in de projects-grid sectie -->
<div class="project-card figma-project" data-category="design creative">
    <div class="project-image">
        <div class="figma-preview">
            <div class="figma-icon">
                <svg width="60" height="60" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                </svg>
            </div>
            <p class="figma-label">Figma Design</p>
        </div>
        <div class="project-overlay">
            <div class="project-actions">
                <button class="btn btn-primary figma-view" 
                        data-figma-url="JOUW_FIGMA_URL" 
                        data-title="Jouw Project Naam">
                    <i data-feather="figma"></i>
                    View in Figma
                </button>
                <button class="btn btn-secondary figma-embed" 
                        data-figma-embed="JOUW_FIGMA_EMBED_URL" 
                        data-title="Jouw Project Naam">
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
        <p>Jouw project beschrijving hier...</p>
        <div class="project-tags">
            <span class="tag">Figma</span>
            <span class="tag">UI/UX</span>
            <span class="tag">Design System</span>
            <span class="tag">Prototyping</span>
        </div>
        <div class="project-stats">
            <div class="stat">
                <i data-feather="layers"></i>
                <span>50+ Components</span>
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

## 🎯 Verschillende Figma Integratie Opties

### 1. **Directe Link naar Figma** (Aanbevolen voor complexe designs)

**Voordelen:**
- ✅ Volledige Figma functionaliteit
- ✅ Gebruikers kunnen comments achterlaten
- ✅ Altijd up-to-date
- ✅ Geen iframe beperkingen

**Gebruik:**
```html
<button class="btn btn-primary figma-view" 
        data-figma-url="https://www.figma.com/file/abc123/My-Design" 
        data-title="My Design">
    <i data-feather="figma"></i>
    View in Figma
</button>
```

---

### 2. **Figma Embed Preview** (Aanbevolen voor snelle preview)

**Voordelen:**
- ✅ Preview binnen je website
- ✅ Geen nieuwe tab nodig
- ✅ Professionele presentatie
- ✅ Interactieve prototypes werken

**Gebruik:**
```html
<button class="btn btn-secondary figma-embed" 
        data-figma-embed="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/abc123/My-Design" 
        data-title="My Design">
    <i data-feather="eye"></i>
    Preview
</button>
```

---

### 3. **Screenshot met Link** (Alternatief)

Als je geen embed wilt, gebruik een screenshot:

```html
<div class="project-card" data-category="design">
    <div class="project-image">
        <img src="img/figma-screenshot.png" alt="Design Preview">
        <div class="project-overlay">
            <div class="project-actions">
                <a href="https://www.figma.com/file/abc123/My-Design" 
                   target="_blank" 
                   class="btn btn-primary">
                    <i data-feather="external-link"></i>
                    View in Figma
                </a>
            </div>
        </div>
    </div>
    <!-- Rest van project content -->
</div>
```

---

## 🔧 Configuratie Stappen

### Stap 1: Update HTML

1. Open `public/index.html`
2. Zoek het Figma project template (regel ~302)
3. Vervang de placeholder URLs met je eigen URLs
4. Update project naam en beschrijving

### Stap 2: Test Lokaal

```bash
# Start development server
vercel dev

# Of gebruik een andere local server
npx serve public
```

Bezoek: `http://localhost:3000`

### Stap 3: Test de Buttons

1. **Test "View in Figma"** button:
   - Moet Figma openen in nieuwe tab
   - Moet je design tonen
   - Moet viewable zijn (niet private)

2. **Test "Preview"** button:
   - Moet modal openen
   - Moet Figma embed laden
   - Moet interactief zijn

### Stap 4: Deploy

```bash
vercel --prod
```

---

## 🎨 Styling Aanpassen

### Figma Icon Kleur Aanpassen

In `public/css/styles.css`:

```css
.figma-icon svg path {
    /* Verander fill kleuren */
    fill: #YOUR_COLOR;
}
```

### Figma Card Achtergrond

```css
.project-card.figma-project .project-image {
    background: linear-gradient(135deg, #f6f5f3 0%, #ffffff 100%);
    /* Pas gradient aan naar jouw voorkeur */
}
```

### Animatie Snelheid

```css
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px); /* Verander voor meer/minder beweging */
    }
}
```

---

## 📊 Analytics Tracking

De Figma integratie tracked automatisch:

- **Figma View Clicks**: Wanneer iemand "View in Figma" klikt
- **Figma Embed Views**: Wanneer iemand "Preview" klikt

Bekijk analytics in Vercel Dashboard → Analytics → Events

---

## 🐛 Troubleshooting

### Probleem: "Figma URL not configured yet" alert

**Oplossing:**
- Vervang `YOUR_FIGMA_URL_HERE` met je echte Figma URL
- Zorg dat de URL begint met `https://www.figma.com/file/`

---

### Probleem: Figma embed laadt niet

**Mogelijke oorzaken:**

1. **Figma bestand is private**
   - Oplossing: Zet sharing op "Anyone with the link can view"

2. **Verkeerde embed URL**
   - Oplossing: Gebruik het juiste embed formaat:
     ```
     https://www.figma.com/embed?embed_host=share&url=JOUW_URL
     ```

3. **Browser blokkeert iframe**
   - Oplossing: Check browser console voor errors
   - Sommige browsers blokkeren third-party iframes

---

### Probleem: Figma opent niet in nieuwe tab

**Oplossing:**
- Check of popup blocker actief is
- Zorg dat URL correct is
- Test in incognito mode

---

## 💡 Best Practices

### 1. **Maak je Figma bestand publiek viewable**

```
Share → Anyone with the link → Can view
```

### 2. **Gebruik duidelijke namen**

```html
data-title="E-commerce App Design"  ✅
data-title="Design Project"         ❌
```

### 3. **Voeg relevante tags toe**

```html
<span class="tag">Figma</span>
<span class="tag">UI/UX</span>
<span class="tag">Mobile Design</span>
<span class="tag">Prototyping</span>
```

### 4. **Update project stats**

```html
<div class="stat">
    <i data-feather="layers"></i>
    <span>50+ Components</span>  <!-- Pas aan -->
</div>
<div class="stat">
    <i data-feather="users"></i>
    <span>3 Collaborators</span>  <!-- Voeg toe -->
</div>
```

---

## 🎯 Voorbeelden

### Voorbeeld 1: Mobile App Design

```html
<button class="btn btn-primary figma-view" 
        data-figma-url="https://www.figma.com/file/abc123/Mobile-App-Design" 
        data-title="Mobile App Design">
    <i data-feather="figma"></i>
    View in Figma
</button>
```

### Voorbeeld 2: Design System

```html
<button class="btn btn-secondary figma-embed" 
        data-figma-embed="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/xyz789/Design-System" 
        data-title="Design System">
    <i data-feather="eye"></i>
    Preview
</button>
```

### Voorbeeld 3: Website Redesign

```html
<div class="project-card figma-project" data-category="design web">
    <div class="project-image">
        <div class="figma-preview">
            <div class="figma-icon">
                <!-- Figma SVG icon -->
            </div>
            <p class="figma-label">Website Redesign</p>
        </div>
        <div class="project-overlay">
            <div class="project-actions">
                <button class="btn btn-primary figma-view" 
                        data-figma-url="https://www.figma.com/file/redesign123/Website-Redesign" 
                        data-title="Website Redesign">
                    <i data-feather="figma"></i>
                    View in Figma
                </button>
                <button class="btn btn-secondary figma-embed" 
                        data-figma-embed="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/redesign123/Website-Redesign" 
                        data-title="Website Redesign">
                    <i data-feather="eye"></i>
                    Preview
                </button>
            </div>
        </div>
    </div>
    <div class="project-content">
        <div class="project-header">
            <h3>E-commerce Website Redesign</h3>
            <div class="project-status">
                <span class="status-badge design">Figma</span>
            </div>
        </div>
        <p>Complete redesign of an e-commerce platform focusing on user experience, conversion optimization, and modern aesthetics.</p>
        <div class="project-tags">
            <span class="tag">Figma</span>
            <span class="tag">UI/UX</span>
            <span class="tag">E-commerce</span>
            <span class="tag">Responsive</span>
        </div>
        <div class="project-stats">
            <div class="stat">
                <i data-feather="layout"></i>
                <span>25+ Screens</span>
            </div>
            <div class="stat">
                <i data-feather="smartphone"></i>
                <span>Mobile First</span>
            </div>
        </div>
    </div>
</div>
```

---

## 📱 Responsive Design

De Figma projecten zijn volledig responsive:

- **Desktop**: Volledige preview met beide buttons
- **Tablet**: Aangepaste layout
- **Mobile**: Gestapelde buttons, geoptimaliseerde weergave

---

## 🔐 Privacy & Sharing

### Aanbevolen Figma Instellingen:

1. **Sharing**: "Anyone with the link can view"
2. **Comments**: Optioneel - "Anyone can comment" of "Only invited people"
3. **Duplicate**: Optioneel - "Allow viewers to copy"

### Wat NIET te doen:

- ❌ Private bestanden delen (niemand kan ze zien)
- ❌ "Edit" permissies geven aan publiek
- ❌ Gevoelige client informatie in publieke designs

---

## 🚀 Geavanceerde Features

### 1. Specifieke Frame Embedden

Embed een specifiek frame in plaats van het hele bestand:

```
https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/abc123/Design?node-id=1:2
```

### 2. Prototype Mode

Toon je prototype in plaats van design mode:

```
https://www.figma.com/proto/abc123/Design?node-id=1:2&scaling=scale-down
```

### 3. Meerdere Figma Bestanden

Voeg meerdere Figma projecten toe door het template te dupliceren:

```html
<!-- Figma Project 1 -->
<div class="project-card figma-project" data-category="design">
    <!-- ... -->
</div>

<!-- Figma Project 2 -->
<div class="project-card figma-project" data-category="design">
    <!-- ... -->
</div>
```

---

## ✅ Checklist

Voordat je deploy:

- [ ] Figma bestand is publiek viewable
- [ ] Beide URLs zijn correct ingevuld
- [ ] Project naam en beschrijving zijn aangepast
- [ ] Tags zijn relevant
- [ ] Lokaal getest (beide buttons werken)
- [ ] Analytics tracking werkt
- [ ] Responsive design getest
- [ ] Browser console heeft geen errors

---

## 📞 Hulp Nodig?

### Quick Checks:

1. **Test Figma URL**:
   - Open URL in incognito browser
   - Moet zichtbaar zijn zonder in te loggen

2. **Test Embed URL**:
   - Plak in browser
   - Moet Figma embed tonen

3. **Check Console**:
   - F12 → Console
   - Zoek naar errors

---

## 🎊 Klaar!

Je Figma projecten zijn nu geïntegreerd in je portfolio! 

**Volgende stappen:**
1. Voeg meer Figma projecten toe
2. Deel je portfolio met potentiële klanten
3. Monitor analytics om te zien welke designs populair zijn

---

**Laatste Update**: December 2024  
**Versie**: 1.0  
**Status**: Productie-klaar ✅
