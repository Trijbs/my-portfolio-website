// Main JavaScript functionality
// Combines functionality for improved user experience

// Project details data
const projectDetails = {
    'urban-unleashed': {
        title: 'Urban Unleashed',
        fullDescription: `
            <p><strong>Urban Unleashed</strong> is an interface-led landing page concept where visual atmosphere, motion, and interaction work together. The project is less about showing raw technology and more about how a bold digital first impression can still feel usable.</p>
            <h4>What the project is showing</h4>
            <ul>
                <li><strong>Landing-page composition:</strong> Hero framing, visual focus, and a strong first-screen impact</li>
                <li><strong>Immersive interface thinking:</strong> Motion and 3D styling used to support the brand feel instead of overwhelming it</li>
                <li><strong>Responsive execution:</strong> The concept is built to stay visually coherent across screen sizes</li>
            </ul>
        `,
        technologies: ['Next.js', 'Three.js', 'WebGL', 'React', 'Creative Coding'],
        liveUrl: 'https://urban-unleashed.vercel.app',
        media: [
            { type: 'image', src: 'img/urban-unleashed-cover.jpg', alt: 'Urban Unleashed homescreen concept', caption: 'Lead interface screen', frame: 'wide' }
        ],
        collections: [
            {
                title: 'Lead Interface',
                description: 'The main homescreen composition used to introduce the project.',
                media: [
                    { type: 'image', src: 'img/urban-unleashed-cover.jpg', alt: 'Urban Unleashed lead screen', caption: 'Immersive landing page concept', frame: 'wide' }
                ]
            }
        ]
    },
    'popfusion': {
        title: 'PopFusion',
        fullDescription: `
            <p><strong>PopFusion</strong> is an experimental music visualizer built as an expressive web interface. The goal is to make sound feel visual without losing control, readability, or interaction clarity.</p>
            <h4>What the project is showing</h4>
            <ul>
                <li><strong>Audio-reactive behavior:</strong> Motion and visuals respond to sound input</li>
                <li><strong>Expressive UI:</strong> Interface elements feel energetic without turning chaotic</li>
                <li><strong>Creative coding:</strong> The project sits between visual experimentation and front-end interaction design</li>
            </ul>
        `,
        technologies: ['React', 'Web Audio API', 'Canvas', 'Motion Design', 'Creative Coding'],
        liveUrl: 'https://trijbs.eu/PopFusion2/',
        media: [
            { type: 'image', src: 'img/popfusion-cover.jpg', alt: 'PopFusion music visualizer preview', caption: 'Experimental music interface', frame: 'wide' }
        ],
        collections: [
            {
                title: 'Screen Preview',
                description: 'A cover image showing the visual tone of the interface.',
                media: [
                    { type: 'image', src: 'img/popfusion-cover.jpg', alt: 'PopFusion screen preview', caption: 'Audio-reactive visualizer layout', frame: 'wide' }
                ]
            }
        ]
    },
    'webshop': {
        title: 'E-commerce Platform',
        fullDescription: `
            <p><strong>E-commerce Platform</strong> is a webshop concept focused on product visibility, conversion hierarchy, and a smoother browsing-to-checkout flow. The project is included here as interface work rather than as a full technical case study.</p>
            <h4>What the project is showing</h4>
            <ul>
                <li><strong>Product-first layout:</strong> Product imagery and calls-to-action stay visually clear</li>
                <li><strong>Usability:</strong> Navigation, listing, and purchase flow are designed to feel direct and trustworthy</li>
                <li><strong>Consistency:</strong> Repeated UI patterns help the store feel stable across sections</li>
            </ul>
        `,
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'E-commerce UI'],
        liveUrl: 'https://trijbs.eu/Webshop/',
        media: [
            { type: 'image', src: 'img/Webshop.webp', alt: 'Webshop homepage preview', caption: 'Conversion-focused storefront concept', frame: 'wide' }
        ],
        collections: [
            {
                title: 'Storefront Preview',
                description: 'A screen capture of the main webshop interface.',
                media: [
                    { type: 'image', src: 'img/Webshop.webp', alt: 'Webshop preview image', caption: 'Product-led e-commerce layout', frame: 'wide' }
                ]
            }
        ]
    },
    'motion-design-studies': {
        title: 'Motion Design Studies',
        fullDescription: `
            <p><strong>Motion Design Studies</strong> groups the moving-image work in the portfolio into one clearer collection. Instead of showing a single MP4 as a standalone card, this archive presents the motion pieces as related studies in pacing, information design, and editing.</p>
            <h4>Included work</h4>
            <ul>
                <li><strong>Animated infographic:</strong> Motion used to guide the viewer through information with clear timing and contrast</li>
                <li><strong>Editing remake:</strong> A separate video study focused on rhythm, transitions, and timing choices</li>
            </ul>
        `,
        technologies: ['Motion Design', 'Video Editing', 'Animation', 'Information Design'],
        media: [
            { type: 'video', src: 'videos/archive/infographic.mp4', poster: 'img/archive/infographic-poster.png', alt: 'Animated infographic preview', caption: 'Animated infographic preview', frame: 'wide' }
        ],
        collections: [
            {
                title: 'Animated Infographic',
                description: 'A motion-led piece where timing, contrast, and sequencing are used to explain information clearly.',
                media: [
                    { type: 'video', src: 'videos/archive/infographic.mp4', poster: 'img/archive/infographic-poster.png', alt: 'Animated infographic video', caption: 'Motion-driven infographic piece', frame: 'wide' }
                ]
            },
            {
                title: 'Editing Remake Study',
                description: 'A separate editing project focused on pacing, transitions, and visual rhythm.',
                media: [
                    { type: 'video', src: 'videos/archive/motion-remake.mp4', poster: 'img/archive/motion-remake-poster.png', alt: 'Editing remake study video', caption: 'Editing and pacing study', frame: 'wide' }
                ]
            }
        ]
    },
    'northface-campaign': {
        title: 'The North Face Digital Campaign',
        fullDescription: `
            <p><strong>The North Face Digital Campaign</strong> is shown here as a focused interface rollout rather than a mixed archive. The project is strongest as a set of mobile screens and CRM-style touchpoints built around product visibility, promotional hierarchy, and a consistent retail look.</p>
            <h4>Why the work belongs together</h4>
            <ul>
                <li><strong>Retail consistency:</strong> Product promotion, navigation, and campaign messaging keep the same brand direction throughout the set</li>
                <li><strong>Mobile-first layout:</strong> The strongest assets focus on phone-sized screens, product grids, and supporting campaign pages</li>
                <li><strong>CRM support:</strong> The email piece shows how the same campaign language carries into a direct customer touchpoint</li>
            </ul>
        `,
        technologies: ['UI Design', 'Mobile Campaign Screens', 'CRM Design', 'Retail Layout', 'Campaign Art Direction'],
        media: [
            { type: 'image', src: 'img/archive/northface/mobile-01.jpg', alt: 'The North Face campaign homescreen concept', caption: 'Campaign homescreen concept', frame: 'portrait' }
        ],
        collections: [
            {
                title: 'Mobile Campaign Screens',
                description: 'The mobile views that carry the campaign through product promotion, brand storytelling, and supporting utility screens.',
                media: [
                    { type: 'image', src: 'img/archive/northface/mobile-01.jpg', alt: 'North Face mobile concept 1', caption: 'Mobile concept 01', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/northface/mobile-02.jpg', alt: 'North Face mobile concept 2', caption: 'Mobile concept 02', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/northface/mobile-03.jpg', alt: 'North Face mobile concept 3', caption: 'Mobile concept 03', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/northface/mobile-04.jpg', alt: 'North Face mobile concept 4', caption: 'Mobile concept 04', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/northface/mobile-05.svg', alt: 'North Face mobile concept 5', caption: 'Mobile concept 05', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/northface/mobile-06.svg', alt: 'North Face mobile concept 6', caption: 'Mobile concept 06', frame: 'portrait' }
                ]
            },
            {
                title: 'CRM Email Touchpoint',
                description: 'A supporting email layout that adapts the campaign into a more direct product and update channel.',
                media: [
                    { type: 'image', src: 'img/archive/northface/email.jpg', alt: 'North Face email concept', caption: 'Direct email design', frame: 'portrait' }
                ]
            }
        ]
    },
    'research-concept-boards': {
        title: 'Research & Concept Boards',
        fullDescription: `
            <p><strong>Research & Concept Boards</strong> collects the work that happens before a final deliverable is locked. These pieces show how references, collage, and typography experiments help shape a clearer visual direction.</p>
            <h4>Why the work belongs together</h4>
            <ul>
                <li><strong>Early-stage thinking:</strong> These files support decision-making before final design execution</li>
                <li><strong>Visual direction:</strong> They establish tone, references, and possible styling routes</li>
                <li><strong>Concept development:</strong> They make the creative process visible, not just the final output</li>
            </ul>
        `,
        technologies: ['Research Boards', 'Collage', 'Typography', 'Concept Development', 'Art Direction'],
        media: [
            { type: 'image', src: 'img/archive/research-boards/alternative-typo.jpg', alt: 'Alternative typography concept board', caption: 'Typography-led concept board', frame: 'portrait' }
        ],
        collections: [
            {
                title: 'Research Boards',
                description: 'Reference-heavy visual studies used to shape tone and direction.',
                media: [
                    { type: 'image', src: 'img/archive/research-boards/alternative-typo.jpg', alt: 'Alternative typography collage', caption: 'Typography collage experiment', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/research-boards/balenciaga.jpg', alt: 'Balenciaga research board', caption: 'Fashion and campaign reference board', frame: 'wide' },
                ]
            }
        ]
    },
    'hidden-realms-fest': {
        title: 'Hidden Realms Fest',
        fullDescription: `
            <p><strong>Hidden Realms Fest</strong> is the separate festival project that was previously mixed into the North Face archive. It works best as one event-world collection: identity boards, social launch assets, and motion teasers all built around the same festival look and tone.</p>
            <h4>Why the work belongs together</h4>
            <ul>
                <li><strong>Identity planning:</strong> The moodboard and style sheet define the atmosphere before the launch assets appear</li>
                <li><strong>Campaign rollout:</strong> Social posts and motion teasers extend the same identity into promotional formats</li>
                <li><strong>Event-world consistency:</strong> Typography, color, and imagery stay connected across still and moving pieces</li>
            </ul>
        `,
        technologies: ['Festival Branding', 'Art Direction', 'Social Campaign Design', 'Motion Design', 'Identity Boards'],
        media: [
            { type: 'image', src: 'img/archive/northface-mobile-1.svg', alt: 'Hidden Realms Fest mobile concept preview', caption: 'Festival landing concept', frame: 'portrait' }
        ],
        collections: [
            {
                title: 'Identity Boards',
                description: 'The concept boards used to define the festival atmosphere, type direction, and visual language.',
                media: [
                    { type: 'image', src: 'img/archive/festival-identity/moodboard.jpg', alt: 'Hidden Realms Fest moodboard', caption: 'Moodboard', frame: 'wide' },
                    { type: 'image', src: 'img/archive/festival-identity/style-sheet.jpg', alt: 'Hidden Realms Fest style sheet', caption: 'Style sheet', frame: 'portrait' }
                ]
            },
            {
                title: 'Social Launch Assets',
                description: 'Mobile-first festival touchpoints and social announcements used to preview the event world before launch.',
                media: [
                    { type: 'image', src: 'img/archive/northface-mobile-1.svg', alt: 'Hidden Realms Fest landing page concept', caption: 'Festival landing concept', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/northface-home.svg', alt: 'Hidden Realms Fest TikTok announcement screen', caption: 'TikTok announcement screen', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/northface/instagram.jpg', alt: 'Hidden Realms Fest Instagram campaign post', caption: 'Instagram line-up post', frame: 'portrait' }
                ]
            },
            {
                title: 'Motion Teasers',
                description: 'Short-form motion pieces used to build anticipation around the festival launch.',
                media: [
                    { type: 'video', src: 'videos/archive/northface-teaser.mp4', poster: 'img/archive/festival-identity/teaser-poster.png', alt: 'Hidden Realms Fest teaser video', caption: 'Teaser video', frame: 'wide' },
                    { type: 'video', src: 'videos/archive/northface-tiktok.mp4', poster: 'img/archive/festival-identity/tiktok-poster.png', alt: 'Hidden Realms Fest TikTok teaser', caption: 'TikTok teaser', frame: 'portrait' },
                    { type: 'video', src: 'videos/archive/northface-text-logo.mp4', poster: 'img/archive/festival-identity/text-logo-poster.png', alt: 'Hidden Realms Fest text logo animation', caption: 'Text logo animation', frame: 'wide' }
                ]
            }
        ]
    },
    'editorial-booklets': {
        title: 'Editorial Layout Collection',
        fullDescription: `
            <p><strong>Editorial Layout Collection</strong> is organized as a set of browsable page sequences instead of a few loose cover images. That makes the editorial work read properly as pacing, page rhythm, hierarchy, and spread design.</p>
            <h4>Why the work belongs together</h4>
            <ul>
                <li><strong>Booklet thinking:</strong> The projects are meant to be read across multiple pages</li>
                <li><strong>Editorial rhythm:</strong> Typography, image placement, and white space change from spread to spread</li>
                <li><strong>Print structure:</strong> Each sequence shows how layout decisions build over time, not in isolation</li>
            </ul>
        `,
        technologies: ['Editorial Design', 'Booklet Layout', 'Typography', 'Print Composition', 'Page Rhythm'],
        media: [
            { type: 'image', src: 'img/archive/editorial-trends/trends-01.jpg', alt: '10 Trends of Graphic Design cover', caption: '10 Trends of Graphic Design', frame: 'portrait' }
        ],
        collections: [
            {
                title: '10 Trends of Graphic Design',
                description: 'A multi-page editorial project shown as a browsable sequence so the booklet reads like an actual publication.',
                media: [
                    { type: 'image', src: 'img/archive/editorial-trends/trends-01.jpg', alt: '10 Trends page 1', caption: 'Page 01', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/editorial-trends/trends-02.jpg', alt: '10 Trends page 2', caption: 'Page 02', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/editorial-trends/trends-03.jpg', alt: '10 Trends page 3', caption: 'Page 03', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/editorial-trends/trends-04.jpg', alt: '10 Trends page 4', caption: 'Page 04', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/editorial-trends/trends-05.jpg', alt: '10 Trends page 5', caption: 'Page 05', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/editorial-trends/trends-06.jpg', alt: '10 Trends page 6', caption: 'Page 06', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/editorial-trends/trends-07.jpg', alt: '10 Trends page 7', caption: 'Page 07', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/editorial-trends/trends-08.jpg', alt: '10 Trends page 8', caption: 'Page 08', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/editorial-trends/trends-09.jpg', alt: '10 Trends page 9', caption: 'Page 09', frame: 'portrait' }
                ]
            },
            {
                title: 'Eigen boekje',
                description: 'A second booklet sequence focused on spread rhythm, image placement, and typography across multiple pages.',
                media: [
                    { type: 'image', src: 'img/archive/editorial-booklet/booklet-01.jpg', alt: 'Eigen boekje spread 1', caption: 'Spread 01', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/editorial-booklet/booklet-02.jpg', alt: 'Eigen boekje spread 2', caption: 'Spread 02', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/editorial-booklet/booklet-03.jpg', alt: 'Eigen boekje spread 3', caption: 'Spread 03', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/editorial-booklet/booklet-04.jpg', alt: 'Eigen boekje spread 4', caption: 'Spread 04', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/editorial-booklet/booklet-05.jpg', alt: 'Eigen boekje spread 5', caption: 'Spread 05', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/editorial-booklet/booklet-06.jpg', alt: 'Eigen boekje spread 6', caption: 'Spread 06', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/editorial-booklet/booklet-07.jpg', alt: 'Eigen boekje spread 7', caption: 'Spread 07', frame: 'landscape' }
                ]
            }
        ]
    },
    'poster-series': {
        title: 'Poster Collection',
        fullDescription: `
            <p><strong>Poster Collection</strong> brings the poster work together as one graphic exploration set. The files vary in subject, but the shared goal is the same: strong single-frame impact, readable hierarchy, and deliberate image treatment.</p>
            <h4>Why the work belongs together</h4>
            <ul>
                <li><strong>One-frame communication:</strong> Each piece has to land quickly</li>
                <li><strong>Graphic experimentation:</strong> Color, contrast, and editing changes are part of the process</li>
                <li><strong>Print-led visuals:</strong> Typography and imagery are combined as one poster system</li>
            </ul>
        `,
        technologies: ['Poster Design', 'Image Treatment', 'Typography', 'Composition', 'Print Visuals'],
        media: [
            { type: 'image', src: 'img/archive/posters/poster-bowie.jpg', alt: 'David Bowie poster', caption: 'David Bowie poster', frame: 'portrait' }
        ],
        collections: [
            {
                title: 'Poster Series',
                description: 'A grouped set of poster experiments, from music posters to image-treatment studies.',
                media: [
                    { type: 'image', src: 'img/archive/posters/poster-bowie.jpg', alt: 'David Bowie poster', caption: 'David Bowie poster', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/posters/poster-01-original.jpg', alt: 'Poster original version', caption: 'Original version', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/posters/poster-02-tone.jpg', alt: 'Poster tone adjustment', caption: 'Tone adjustment', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/posters/poster-03-contrast.jpg', alt: 'Poster contrast study', caption: 'Contrast study', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/posters/poster-04-mix.jpg', alt: 'Poster color mix study', caption: 'Two-color mix', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/posters/poster-05-door.jpg', alt: 'Poster with door and sunlight', caption: 'Door & sunlight', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/posters/poster-06-glass.jpg', alt: 'Glass poster study', caption: 'Glass study', frame: 'portrait' }
                ]
            }
        ]
    },
    'event-promo-pack': {
        title: 'Event Identity Kit',
        fullDescription: `
            <p><strong>Event Identity Kit</strong> groups the event flyers and tickets into one identity system. Shown together, they communicate much better than separate files because the consistency between awareness and attendance materials becomes visible.</p>
            <h4>Why the work belongs together</h4>
            <ul>
                <li><strong>Shared event language:</strong> Flyers and tickets use the same visual voice</li>
                <li><strong>Touchpoint consistency:</strong> Promotion and on-entry materials feel connected</li>
                <li><strong>Campaign logic:</strong> The set works as one announcement-to-attendance flow</li>
            </ul>
        `,
        technologies: ['Event Design', 'Flyers', 'Ticket Design', 'Print Promotion', 'Identity System'],
        media: [
            { type: 'image', src: 'img/archive/event-kit/flyer-01.jpg', alt: 'Event flyer', caption: 'Flyer 01', frame: 'portrait' }
        ],
        collections: [
            {
                title: 'Event Assets',
                description: 'Flyers and tickets grouped as one event identity instead of standalone prints.',
                media: [
                    { type: 'image', src: 'img/archive/event-kit/flyer-01.jpg', alt: 'Event flyer 1', caption: 'Flyer 01', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/event-kit/flyer-02.jpg', alt: 'Event flyer 2', caption: 'Flyer 02', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/event-kit/ticket-01.jpg', alt: 'Event ticket 1', caption: 'Ticket 01', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/event-kit/ticket-02.jpg', alt: 'Event ticket 2', caption: 'Ticket 02', frame: 'landscape' }
                ]
            }
        ]
    },
    'menu-design-system': {
        title: 'Hospitality Menu System',
        fullDescription: `
            <p><strong>Hospitality Menu System</strong> is presented as a browsable set of pages so the structure of the menu can be read properly. The strength of this work is not one single page, but the consistency across the entire set.</p>
            <h4>Why the work belongs together</h4>
            <ul>
                <li><strong>System thinking:</strong> The menu works through repeated layout rules across categories</li>
                <li><strong>Readable hierarchy:</strong> Prices, headings, and descriptions stay clear throughout the set</li>
                <li><strong>Hospitality context:</strong> Decorative styling supports the brand without hurting clarity</li>
            </ul>
        `,
        technologies: ['Information Design', 'Menu Layout', 'Typography', 'Print Design', 'Hospitality'],
        media: [
            { type: 'image', src: 'img/archive/menu-system/menu-03.jpg', alt: 'Hospitality menu feature spread', caption: 'Feature menu spread', frame: 'landscape' }
        ],
        collections: [
            {
                title: 'Menu Pages',
                description: 'The full menu sequence grouped together as one hospitality print system.',
                media: [
                    { type: 'image', src: 'img/archive/menu-system/menu-01.jpg', alt: 'Menu page 1', caption: 'Page 01', frame: 'portrait' },
                    { type: 'image', src: 'img/archive/menu-system/menu-02.jpg', alt: 'Menu page 2', caption: 'Page 02', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/menu-system/menu-03.jpg', alt: 'Menu page 3', caption: 'Page 03', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/menu-system/menu-04.jpg', alt: 'Menu page 4', caption: 'Page 04', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/menu-system/menu-05.jpg', alt: 'Menu page 5', caption: 'Page 05', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/menu-system/menu-06.jpg', alt: 'Menu page 6', caption: 'Page 06', frame: 'portrait' }
                ]
            }
        ]
    },
    'photography-studies': {
        title: 'Product Styling Photo Series',
        fullDescription: `
            <p><strong>Product Styling Photo Series</strong> is grouped as a set of related image studies around one object family. The value is in seeing the different compositions, lighting moods, and framing decisions next to each other.</p>
            <h4>Why the work belongs together</h4>
            <ul>
                <li><strong>Object consistency:</strong> The same subject is explored in multiple visual treatments</li>
                <li><strong>Composition studies:</strong> Framing and styling are tested across the set</li>
                <li><strong>Presentation logic:</strong> The collage and the individual shots support each other</li>
            </ul>
        `,
        technologies: ['Photography', 'Product Styling', 'Composition', 'Collage', 'Art Direction'],
        media: [
            { type: 'image', src: 'img/archive/photo-series/photo-collage.jpg', alt: 'Photography collage overview', caption: 'Collage overview', frame: 'tall' }
        ],
        collections: [
            {
                title: 'Photo Series',
                description: 'The collage and the individual product studies grouped into one sequence.',
                media: [
                    { type: 'image', src: 'img/archive/photo-series/photo-01.jpg', alt: 'Product photo 1', caption: 'Lead styling shot', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/photo-series/photo-collage.jpg', alt: 'Photography collage', caption: 'Collage overview', frame: 'tall' },
                    { type: 'image', src: 'img/archive/photo-series/photo-02.jpg', alt: 'Product photo 2', caption: 'Photo 02', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/photo-series/photo-03.jpg', alt: 'Product photo 3', caption: 'Photo 03', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/photo-series/photo-04.jpg', alt: 'Product photo 4', caption: 'Photo 04', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/photo-series/photo-05.jpg', alt: 'Product photo 5', caption: 'Photo 05', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/photo-series/photo-06.jpg', alt: 'Product photo 6', caption: 'Photo 06', frame: 'landscape' },
                    { type: 'image', src: 'img/archive/photo-series/photo-07.jpg', alt: 'Product photo 7', caption: 'Photo 07', frame: 'landscape' }
                ]
            }
        ]
    }
};

// Escape HTML special characters in a string
function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function renderProjectMediaItem(item, projectTitle) {
    const frame = item.frame ? ` media-frame--${escapeHTML(item.frame)}` : '';
    const slideFrame = item.frame ? ` collection-slide--${escapeHTML(item.frame)}` : '';
    const caption = item.caption ? `<figcaption>${escapeHTML(item.caption)}</figcaption>` : '';

    if (item.type === 'video') {
        return `
            <figure class="collection-slide is-video${slideFrame}">
                <div class="collection-media${frame}">
                    <video controls preload="metadata" playsinline ${item.poster ? `poster="${escapeHTML(item.poster)}"` : ''}>
                        <source src="${escapeHTML(item.src)}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                ${caption}
            </figure>
        `;
    }

    const zoomLabel = escapeHTML(item.caption || item.alt || projectTitle);
    const imageAlt = escapeHTML(item.alt || projectTitle);

    return `
        <figure class="collection-slide${slideFrame}">
            <div class="collection-media${frame}">
                <button
                    class="media-zoom-trigger"
                    type="button"
                    data-zoom-src="${escapeHTML(item.src)}"
                    data-zoom-alt="${imageAlt}"
                    data-zoom-caption="${escapeHTML(item.caption || '')}"
                    aria-label="Open full image: ${zoomLabel}"
                >
                    <img src="${escapeHTML(item.src)}" alt="${imageAlt}" loading="lazy" decoding="async">
                    <span class="media-zoom-badge" aria-hidden="true">
                        <i data-feather="maximize-2"></i>
                    </span>
                </button>
            </div>
            ${caption}
        </figure>
    `;
}

function renderProjectOverview(project) {
    if (!Array.isArray(project.media) || !project.media.length) {
        return '';
    }

    const leadItem = project.media[0];
    const showcaseClasses = ['project-showcase'];
    if (leadItem.frame) {
        showcaseClasses.push(`project-showcase--${leadItem.frame}`);
    }
    if (Array.isArray(project.collections) && project.collections.length) {
        showcaseClasses.push('project-showcase--grouped');
    }
    const leadHint = leadItem.type === 'image'
        ? `
            <p class="project-showcase-note">
                <i data-feather="maximize-2"></i>
                <span>Tap or click the image to expand it.</span>
            </p>
        `
        : '';

    return `
        <section class="${showcaseClasses.join(' ')}">
            <div class="project-showcase-media">
                ${renderProjectMediaItem(leadItem, project.title)}
            </div>
            ${leadHint}
        </section>
    `;
}

function formatCollectionCount(value) {
    return String(value).padStart(2, '0');
}

function getCollectionSummary(collection) {
    const media = Array.isArray(collection.media) ? collection.media : [];
    const total = media.length;
    const videoCount = media.filter(item => item.type === 'video').length;
    const imageCount = total - videoCount;
    const portraitCount = media.filter(item => item.frame === 'portrait').length;
    const landscapeCount = media.filter(item => item.frame === 'landscape').length;
    const collectionText = `${collection.title || ''} ${collection.description || ''}`.toLowerCase();
    const looksLikeScreenSet = /screen|mobile|landing|roll-?out|email|social|campaign/.test(collectionText);
    const looksLikeBooklet = /book|booklet|page|spread|editorial|menu|trend|publication/.test(collectionText);

    let label = 'Curated set';
    let hint = 'Use the arrows or swipe through the sequence.';

    if (videoCount && imageCount) {
        label = 'Mixed media rollout';
        hint = 'Swipe through the collection and play the video pieces inline.';
    } else if (videoCount) {
        label = videoCount > 1 ? 'Motion sequence' : 'Motion preview';
        hint = 'Move through the clips and play each study directly in the slider.';
    } else if (looksLikeScreenSet && total >= 3) {
        label = 'Screen sequence';
        hint = 'Browse the screens to compare layout, hierarchy, and channel adaptation.';
    } else if (looksLikeBooklet) {
        label = 'Booklet flow';
        hint = 'Move through the pages in reading order like a booklet.';
    } else if (total >= 5 && portraitCount >= Math.ceil(total * 0.6)) {
        label = 'Portrait sequence';
        hint = 'Move through the full set to see how the visuals develop across formats.';
    } else if (total >= 4 && (landscapeCount >= Math.ceil(total * 0.6) || /spread/.test(collectionText))) {
        label = 'Spread sequence';
        hint = 'Slide across the spreads to review the full layout rhythm.';
    } else if (total >= 5) {
        label = 'Screen collection';
        hint = 'Browse the full set to see how the system develops across formats.';
    }

    const breakdownParts = [];
    if (imageCount) {
        breakdownParts.push(`${imageCount} ${imageCount === 1 ? 'image' : 'images'}`);
    }
    if (videoCount) {
        breakdownParts.push(`${videoCount} ${videoCount === 1 ? 'video' : 'videos'}`);
    }

    return {
        total,
        label,
        hint,
        interactionHint: imageCount && !videoCount
            ? (total > 1 ? 'Swipe to browse and tap any image to enlarge.' : 'Tap the image to enlarge it.')
            : '',
        breakdown: breakdownParts.join(' + ')
    };
}

function renderProjectCollection(collection, projectTitle, index) {
    const slides = collection.media.map(item => renderProjectMediaItem(item, projectTitle)).join('');
    const summary = getCollectionSummary(collection);

    return `
        <section class="media-collection" data-collection>
            <div class="collection-header">
                <div class="collection-heading">
                    <span class="collection-index">Collection ${index + 1}</span>
                    <h4>${escapeHTML(collection.title)}</h4>
                    <div class="collection-meta">
                        <span class="collection-pill collection-pill--accent">${escapeHTML(summary.label)}</span>
                        <span class="collection-pill">${formatCollectionCount(summary.total)} items</span>
                        ${summary.breakdown ? `<span class="collection-pill">${escapeHTML(summary.breakdown)}</span>` : ''}
                    </div>
                </div>
                <div class="collection-copy">
                    <p>${escapeHTML(collection.description || '')}</p>
                    <div class="collection-assist">
                        <div class="collection-assist-copy">
                            <span class="collection-hint">${escapeHTML(summary.hint)}</span>
                            ${summary.interactionHint ? `<span class="collection-interaction-hint">${escapeHTML(summary.interactionHint)}</span>` : ''}
                        </div>
                        <span class="collection-progress" data-carousel-progress aria-live="polite">01 / ${formatCollectionCount(summary.total)}</span>
                    </div>
                </div>
            </div>
            <div class="collection-carousel" data-carousel>
                <button class="carousel-nav carousel-nav-prev" type="button" aria-label="Previous items">
                    <i data-feather="arrow-left"></i>
                </button>
                <div class="carousel-viewport">
                    <div class="carousel-track" data-carousel-track>
                        ${slides}
                    </div>
                </div>
                <button class="carousel-nav carousel-nav-next" type="button" aria-label="Next items">
                    <i data-feather="arrow-right"></i>
                </button>
            </div>
        </section>
    `;
}

function getCarouselStep(track) {
    const firstSlide = track.querySelector('.collection-slide');
    if (!firstSlide) {
        return track.clientWidth * 0.85;
    }

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || '0');
    return firstSlide.getBoundingClientRect().width + gap;
}

function getCarouselIndex(track) {
    const slides = Array.from(track.querySelectorAll('.collection-slide'));
    if (!slides.length) {
        return 0;
    }

    const trackLeft = track.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
}

function updateCarouselState(track, prevButton, nextButton, progressElement) {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth - 4);
    prevButton.disabled = track.scrollLeft <= 4;
    nextButton.disabled = track.scrollLeft >= maxScroll;

    if (progressElement) {
        const total = track.querySelectorAll('.collection-slide').length;
        const current = total ? getCarouselIndex(track) + 1 : 0;
        progressElement.textContent = `${formatCollectionCount(current)} / ${formatCollectionCount(total)}`;
    }
}

function initializeCollectionCarousels(container) {
    const carousels = container.querySelectorAll('[data-carousel]');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('[data-carousel-track]');
        const prevButton = carousel.querySelector('.carousel-nav-prev');
        const nextButton = carousel.querySelector('.carousel-nav-next');
        const progressElement = carousel.closest('[data-collection]')?.querySelector('[data-carousel-progress]');

        if (!track || !prevButton || !nextButton) {
            return;
        }

        const scrollByStep = direction => {
            track.scrollBy({
                left: getCarouselStep(track) * direction,
                behavior: 'smooth'
            });
        };

        prevButton.addEventListener('click', () => scrollByStep(-1));
        nextButton.addEventListener('click', () => scrollByStep(1));

        const syncState = () => updateCarouselState(track, prevButton, nextButton, progressElement);

        track.addEventListener('scroll', syncState, { passive: true });
        window.addEventListener('resize', syncState);
        syncState();
    });
}

function pauseProjectDetailsMedia(modal) {
    if (!modal) return;
    modal.querySelectorAll('video').forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

function resetProjectDetailsScroll(modal, bodyElement) {
    if (!modal || !bodyElement) return;

    bodyElement.scrollTop = 0;
    bodyElement.scrollLeft = 0;
    modal.scrollTop = 0;
    modal.querySelector('.modal-content')?.scrollTo(0, 0);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // ===== Theme Toggle =====
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'poster' theme
    const currentTheme = localStorage.getItem('theme') || 'poster';
    html.setAttribute('data-theme', currentTheme);
    
    // Update theme icon
    function updateThemeIcon() {
        if (!themeToggle) return;
        const theme = html.getAttribute('data-theme');
        themeToggle.innerHTML = `<i data-feather="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    updateThemeIcon();
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'poster' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
            
            // Track theme change
            if (window.VercelAnalytics) {
                window.VercelAnalytics.trackThemeChange(newTheme);
            }
        });
    }
    
    // ===== Mobile Menu =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Update aria-expanded
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== Project Filtering =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('visible'), 10);
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.add('visible'), 10);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                }
            });
        });
    });
    
    // ===== Skill Bars Animation =====
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const skillObserver = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you would typically send this to your backend
            console.log('Newsletter signup:', email);
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }
    
    // ===== Modal Functionality =====
    const modals = document.querySelectorAll('.modal');
    const projectModal = document.getElementById('projectModal');
    const projectModalBody = projectModal?.querySelector('.modal-body');
    const projectDetailsModal = document.getElementById('projectDetailsModal');
    const projectDetailsBody = document.getElementById('projectDetailsBody');
    const liveDemoModal = document.getElementById('liveDemoModal');
    const liveDemoFrame = document.getElementById('liveDemoFrame');
    const liveDemoTitle = document.getElementById('liveDemoTitle');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const openExternalBtn = document.getElementById('openExternal');
    const imageZoomModal = document.getElementById('imageZoomModal');
    const imageZoomTitle = document.getElementById('imageZoomTitle');
    const imageZoomStage = document.getElementById('imageZoomStage');
    const imageZoomToggle = document.getElementById('imageZoomToggle');
    const imageZoomTarget = document.getElementById('imageZoomTarget');
    const imageZoomCaption = document.getElementById('imageZoomCaption');
    const imageZoomHint = document.getElementById('imageZoomHint');
    
    let currentDemoUrl = '';
    let currentZoomMeta = {
        naturalWidth: 0,
        naturalHeight: 0
    };

    function syncBodyScrollLock() {
        const hasOpenModal = document.querySelector('.modal.open, .modal.active');
        document.body.style.overflow = hasOpenModal ? 'hidden' : '';
    }
    
    // Figma button handlers
    const figmaViewButtons = document.querySelectorAll('.figma-view');
    const figmaEmbedButtons = document.querySelectorAll('.figma-embed');
    
    figmaViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const figmaUrl = button.getAttribute('data-figma-url');
            if (figmaUrl) {
                window.open(figmaUrl, '_blank', 'noopener,noreferrer');
                
                // Track Figma view
                if (window.VercelAnalytics) {
                    window.VercelAnalytics.trackEvent('figma_view', {
                        url: figmaUrl
                    });
                }
            }
        });
    });
    
    figmaEmbedButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const embedUrl = button.getAttribute('data-figma-embed');
            const title = button.getAttribute('data-title') || 'Figma Design';
            
            if (embedUrl && liveDemoModal && liveDemoFrame) {
                currentDemoUrl = embedUrl;
                liveDemoTitle.textContent = title;
                liveDemoModal.classList.add('open');
                syncBodyScrollLock();
                
                if (loadingSpinner) loadingSpinner.style.display = 'flex';
                
                liveDemoFrame.src = embedUrl;
                
                liveDemoFrame.onload = () => {
                    if (loadingSpinner) loadingSpinner.style.display = 'none';
                };
                
                liveDemoFrame.onerror = () => {
                    handleIframeError();
                };
                
                // Track Figma embed view
                if (window.VercelAnalytics) {
                    window.VercelAnalytics.trackEvent('figma_embed_view', {
                        title: title,
                        url: embedUrl
                    });
                }
            }
        });
    });
    
    // Open live demo modal
    function openLiveDemo(url, title) {
        currentDemoUrl = url;
        
        if (liveDemoTitle) liveDemoTitle.textContent = title;
        if (liveDemoModal) liveDemoModal.classList.add('open');
        syncBodyScrollLock();
        
        // Show loading spinner
        if (loadingSpinner) loadingSpinner.style.display = 'flex';
        
        // Clear any previous error messages
        const existingErrors = document.querySelectorAll('.iframe-error');
        existingErrors.forEach(error => error.remove());
        
        // Try to load in iframe first
        if (liveDemoFrame) {
            // Reset iframe display
            liveDemoFrame.style.display = 'block';
            liveDemoFrame.src = url;
            
            // Set up iframe load handlers
            liveDemoFrame.onload = () => {
                if (loadingSpinner) loadingSpinner.style.display = 'none';
            };
            
            liveDemoFrame.onerror = () => {
                handleIframeError();
            };
            
            // Check if iframe is blocked after a delay
            setTimeout(() => {
                try {
                    // Try to access iframe content
                    const iframeDoc = liveDemoFrame.contentDocument || liveDemoFrame.contentWindow.document;
                    if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                        handleIframeError();
                    }
                } catch (e) {
                    // Cross-origin error is expected and means iframe loaded
                    if (loadingSpinner) loadingSpinner.style.display = 'none';
                }
            }, 3000);
            
            // Show loading help after 5 seconds
            setTimeout(() => {
                if (loadingSpinner && loadingSpinner.style.display !== 'none') {
                    showLoadingHelp();
                }
            }, 5000);
        }
        
        // Track demo view
        if (window.VercelAnalytics) {
            window.VercelAnalytics.trackEvent('live_demo_view', {
                title: title,
                url: url
            });
        }
    }
    
    // Handle iframe loading errors
    function handleIframeError() {
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        if (liveDemoFrame) liveDemoFrame.style.display = 'none';
        
        const iframeContainer = document.querySelector('.iframe-container');
        if (!iframeContainer) return;
        
        // Check if error message already exists
        if (iframeContainer.querySelector('.iframe-error')) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'iframe-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i data-feather="alert-circle"></i>
                <h4>Unable to load demo in iframe</h4>
                <p>This site cannot be embedded due to security restrictions.</p>
                <button class="btn btn-primary" onclick="window.open('${escapeHTML(currentDemoUrl)}', '_blank')">
                    <i data-feather="external-link"></i>
                    Open in New Tab
                </button>
            </div>
        `;
        iframeContainer.appendChild(errorDiv);
        
        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    // Show loading help message
    function showLoadingHelp() {
        const iframeContainer = document.querySelector('.iframe-container');
        if (!iframeContainer || iframeContainer.querySelector('.loading-help')) return;
        
        const helpDiv = document.createElement('div');
        helpDiv.className = 'loading-help';
        helpDiv.innerHTML = `
            <p>Taking longer than expected?</p>
            <button class="btn btn-outline" onclick="window.open('${escapeHTML(currentDemoUrl)}', '_blank')">
                <i data-feather="external-link"></i>
                Open in New Tab
            </button>
        `;
        iframeContainer.appendChild(helpDiv);
        
        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    function centerImageZoomStage() {
        if (!imageZoomStage || !imageZoomToggle) return;

        imageZoomStage.scrollLeft = Math.max(0, (imageZoomToggle.offsetWidth - imageZoomStage.clientWidth) / 2);
        imageZoomStage.scrollTop = Math.max(0, (imageZoomToggle.offsetHeight - imageZoomStage.clientHeight) / 2);
    }

    function updateImageZoomLayout({ center = false } = {}) {
        if (!imageZoomStage || !imageZoomTarget || !imageZoomModal?.classList.contains('open')) {
            return;
        }

        const naturalWidth = imageZoomTarget.naturalWidth || currentZoomMeta.naturalWidth;
        const naturalHeight = imageZoomTarget.naturalHeight || currentZoomMeta.naturalHeight;

        if (!naturalWidth || !naturalHeight) {
            return;
        }

        currentZoomMeta = { naturalWidth, naturalHeight };

        const availableWidth = Math.max(imageZoomStage.clientWidth - 24, 1);
        const availableHeight = Math.max(imageZoomStage.clientHeight - 24, 1);
        const fitScale = Math.min(availableWidth / naturalWidth, availableHeight / naturalHeight, 1);
        const zoomMultiplier = imageZoomModal.classList.contains('is-zoomed')
            ? Math.max(2, 1 / Math.max(fitScale, 0.45))
            : 1;
        const displayScale = fitScale * zoomMultiplier;

        imageZoomTarget.style.width = `${Math.max(1, Math.round(naturalWidth * displayScale))}px`;
        imageZoomTarget.style.height = `${Math.max(1, Math.round(naturalHeight * displayScale))}px`;

        if (center) {
            requestAnimationFrame(centerImageZoomStage);
        }
    }

    function setImageZoomState(isZoomed, options = {}) {
        if (!imageZoomModal || !imageZoomToggle || !imageZoomHint) return;

        imageZoomModal.classList.toggle('is-zoomed', isZoomed);
        imageZoomToggle.setAttribute('aria-label', isZoomed ? 'Zoom out image' : 'Zoom in image');
        imageZoomHint.textContent = isZoomed
            ? 'Drag or scroll to inspect details. Tap the image again to fit it back.'
            : 'Tap the image to zoom closer.';
        updateImageZoomLayout(options);
    }

    function openImageZoomModal(src, alt, caption) {
        if (!imageZoomModal || !imageZoomTarget || !imageZoomCaption || !imageZoomTitle) {
            return;
        }

        currentZoomMeta = { naturalWidth: 0, naturalHeight: 0 };
        imageZoomTitle.textContent = caption || alt || 'Image Preview';
        imageZoomCaption.textContent = caption || alt || '';
        imageZoomCaption.hidden = !imageZoomCaption.textContent;
        imageZoomModal.classList.add('open');
        imageZoomTarget.alt = alt || caption || 'Expanded project image';
        imageZoomTarget.src = src;
        syncBodyScrollLock();

        imageZoomTarget.onload = () => {
            setImageZoomState(false, { center: true });
        };

        if (imageZoomTarget.complete) {
            setImageZoomState(false, { center: true });
        }

        if (window.VercelAnalytics) {
            window.VercelAnalytics.trackEvent('project_image_zoom', {
                src,
                caption: caption || alt || ''
            });
        }
    }

    function closeImageZoomModal() {
        if (!imageZoomModal || !imageZoomTarget || !imageZoomCaption || !imageZoomTitle) {
            return;
        }

        imageZoomModal.classList.remove('open', 'is-zoomed');
        imageZoomTarget.removeAttribute('src');
        imageZoomTarget.alt = '';
        imageZoomTarget.style.width = '';
        imageZoomTarget.style.height = '';
        imageZoomTarget.onload = null;
        imageZoomCaption.textContent = '';
        imageZoomCaption.hidden = true;
        imageZoomTitle.textContent = 'Image Preview';
        currentZoomMeta = { naturalWidth: 0, naturalHeight: 0 };
        syncBodyScrollLock();
    }
    
    // Close modal functionality
    function closeModal() {
        if (projectModal) {
            projectModal.classList.remove('active', 'open');
        }
        if (liveDemoModal) {
            liveDemoModal.classList.remove('active', 'open');
        }
        
        // Reset iframe
        if (liveDemoFrame) {
            liveDemoFrame.src = '';
            liveDemoFrame.style.display = 'block';
        }
        
        // Remove error containers and loading help
        const errorContainers = document.querySelectorAll('.iframe-error');
        errorContainers.forEach(container => container.remove());
        
        const loadingHelp = document.querySelectorAll('.loading-help');
        loadingHelp.forEach(help => help.remove());
        
        // Reset loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        // Clear current demo URL
        currentDemoUrl = '';

        if (projectModalBody) {
            projectModalBody.innerHTML = '';
        }

        syncBodyScrollLock();
    }
    
    // Close modal button handlers
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Check which modal this button belongs to
            const modal = button.closest('.modal');
            if (modal && modal.id === 'imageZoomModal') {
                closeImageZoomModal();
            } else if (modal && modal.id === 'projectDetailsModal') {
                closeProjectDetailsModal();
            } else if (modal && modal.classList.contains('video-modal')) {
                closeVideoModal();
            } else {
                closeModal();
            }
        });
    });
    
    // Close modal on backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (modal.id === 'imageZoomModal') {
                    closeImageZoomModal();
                } else if (modal.id === 'projectDetailsModal') {
                    closeProjectDetailsModal();
                } else if (modal.classList.contains('video-modal')) {
                    closeVideoModal();
                } else {
                    closeModal();
                }
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') {
            return;
        }

        if (imageZoomModal?.classList.contains('open')) {
            closeImageZoomModal();
        } else if (document.getElementById('videoModal')?.classList.contains('open')) {
            closeVideoModal();
        } else if (projectDetailsModal?.classList.contains('open')) {
            closeProjectDetailsModal();
        } else if (liveDemoModal?.classList.contains('open') || projectModal?.classList.contains('open')) {
            closeModal();
        }
    });
    
    // Open external button
    if (openExternalBtn) {
        openExternalBtn.addEventListener('click', () => {
            if (currentDemoUrl) {
                window.open(currentDemoUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }

    if (imageZoomToggle) {
        imageZoomToggle.addEventListener('click', () => {
            setImageZoomState(!imageZoomModal?.classList.contains('is-zoomed'), { center: true });
        });
    }

    window.addEventListener('resize', () => {
        updateImageZoomLayout();
    });
    
    // Live demo button handlers
    const liveDemoButtons = document.querySelectorAll('.live-demo');
    liveDemoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const url = button.getAttribute('data-url');
            const title = button.getAttribute('data-title') || 'Live Demo';
            
            if (url) {
                openLiveDemo(url, title);
            }
        });
    });
    
    // ===== Project Details Functionality =====
    
    // View details button handlers
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            if (projectId && projectDetails[projectId]) {
                openProjectDetails(projectId);
            }
        });
    });

    if (projectDetailsBody) {
        projectDetailsBody.addEventListener('click', e => {
            const zoomTrigger = e.target.closest('.media-zoom-trigger');
            if (!zoomTrigger) {
                return;
            }

            openImageZoomModal(
                zoomTrigger.dataset.zoomSrc,
                zoomTrigger.dataset.zoomAlt || '',
                zoomTrigger.dataset.zoomCaption || ''
            );
        });
    }
    
    // Open project details modal
    function openProjectDetails(projectId) {
        const project = projectDetails[projectId];
        const modal = document.getElementById('projectDetailsModal');
        const titleElement = document.getElementById('projectDetailsTitle');
        const bodyElement = document.getElementById('projectDetailsBody');
        
        if (!modal || !titleElement || !bodyElement || !project) return;
        
        // Set title
        titleElement.textContent = project.title;
        const overviewMarkup = renderProjectOverview(project);
        const collectionsMarkup = Array.isArray(project.collections) && project.collections.length
            ? `
                <div class="project-collections">
                    ${project.collections.map((collection, index) => renderProjectCollection(collection, project.title, index)).join('')}
                </div>
            `
            : '';
        
        // Build content
        let content = `
            <div class="project-details-content">
                ${overviewMarkup}
                <div class="project-description">
                    ${project.fullDescription}
                </div>

                ${collectionsMarkup}
                
                <div class="project-meta">
                    <h4>Tools and Focus</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tag">${escapeHTML(tech)}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-links">
                    ${project.liveUrl ? `
                        <a href="${escapeHTML(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                            <i data-feather="external-link"></i>
                            Live Demo
                        </a>
                    ` : ''}
                    ${project.githubUrl ? `
                        <a href="${escapeHTML(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                            <i data-feather="github"></i>
                            View Code
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        bodyElement.innerHTML = content;
        initializeCollectionCarousels(bodyElement);
        resetProjectDetailsScroll(modal, bodyElement);
        
        // Show modal
        modal.classList.add('open');
        syncBodyScrollLock();
        requestAnimationFrame(() => resetProjectDetailsScroll(modal, bodyElement));
        
        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        // Track details view
        if (window.VercelAnalytics) {
            window.VercelAnalytics.trackEvent('project_details_view', {
                project: projectId,
                title: project.title
            });
        }
    }
    
    // Close project details modal
    function closeProjectDetailsModal() {
        const modal = document.getElementById('projectDetailsModal');
        if (modal) {
            closeImageZoomModal();
            pauseProjectDetailsMedia(modal);
            modal.classList.remove('open');
            syncBodyScrollLock();
        }
    }
    
    // Make closeProjectDetailsModal globally accessible
    window.closeProjectDetailsModal = closeProjectDetailsModal;
    
    // ===== Video Project Functionality =====
    
    // Video hover autoplay
    const videoProjects = document.querySelectorAll('.video-project');
    videoProjects.forEach(project => {
        const video = project.querySelector('.preview-video');
        
        if (video) {
            // Play video on hover
            project.addEventListener('mouseenter', () => {
                video.play().catch(() => {});
            });
            
            // Pause video when not hovering
            project.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Reset to start
            });
        }
    });
    
    // Video play button handlers
    const videoPlayButtons = document.querySelectorAll('.video-play');
    videoPlayButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const videoUrl = button.getAttribute('data-video');
            const title = button.getAttribute('data-title') || 'Video';
            if (videoUrl) {
                openVideoModal(videoUrl, title);
            } else {
                console.error('No video URL found on button');
            }
        });
    });
    
    // Video download button handlers
    const videoDownloadButtons = document.querySelectorAll('.video-download');
    videoDownloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const videoUrl = button.getAttribute('data-video');
            if (videoUrl) {
                // Create temporary link and trigger download
                const link = document.createElement('a');
                link.href = videoUrl;
                link.download = videoUrl.split('/').pop(); // Get filename from URL
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Track download
                if (window.VercelAnalytics) {
                    window.VercelAnalytics.trackEvent('video_download', {
                        video: videoUrl
                    });
                }
            } else {
                console.error('No video URL found on button');
            }
        });
    });
    
    // Open video in modal
    function openVideoModal(videoUrl, title) {
        const videoModal = document.getElementById('videoModal');
        const videoModalTitle = document.getElementById('videoModalTitle');
        const modalVideo = document.getElementById('modalVideo');

        if (!videoModal || !modalVideo) {
            console.error('Video modal elements not found');
            alert('Video modal niet gevonden. Probeer de pagina te verversen.');
            return;
        }
        
        // Set title
        if (videoModalTitle) {
            videoModalTitle.textContent = title;
        }
        
        // Set video source
        const source = modalVideo.querySelector('source');
        if (source) {
            source.src = videoUrl;
            modalVideo.load();
        } else {
            console.error('Video source element not found');
        }
        
        // Show modal
        videoModal.classList.add('open');
        syncBodyScrollLock();

        // Play video
        modalVideo.play().catch(err => {
            console.error('Video autoplay prevented:', err);
            // Show play button or message to user
        });
        
        // Track video view
        if (window.VercelAnalytics) {
            window.VercelAnalytics.trackEvent('video_view', {
                title: title,
                url: videoUrl
            });
        }
    }
    
    // Close video modal
    function closeVideoModal() {
        const videoModal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        
        if (videoModal) {
            videoModal.classList.remove('open');
        }
        
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
        
        syncBodyScrollLock();
    }
    
    // Make closeVideoModal globally accessible
    window.closeVideoModal = closeVideoModal;
    
    // ===== Social Links Tracking =====
    const socialLinks = document.querySelectorAll('a[href*="github.com"], a[href*="instagram.com"], a[href*="linkedin.com"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const url = link.getAttribute('href');
            let platform = 'unknown';
            
            if (url.includes('github.com')) platform = 'github';
            else if (url.includes('instagram.com')) platform = 'instagram';
            else if (url.includes('linkedin.com')) platform = 'linkedin';
            
            if (window.VercelAnalytics) {
                window.VercelAnalytics.trackSocialClick(platform);
            }
        });
    });
    
    // ===== Project Button Tracking =====
    const projectButtons = document.querySelectorAll('.project-card .btn');
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectCard = button.closest('.project-card');
            const projectName = projectCard ? projectCard.querySelector('h3')?.textContent : 'Unknown';
            
            if (window.VercelAnalytics) {
                window.VercelAnalytics.trackProjectClick(projectName);
            }
        });
    });
    
    // ===== Scroll Header Styling =====
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== Lazy Loading Images =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
});
