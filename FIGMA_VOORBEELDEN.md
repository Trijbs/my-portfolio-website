# 🎨 Figma Integratie - Voorbeelden

## 📸 Hoe Het Eruit Ziet

### Desktop View

```
┌─────────────────────────────────────────────────────────────┐
│                    🎨 Figma Design Project                   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │              [Figma Icon - Animated]               │    │
│  │                                                     │    │
│  │                  Figma Design                      │    │
│  │                                                     │    │
│  │  ┌──────────────────┐  ┌──────────────────┐      │    │
│  │  │ 🔗 View in Figma │  │ 👁️  Preview      │      │    │
│  │  └──────────────────┘  └──────────────────┘      │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  UI/UX Design System                          [Figma]       │
│                                                              │
│  A comprehensive design system featuring modern UI          │
│  components, color palettes, and interactive prototypes.    │
│                                                              │
│  [Figma] [UI/UX] [Design System] [Prototyping]             │
│                                                              │
│  📊 50+ Components    🎨 Design System                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Verschillende Project Types

### 1. Mobile App Design

```html
<div class="project-card figma-project" data-category="design mobile">
    <div class="project-content">
        <h3>Food Delivery App</h3>
        <p>Modern mobile app design with intuitive navigation and smooth animations.</p>
        <div class="project-tags">
            <span class="tag">Figma</span>
            <span class="tag">Mobile UI</span>
            <span class="tag">iOS</span>
            <span class="tag">Android</span>
        </div>
        <div class="project-stats">
            <div class="stat">
                <i data-feather="smartphone"></i>
                <span>15 Screens</span>
            </div>
            <div class="stat">
                <i data-feather="zap"></i>
                <span>Interactive</span>
            </div>
        </div>
    </div>
</div>
```

**Resultaat:**
```
┌────────────────────────────────┐
│  Food Delivery App    [Figma]  │
│                                 │
│  Modern mobile app design with  │
│  intuitive navigation...        │
│                                 │
│  [Figma] [Mobile UI] [iOS]     │
│  [Android]                      │
│                                 │
│  📱 15 Screens  ⚡ Interactive  │
└────────────────────────────────┘
```

---

### 2. Website Redesign

```html
<div class="project-card figma-project" data-category="design web">
    <div class="project-content">
        <h3>E-commerce Redesign</h3>
        <p>Complete redesign focusing on conversion optimization and modern aesthetics.</p>
        <div class="project-tags">
            <span class="tag">Figma</span>
            <span class="tag">Web Design</span>
            <span class="tag">E-commerce</span>
            <span class="tag">Responsive</span>
        </div>
        <div class="project-stats">
            <div class="stat">
                <i data-feather="layout"></i>
                <span>25+ Pages</span>
            </div>
            <div class="stat">
                <i data-feather="trending-up"></i>
                <span>+40% Conversion</span>
            </div>
        </div>
    </div>
</div>
```

**Resultaat:**
```
┌────────────────────────────────┐
│  E-commerce Redesign  [Figma]  │
│                                 │
│  Complete redesign focusing on  │
│  conversion optimization...     │
│                                 │
│  [Figma] [Web Design]          │
│  [E-commerce] [Responsive]     │
│                                 │
│  📐 25+ Pages  📈 +40% Conv.   │
└────────────────────────────────┘
```

---

### 3. Design System

```html
<div class="project-card figma-project" data-category="design">
    <div class="project-content">
        <h3>Component Library</h3>
        <p>Comprehensive design system with reusable components and documentation.</p>
        <div class="project-tags">
            <span class="tag">Figma</span>
            <span class="tag">Design System</span>
            <span class="tag">Components</span>
            <span class="tag">Documentation</span>
        </div>
        <div class="project-stats">
            <div class="stat">
                <i data-feather="layers"></i>
                <span>100+ Components</span>
            </div>
            <div class="stat">
                <i data-feather="book"></i>
                <span>Full Docs</span>
            </div>
        </div>
    </div>
</div>
```

**Resultaat:**
```
┌────────────────────────────────┐
│  Component Library    [Figma]  │
│                                 │
│  Comprehensive design system    │
│  with reusable components...    │
│                                 │
│  [Figma] [Design System]       │
│  [Components] [Documentation]  │
│                                 │
│  📚 100+ Comp.  📖 Full Docs   │
└────────────────────────────────┘
```

---

### 4. Brand Identity

```html
<div class="project-card figma-project" data-category="design creative">
    <div class="project-content">
        <h3>Brand Identity Kit</h3>
        <p>Complete brand identity including logo, colors, typography, and guidelines.</p>
        <div class="project-tags">
            <span class="tag">Figma</span>
            <span class="tag">Branding</span>
            <span class="tag">Logo Design</span>
            <span class="tag">Style Guide</span>
        </div>
        <div class="project-stats">
            <div class="stat">
                <i data-feather="palette"></i>
                <span>Full Brand Kit</span>
            </div>
            <div class="stat">
                <i data-feather="file-text"></i>
                <span>Guidelines</span>
            </div>
        </div>
    </div>
</div>
```

**Resultaat:**
```
┌────────────────────────────────┐
│  Brand Identity Kit   [Figma]  │
│                                 │
│  Complete brand identity        │
│  including logo, colors...      │
│                                 │
│  [Figma] [Branding]            │
│  [Logo Design] [Style Guide]   │
│                                 │
│  🎨 Full Kit  📄 Guidelines    │
└────────────────────────────────┘
```

---

## 🎨 Badge Kleuren

De Figma badge heeft een speciale gradient:

```css
.status-badge.design {
  background: linear-gradient(135deg, 
    #F24E1E 0%,    /* Rood */
    #A259FF 50%,   /* Paars */
    #1ABCFE 100%   /* Blauw */
  );
  color: white;
}
```

**Visueel:**
```
┌──────────┐
│  Figma   │  ← Gradient: Rood → Paars → Blauw
└──────────┘
```

---

## 🔄 Animaties

### Figma Icon Float Animatie

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

**Effect:**
```
    ↑
   [🎨]  ← Icon beweegt zacht op en neer
    ↓
```

---

## 📱 Responsive Layouts

### Desktop (> 1024px)
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Project 1  │  │  Project 2  │  │  Project 3  │
│   (Figma)   │  │   (Web)     │  │  (Mobile)   │
└─────────────┘  └─────────────┘  └─────────────┘
```

### Tablet (768px - 1024px)
```
┌─────────────┐  ┌─────────────┐
│  Project 1  │  │  Project 2  │
│   (Figma)   │  │   (Web)     │
└─────────────┘  └─────────────┘

┌─────────────┐
│  Project 3  │
│  (Mobile)   │
└─────────────┘
```

### Mobile (< 768px)
```
┌─────────────┐
│  Project 1  │
│   (Figma)   │
└─────────────┘

┌─────────────┐
│  Project 2  │
│   (Web)     │
└─────────────┘

┌─────────────┐
│  Project 3  │
│  (Mobile)   │
└─────────────┘
```

---

## 🎯 Filter Functionaliteit

### Filter Buttons
```
┌────┐ ┌─────┐ ┌──────────┐ ┌────────┐ ┌──────────┐
│All │ │ Web │ │E-commerce│ │ Design │ │ Creative │
└────┘ └─────┘ └──────────┘ └────────┘ └──────────┘
  ↓
Click "Design" →
  ↓
Toont alleen Figma projecten
```

---

## 🎬 Modal Preview

Wanneer je op "Preview" klikt:

```
┌─────────────────────────────────────────────────────┐
│  ✕  Mijn Design Project                             │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │                                             │    │
│  │         [Figma Embed Iframe]               │    │
│  │                                             │    │
│  │  • Interactief                             │    │
│  │  • Zoom in/out                             │    │
│  │  • Navigeer tussen frames                  │    │
│  │  • Bekijk prototypes                       │    │
│  │                                             │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  [🔗 Open in Figma]                                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 💡 Gebruik Cases

### 1. Portfolio Showcase
```
Toon je beste designs aan potentiële klanten
↓
Gebruik "Preview" voor snelle indruk
↓
"View in Figma" voor gedetailleerde review
```

### 2. Client Presentations
```
Presenteer designs tijdens meetings
↓
Gebruik embed voor live demo
↓
Clients kunnen direct feedback geven
```

### 3. Design Process
```
Toon verschillende iteraties
↓
Meerdere Figma projecten per case study
↓
Laat design evolutie zien
```

---

## 🎨 Customization Voorbeelden

### Custom Kleuren

```css
/* Verander Figma badge kleur */
.status-badge.design {
  background: linear-gradient(135deg, 
    #YOUR_COLOR_1 0%,
    #YOUR_COLOR_2 50%,
    #YOUR_COLOR_3 100%
  );
}
```

### Custom Icon

```html
<!-- Vervang Figma icon met eigen icon -->
<div class="figma-icon">
  <img src="img/custom-icon.svg" alt="Design" width="60" height="60">
</div>
```

### Custom Stats

```html
<div class="project-stats">
  <div class="stat">
    <i data-feather="users"></i>
    <span>3 Designers</span>
  </div>
  <div class="stat">
    <i data-feather="clock"></i>
    <span>2 Weeks</span>
  </div>
  <div class="stat">
    <i data-feather="award"></i>
    <span>Award Winner</span>
  </div>
</div>
```

---

## 📊 Analytics Events

Automatisch getrackte events:

```javascript
// Wanneer "View in Figma" wordt geklikt
{
  event: 'figma_view',
  title: 'UI/UX Design System',
  url: 'https://www.figma.com/file/...'
}

// Wanneer "Preview" wordt geklikt
{
  event: 'figma_embed_view',
  title: 'UI/UX Design System',
  url: 'https://www.figma.com/embed?...'
}
```

**Bekijk in Vercel:**
```
Dashboard → Analytics → Events → Filter: "figma"
```

---

## 🎯 Best Practices Voorbeelden

### ✅ Goed

```html
<!-- Duidelijke naam -->
<h3>E-commerce Mobile App Design</h3>

<!-- Specifieke beschrijving -->
<p>iOS and Android app design for fashion e-commerce platform with AR try-on feature.</p>

<!-- Relevante tags -->
<span class="tag">Figma</span>
<span class="tag">Mobile UI</span>
<span class="tag">E-commerce</span>
<span class="tag">AR</span>

<!-- Concrete stats -->
<span>20 Screens</span>
<span>iOS & Android</span>
```

### ❌ Vermijd

```html
<!-- Vage naam -->
<h3>Design Project</h3>

<!-- Algemene beschrijving -->
<p>A design I made.</p>

<!-- Generieke tags -->
<span class="tag">Design</span>
<span class="tag">Project</span>

<!-- Vage stats -->
<span>Some screens</span>
<span>Mobile</span>
```

---

## 🚀 Deployment Checklist

Voordat je live gaat:

```
✅ Figma URLs ingevuld
✅ Project namen aangepast
✅ Beschrijvingen geschreven
✅ Tags toegevoegd
✅ Stats aangepast
✅ Lokaal getest
✅ Beide buttons werken
✅ Modal werkt
✅ Responsive getest
✅ Analytics werkt
✅ Geen console errors
✅ Figma bestanden zijn publiek
```

---

## 🎊 Resultaat

Na implementatie heb je:

- ✅ Professionele Figma integratie
- ✅ Twee manieren om designs te bekijken
- ✅ Mooie animaties en effecten
- ✅ Volledig responsive
- ✅ Analytics tracking
- ✅ Filter functionaliteit
- ✅ Modal preview systeem

**Je portfolio ziet er nu uit als een professioneel design portfolio!** 🎨

---

**Veel succes met je Figma projecten!** 🚀
