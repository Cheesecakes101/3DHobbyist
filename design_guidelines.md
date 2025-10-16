# Design Guidelines for 3D Hobbyist

## Design Approach

**Selected Approach:** Reference-Based with E-commerce Focus

Drawing inspiration from:
- **Primary Reference:** 3dprintinindia.com - industrial, tech-forward aesthetic
- **Shopify/Modern E-commerce** - clean product displays, smooth checkout flows
- **Linear** - sharp typography, modern minimalism
- **Tech-focused aesthetics** - emphasizing precision, innovation, and quality

**Core Principles:**
1. Tech-forward professionalism with approachable warmth
2. Clear visual hierarchy emphasizing products and services
3. Trust-building through clean design and transparent pricing
4. Smooth conversion paths from browsing to checkout

## Color Palette

**Light Mode:**
- Primary: 220 70% 50% (Tech blue - conveys precision and innovation)
- Secondary: 220 15% 25% (Deep charcoal for text and contrasts)
- Accent: 160 60% 45% (Teal for CTAs and success states)
- Background: 0 0% 98% (Soft white)
- Surface: 0 0% 100% (Pure white for cards)
- Border: 220 15% 90% (Subtle dividers)

**Dark Mode:**
- Primary: 220 80% 60% (Brighter blue for dark backgrounds)
- Secondary: 220 10% 85% (Light gray for text)
- Accent: 160 55% 55% (Lighter teal)
- Background: 220 15% 10% (Deep blue-black)
- Surface: 220 12% 15% (Elevated surfaces)
- Border: 220 10% 25% (Subtle dividers)

## Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - Clean, modern sans-serif for UI and body text
- Headings: 'Space Grotesk' (Google Fonts) - Tech-forward, distinctive for headlines

**Type Scale:**
- H1: 3.5rem (56px) / Bold / Tight leading for hero headlines
- H2: 2.5rem (40px) / Semibold / Section headers
- H3: 1.75rem (28px) / Semibold / Subsection titles
- Body: 1rem (16px) / Regular / Comfortable reading
- Small: 0.875rem (14px) / Regular / Captions and metadata
- Button: 1rem (16px) / Medium / CTAs and actions

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 8, 12, 16, 20, 24
- Micro spacing: p-2, gap-2 (8px)
- Standard spacing: p-4, gap-4 (16px)
- Section padding: py-16, py-20, py-24 (desktop)
- Component gaps: gap-8, gap-12

**Grid System:**
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Product grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Feature sections: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Library

**Navigation:**
- Fixed header with transparent-to-solid on scroll
- Logo left, navigation center, cart icon + CTA right
- Mobile: Hamburger menu with slide-in drawer
- Shopping cart badge with item count

**Hero Section (Homepage):**
- Full-width hero with large background image of 3D printed objects
- Centered headline + subheadline + dual CTAs
- Floating stats cards (e.g., "5-24hr delivery", "Multi-material support")
- Blur backdrop for buttons on image backgrounds

**Product Cards (Store):**
- Image-first design with hover zoom effect
- Product name, price prominently displayed
- "Add to Cart" button with quantity selector on hover
- Badge for popular/new items
- Clean white/surface background with subtle shadow

**Custom Print Form:**
- Multi-step upload interface
- Drag-and-drop file zone accepting .STL, .OBJ, .JPEG, .PNG, .JPG
- File preview thumbnails with remove option
- Form fields: Project name, description, material preferences, quantity
- Clear "Request Quote" CTA

**Shopping Cart:**
- Slide-out drawer from right
- Item list with thumbnail, name, price, quantity controls
- Running subtotal
- "Checkout" button at bottom
- Empty state illustration

**Checkout Page:**
- Two-column layout: Order summary (right) + Razorpay form (left)
- Order review section with item list and total
- Razorpay payment integration with clear security badges
- Progress indicator (Cart → Checkout → Confirmation)

**Service Showcases:**
- Icon + Title + Description cards in 3-column grid
- Use simple line icons for services
- Clean backgrounds with subtle hover lift effect

**Footer:**
- Four columns: About, Services, Quick Links, Contact
- Newsletter signup form
- Social media icons
- Trust badges (secure payment, quality guarantee)

## Page-Specific Designs

**Homepage Sections:**
1. Hero with background image and dual CTAs
2. Services overview (3-column grid)
3. How it works (step-by-step visual flow)
4. Featured products carousel
5. Custom print CTA section
6. Testimonials/Social proof
7. Contact/Quote form

**Store Page:**
- Filter sidebar (material, price range, category)
- Product grid with pagination
- Sort options (newest, price, popular)
- Quick view modal on product click

**Custom Print Page:**
- Hero explaining the process
- File upload section (prominent)
- Requirements form
- Example gallery of past work
- FAQ accordion

**Admin Dashboard:**
- Clean table layouts for products and quote requests
- Quick actions (approve, reject, edit)
- File preview for uploaded customer files

## Images

**Hero Section:** Large, high-quality image showcasing detailed 3D printed objects (multiple colors/materials) with shallow depth of field. Image should convey precision and quality.

**Service Icons:** Use Heroicons for consistent, clean iconography throughout

**Product Images:** White background product photography with consistent lighting and angles. Multiple views per product.

**Process Illustrations:** Simple, flat-style illustrations showing the 3D printing workflow

**Trust Elements:** Small badge images for payment security, quality guarantees, and certifications

## Animations

Minimal and purposeful:
- Smooth page transitions (fade-in on scroll)
- Product image hover zoom
- Cart drawer slide-in/out
- Button hover states (subtle scale)
- Loading spinners for file uploads

**Avoid:** Complex scroll animations, rotating 3D elements, excessive motion