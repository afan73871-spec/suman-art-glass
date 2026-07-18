# Suman Art Glass - Technical Documentation
## Client Handover Document

---

## 1. Project Overview

| Detail | Value |
|--------|-------|
| **Project Name** | Suman Art Glass Website |
| **Type** | Business Website + Super Admin Panel |
| **Pages** | 7 Public Pages + 10 Admin Pages |
| **Total Files** | 27 Files |
| **Last Updated** | July 2026 |

---

## 2. Technologies Used

### 2.1 Languages

| Language | Where Used | Purpose |
|----------|-----------|---------|
| **HTML5** | All `.html` files | Page structure, content, forms |
| **CSS3** | `css/styles.css`, `admin/css/admin.css` | Styling, animations, responsive design |
| **JavaScript (ES6+)** | `js/dataManager.js`, `admin/js/admin.js` | Functionality, CRUD operations, data management |

### 2.2 External Services

| Service | Where Used | Purpose |
|---------|-----------|---------|
| **Google Fonts** | All pages (via CSS `@import` + HTML `<link>`) | Playfair Display (headings) + Inter (body text) |
| **Google Maps** | `contact.html` | Embedded map showing company location |
| **Unsplash Images** | `images/` folder | 40+ premium royalty-free photos |

### 2.3 No External JavaScript Libraries
- Entire website built with **vanilla JavaScript** (no React, Vue, jQuery, etc.)
- This makes the site fast, lightweight, and easy to maintain

---

## 3. File Structure

```
website/
├── index.html              → Home Page
├── about.html              → About Us Page
├── services.html           → Services Page (with tab filtering)
├── projects.html           → Projects Page
├── our-work.html           → Our Work / Gallery Page
├── clients.html            → Clients & Testimonials Page
├── contact.html            → Contact Page (form + Google Map)
├── TECHNICAL_DOCUMENT.md   → This document
│
├── css/
│   └── styles.css          → Main stylesheet (all styling)
│
├── js/
│   └── dataManager.js      → Data management (localStorage CRUD)
│
├── images/                 → 40+ premium photos (.jpg format)
│   ├── hero.jpg            → Home page hero banner
│   ├── about-story.jpg     → About page image
│   ├── curtain-wall.jpg    → Service/project images
│   ├── work1.jpg - work8.jpg → Gallery images
│   ├── project-*.jpg       → Project showcase images
│   ├── client1.jpg - client8.jpg → Client logos
│   └── ... (40+ total)
│
└── admin/
    ├── login.html          → Admin login page
    ├── dashboard.html      → Admin dashboard (stats overview)
    ├── projects.html       → Manage Projects (Add/Edit/Delete)
    ├── services.html       → Manage Services (Add/Edit/Delete)
    ├── gallery.html        → Manage Gallery (Add/Edit/Delete)
    ├── clients.html        → Manage Clients (Add/Edit/Delete)
    ├── testimonials.html   → Manage Testimonials (Add/Edit/Delete)
    ├── contacts.html       → Manage Contact Inquiries
    ├── billing.html        → Invoice Creation & Management
    ├── settings.html       → Company Settings & Account
    │
    ├── css/
    │   └── admin.css       → Admin panel styling
    │
    └── js/
        └── admin.js        → Admin panel logic
```

---

## 4. Color Scheme & Design System

### 4.1 Color Values

| Color Name | Hex Code | Where Used |
|------------|----------|------------|
| **Gold (Primary)** | `#c8963e` | Buttons, accents, borders, highlights |
| **Gold Light** | `#d4a84f` | Hover states, gradients |
| **Gold Dark** | `#b8862e` | Gradient ends |
| **Dark (Background)** | `#0a0a0a` | Hero section, footer, dark sections |
| **Dark Blue** | `#0f1729` | Alternative dark background |
| **Text Primary** | `#1a1a2e` | Main body text |
| **Text Light** | `#5a5a6e` | Secondary text |
| **Text Muted** | `#8a8a9e` | Captions, labels |
| **White** | `#ffffff` | Backgrounds, text on dark |
| **Gray 50** | `#fafafa` | Light section backgrounds |
| **Gray 100** | `#f5f5f5` | Card backgrounds |
| **Gray 200** | `#e8e8e8` | Borders, dividers |
| **Border** | `#ebebeb` | Input borders, lines |

### 4.2 Gradients Used

| Gradient | Value | Where Used |
|----------|-------|------------|
| **Gold Gradient** | `linear-gradient(135deg, #c8963e 0%, #d4a84f 50%, #b8862e 100%)` | CTA buttons, badges, accents |
| **Hero Overlay** | `linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.35) 50%, rgba(0,0,0,.6) 100%)` | Hero banner dark overlay |
| **Dark Gradient** | `linear-gradient(135deg, #0a0a0a, #1a1a2e)` | Dark section backgrounds |

---

## 5. Typography

### 5.1 Fonts

| Font Name | Type | Where Used |
|-----------|------|------------|
| **Playfair Display** | Serif (Display) | All headings (h1, h2, h3), section titles, hero text |
| **Inter** | Sans-Serif (Body) | All body text, paragraphs, buttons, navigation |

### 5.2 Font Sizes (Responsive)

| Element | Desktop | Tablet (768px) | Mobile (480px) |
|---------|---------|----------------|----------------|
| Hero h1 | `clamp(2.8rem, 5.5vw, 4rem)` | `2rem` | `1.7rem` |
| Section h2 | `2.25rem` | `1.75rem` | `1.5rem` |
| Body text | `1rem` | `0.92rem` | `0.85rem` |
| Navigation | `0.88rem` | `0.8rem` (desktop) / `0.92rem` (mobile) | `0.85rem` |

### 5.3 Font Weights Used
- **400** → Regular body text
- **500** → Semi-bold labels
- **600** → Bold navigation, card titles
- **700** → Extra bold headings
- **800** → Ultra bold hero text

---

## 6. Responsive Breakpoints

| Breakpoint | Target Device | Changes |
|------------|--------------|---------|
| **1200px** | Large desktops | Max container width |
| **992px** | Small desktops / Large tablets | 2-column grids, smaller nav |
| **768px** | Tablets | Hamburger menu, single column, reduced padding |
| **480px** | Mobile phones | Further size reduction, stacked layouts |
| **360px** | Small phones | Minimum sizes for very small screens |

### Mobile Navigation
- **Hamburger menu** appears at 768px and below
- Slide-in navigation panel from right side
- Overlay background when menu is open
- Body scroll lock when menu is open

---

## 7. Animations & Transitions

### 7.1 Scroll Reveal Animations

| Animation Class | Effect | Trigger |
|----------------|--------|---------|
| `.reveal` | Fade up from bottom (40px) | Element enters viewport |
| `.reveal-left` | Slide in from left (-40px) | Element enters viewport |
| `.reveal-right` | Slide in from right (+40px) | Element enters viewport |
| `.reveal-scale` | Scale up from 95% | Element enters viewport |

**Implementation:** Uses `Intersection Observer API` in JavaScript to detect when elements enter viewport.

### 7.2 CSS Transitions

| Property | Duration | Easing |
|----------|----------|--------|
| **Default** | `0.5s` | `cubic-bezier(.25, .46, .45, .94)` |
| **Fast** | `0.3s` | `cubic-bezier(.25, .46, .45, .94)` |

### 7.3 Hover Effects

| Element | Hover Effect |
|---------|-------------|
| **Cards** | Lift up 8px + enhanced shadow |
| **Buttons** | Gradient shift + shadow glow |
| **Images** | Subtle zoom (scale 1.02) |
| **Navigation links** | Gold underline animation |
| **Social icons** | Scale up + gold color |

### 7.4 Special Animations

- **Counter animation** → Numbers count up when entering viewport
- **Toast notifications** → Slide in from top-right, auto-dismiss after 3 seconds
- **Success modal** → Pulse effect + checkmark draw animation + bounce-in
- **Gradient border** → Animated gradient on focus states

---

## 8. Public Pages Detail

### 8.1 Home Page (`index.html`)

| Section | Features |
|---------|----------|
| **Top Bar** | Address, phone numbers, email, social icons |
| **Header** | Logo, navigation (7 links), "Get a Quote" button, hamburger menu |
| **Hero Banner** | Background image, heading, subheading, breadcrumb |
| **Stats Banner** | 4 stats with counter animation (Projects, Clients, Years, Satisfaction) |
| **Services Preview** | 6 service cards (loaded from localStorage) |
| **Projects Preview** | 6 project cards with company logo badges (loaded from localStorage) |
| **Why Choose Us** | 4 feature cards |
| **Testimonials** | Client reviews (loaded from localStorage) |
| **CTA Banner** | Call-to-action with gradient background |
| **Footer** | Company info, quick links, services, contact, social links |

### 8.2 About Page (`about.html`)

| Section | Features |
|---------|----------|
| **Hero Banner** | Page banner with "About Us" title |
| **Story Section** | Company story with image + stats |
| **Experience Grid** | Years of experience, certifications |
| **Why Choose Us** | 4 reasons with icons |
| **Team Section** | Team members display |
| **Journey Timeline** | Company milestones |

### 8.3 Services Page (`services.html`)

| Section | Features |
|---------|----------|
| **Hero Banner** | Page banner with "Our Services" title |
| **Tab Filtering** | Filter by: All, Glass, UPVC, Aluminium, Facade, Specialty |
| **Service Cards** | 12 services with images, descriptions (loaded from localStorage) |
| **Each Card** | Image, title, description, category badge |

### 8.4 Projects Page (`projects.html`)

| Section | Features |
|---------|----------|
| **Hero Banner** | Page banner with "Our Projects" title |
| **Project Grid** | All projects with images (loaded from localStorage) |
| **Project Cards** | Image, title, location, description, status badge, company logo |

### 8.5 Our Work Page (`our-work.html`)

| Section | Features |
|---------|----------|
| **Hero Banner** | Page banner with "Our Work" title |
| **Gallery Grid** | Photo gallery with hover overlay (loaded from localStorage) |
| **Filter Tabs** | Filter by category |
| **Gallery Items** | Image + title + zoom icon on hover |

### 8.6 Clients Page (`clients.html`)

| Section | Features |
|---------|----------|
| **Hero Banner** | Page banner with "Our Clients" title |
| **Client Logos** | Logo grid with company names (loaded from localStorage) |
| **Industries Served** | Industry categories with icons |
| **Testimonials** | Client reviews with ratings (loaded from localStorage) |

### 8.7 Contact Page (`contact.html`)

| Section | Features |
|---------|----------|
| **Hero Banner** | Page banner with "Contact Us" title |
| **Contact Cards** | Phone, Email, Address cards |
| **Contact Form** | Name, Email, Phone, Service dropdown, Message textarea |
| **Form Validation** | Required fields, email format, phone format |
| **Success Modal** | Animated popup on successful form submission |
| **Google Map** | Embedded iframe showing company location |

---

## 9. Admin Panel Detail

### 9.1 Admin Login (`admin/login.html`)

| Feature | Detail |
|---------|--------|
| **Login URL** | `admin/login.html` |
| **Email** | `admin@sumanartglass.com` |
| **Password** | `sumanart2024` |
| **Storage** | Login state saved in `localStorage` (`adminLoggedIn`, `adminEmail`) |
| **Session** | Persists until manually logged out |

### 9.2 Admin Dashboard (`admin/dashboard.html`)

| Feature | Detail |
|---------|--------|
| **Stats Cards** | Total Projects, Services, Gallery Items, Clients, Contacts |
| **Quick Actions** | Add Project, Add Service, View Contacts |
| **Recent Items** | Last 5 added items per category |

### 9.3 Admin - Projects Management

| Feature | Detail |
|---------|--------|
| **List View** | Table with all projects, edit/delete buttons |
| **Add Project** | Form with: Name, Category, Location, Description, Image upload, Status, Company |
| **Edit Project** | Pre-filled form with existing data |
| **Delete Project** | Confirmation dialog before deletion |
| **Image Handling** | Auto-compress to max 500KB, stored as base64 |

### 9.4 Admin - Services Management

| Feature | Detail |
|---------|--------|
| **List View** | Table with all services |
| **Add Service** | Form with: Name, Category (glass/upvc/aluminium/facade/specialty), Description, Icon |
| **Edit/Delete** | Full CRUD operations |

### 9.5 Admin - Gallery Management

| Feature | Detail |
|---------|--------|
| **List View** | Grid/table of gallery images |
| **Add Image** | Form with: Title, Category, Image upload |
| **Edit/Delete** | Full CRUD operations |

### 9.6 Admin - Clients Management

| Feature | Detail |
|---------|--------|
| **List View** | Table with client logos |
| **Add Client** | Form with: Name, Industry, Logo upload, Status |
| **Edit/Delete** | Full CRUD operations |

### 9.7 Admin - Testimonials Management

| Feature | Detail |
|---------|--------|
| **List View** | Table with all testimonials |
| **Add Testimonial** | Form with: Name, Designation, Rating (1-5), Text, Photo |
| **Edit/Delete** | Full CRUD operations |

### 9.8 Admin - Contacts Management

| Feature | Detail |
|---------|--------|
| **List View** | Table with all contact form submissions |
| **Status** | New / Read / Replied |
| **Actions** | Mark as Read, Delete |

### 9.9 Admin - Billing

| Feature | Detail |
|---------|--------|
| **Create Invoice** | Form with: Client name, items, quantities, prices, GST |
| **Invoice Preview** | Professional invoice layout |
| **Print Invoice** | Print-ready format |
| **Invoice History** | List of all generated invoices |

### 9.10 Admin - Settings

| Feature | Detail |
|---------|--------|
| **Company Info** | Company name, tagline, phone, email, address |
| **Social Links** | Facebook, Instagram, LinkedIn, WhatsApp URLs |
| **Account** | Change admin email and password |
| **SEO** | Meta title, description settings |

---

## 10. Data Management (localStorage)

### 10.1 localStorage Keys

| Key | Data Type | Description |
|-----|-----------|-------------|
| `sag_projects` | Array | All project entries |
| `sag_services` | Array | All service entries |
| `sag_gallery` | Array | All gallery images |
| `sag_clients` | Array | All client entries |
| `sag_testimonials` | Array | All testimonial entries |
| `sag_contacts` | Array | All contact form submissions |
| `sag_invoices` | Array | All generated invoices |
| `sag_settings` | Object | Company settings (name, phone, email, etc.) |
| `adminLoggedIn` | Boolean | Admin login state |
| `adminEmail` | String | Admin email address |

### 10.2 Data Structure Examples

**Project Object:**
```json
{
  "id": 1,
  "name": "Infinix IT Park",
  "category": "commercial",
  "location": "Hyderabad",
  "description": "Complete curtain wall glazing for 20-story IT park.",
  "image": "data:image/jpeg;base64,...",
  "status": "Completed",
  "company": "Infinix"
}
```

**Service Object:**
```json
{
  "id": 1,
  "name": "Curtain Wall Glazing",
  "category": "glass",
  "description": "High-performance curtain wall systems for commercial buildings.",
  "icon": "curtain-wall"
}
```

**Settings Object:**
```json
{
  "companyName": "Suman Art Glass",
  "tagline": "Transforming Spaces with Premium Glass Solutions",
  "phone": "+91 98765 43210",
  "email": "info@sumanartglass.com",
  "address": "123 Glass Avenue, Industrial Area, Lucknow, UP 226001, India",
  "workingHours": "Mon - Sat: 9:00 AM - 6:00 PM",
  "facebook": "https://facebook.com/sumanartglass",
  "instagram": "https://instagram.com/sumanartglass",
  "linkedin": "https://linkedin.com/company/sumanartglass",
  "whatsapp": "+919876543210"
}
```

### 10.3 Image Handling

| Feature | Detail |
|---------|--------|
| **Upload Format** | Base64 encoded string |
| **Max Size** | 500KB per image |
| **Compression** | Auto-compress using Canvas API (resize + JPEG quality 0.7) |
| **Storage** | Stored directly in localStorage |
| **Limitation** | localStorage has ~5-10MB limit per domain |

---

## 11. CSS Variables Reference

```css
:root {
  /* Colors */
  --gold: #c8963e;
  --gold-light: #d4a84f;
  --gold-dark: #b8862e;
  --gold-gradient: linear-gradient(135deg, #c8963e, #d4a84f, #b8862e);
  --dark: #0a0a0a;
  --dark-blue: #0f1729;
  --text: #1a1a2e;
  --text-light: #5a5a6e;
  --text-muted: #8a8a9e;
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #e8e8e8;
  --white: #ffffff;
  --border: #ebebeb;
  --border-light: #f2f2f2;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,.03);
  --shadow-md: 0 8px 30px rgba(0,0,0,.06);
  --shadow-lg: 0 20px 60px rgba(0,0,0,.08);
  --shadow-xl: 0 30px 80px rgba(0,0,0,.12);

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;

  /* Transitions */
  --transition: all .5s cubic-bezier(.25,.46,.45,.94);
  --transition-fast: all .3s cubic-bezier(.25,.46,.45,.94);

  /* Fonts */
  --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

---

## 12. External Links & Integrations

| Link/Integration | Where | URL/Detail |
|-----------------|-------|------------|
| **Google Maps** | Contact page | Embedded iframe showing Lucknow location |
| **WhatsApp** | Footer, Contact | `https://wa.me/919876543210` |
| **Google Reviews** | Footer | Link to Google Business reviews |
| **Facebook** | Footer social | Configurable in admin settings |
| **Instagram** | Footer social | Configurable in admin settings |
| **LinkedIn** | Footer social | Configurable in admin settings |

---

## 13. Browser Support

| Browser | Support Level |
|---------|--------------|
| Chrome | Full support |
| Firefox | Full support |
| Safari | Full support |
| Edge | Full support |
| Mobile Chrome | Full support |
| Mobile Safari | Full support |

---

## 14. Performance Features

| Feature | Implementation |
|---------|---------------|
| **Image Optimization** | Auto-compression to 500KB max |
| **CSS Minification** | Single CSS file, no external frameworks |
| **No External JS** | Vanilla JavaScript only (zero dependencies) |
| **Lazy Loading** | Scroll reveal animations trigger on viewport entry |
| **Smooth Scrolling** | CSS `scroll-behavior: smooth` |
| **Font Display** | Google Fonts with `display=swap` for fast text render |

---

## 15. Security Notes

| Item | Detail |
|------|--------|
| **Admin Credentials** | Stored in localStorage (not recommended for production) |
| **Data Storage** | Client-side only (localStorage) - no server database |
| **HTTPS** | Recommended for production deployment |
| **Input Validation** | Basic client-side validation on forms |

---

## 16. Deployment Options

| Option | Difficulty | Cost |
|--------|-----------|------|
| **Vercel** (Recommended) | Easy - connect GitHub repo | Free tier available |
| **Netlify** | Easy - drag & drop | Free tier available |
| **GitHub Pages** | Easy - enable in repo settings | Free |
| **Traditional Hosting** | Medium - upload via FTP | Varies |

---

## 17. Maintenance Guide

### To Update Content:
1. Login to admin panel at `admin/login.html`
2. Edit desired section (Projects, Services, Gallery, etc.)
3. Changes reflect immediately on main website

### To Change Company Info:
1. Admin Panel → Settings → Company Info
2. Update phone, email, address, social links
3. Save changes

### To Add New Images:
1. Admin Panel → Gallery/Projects/Services
2. Click "Add New" → Upload image
3. Image auto-compresses and saves

---

*Document prepared for Suman Art Glass client handover*
*Last updated: July 2026*
