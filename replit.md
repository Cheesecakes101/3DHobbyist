# 3D Hobbyist - E-commerce Platform for 3D Printing Services

## Overview

3D Hobbyist is a professional e-commerce platform offering 3D printing services and products. The application allows users to browse a catalog of pre-printed products, request custom 3D printing services, and complete purchases through an integrated checkout system. The platform emphasizes accessibility, affordability, and a tech-forward aesthetic inspired by industrial 3D printing websites.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- SPA (Single Page Application) architecture

**State Management:**
- TanStack Query (React Query) for server state management and caching
- React Context API for cart state management
- Local storage for cart persistence using session-based cart IDs

**UI Component Strategy:**
- Shadcn/ui component library with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theming with light/dark mode support
- Custom fonts: Inter (body/UI) and Space Grotesk (headings) from Google Fonts

**Design System:**
- Tech-forward aesthetic inspired by 3dprintinindia.com and Linear
- Custom color palette defined in CSS variables supporting light/dark themes
- Responsive design with mobile-first approach
- Interactive elements: custom cursor, video background, animated components

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for REST API
- Middleware-based request handling
- Session-based cart management (no authentication required for browsing/purchasing)
- Development mode uses Vite middleware for HMR

**API Structure:**
- RESTful endpoints organized by resource type:
  - `/api/products` - Product catalog operations
  - `/api/cart/:cartId` - Session-based cart management
  - `/api/orders` - Order creation and management
  - `/api/custom-print-requests` - Custom print request submissions

**Data Layer:**
- Drizzle ORM for type-safe database operations
- PostgreSQL dialect configuration (via Neon serverless driver)
- In-memory storage implementation for development/testing (MemStorage class)
- Schema-first approach with Zod validation from Drizzle schemas

### Data Storage

**Database Schema:**
- **users**: User accounts (id, username, password)
- **products**: Product catalog (id, name, description, price, image, category, stock)
- **orders**: Customer orders (id, customer details, address, total, status, created_at)
- **order_items**: Line items for orders (id, order_id, product_id, quantity, price)
- **custom_print_requests**: Custom printing requests (id, customer details, description, files, material, quantity, status, created_at)

**Cart Implementation:**
- Session-based using browser-generated cart IDs stored in localStorage
- Cart items stored temporarily (server-side for production, in-memory for development)
- No user authentication required for cart operations
- Cart persists across browser sessions via localStorage

**Schema Validation:**
- Drizzle-Zod for automatic schema-to-Zod conversion
- Runtime validation for all API inputs
- Type inference from database schemas ensures type safety across the stack

### External Dependencies

**UI & Styling:**
- Radix UI primitives (@radix-ui/react-*) - Accessible headless components
- Tailwind CSS - Utility-first CSS framework
- class-variance-authority - Component variant management
- cmdk - Command palette component
- embla-carousel-react - Product gallery carousel
- date-fns - Date formatting utilities

**Forms & Validation:**
- react-hook-form - Form state management
- @hookform/resolvers - Validation resolver integration
- zod - Schema validation library

**Database & ORM:**
- drizzle-orm - Type-safe ORM
- @neondatabase/serverless - PostgreSQL serverless driver
- drizzle-kit - Database migrations and schema management

**Icons & Assets:**
- lucide-react - Icon library
- react-icons - Additional icon sets (social media icons)
- Attached assets folder for generated images and video backgrounds

**State & Data Fetching:**
- @tanstack/react-query - Server state management and caching
- Built-in fetch API for HTTP requests

**Development Tools:**
- Vite plugins for Replit integration (@replit/vite-plugin-*)
- TypeScript for static type checking
- ESBuild for server-side bundling in production

**Session & Storage:**
- connect-pg-simple - PostgreSQL session store (configured but may not be actively used given cart implementation)
- Browser localStorage for cart ID persistence