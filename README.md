# AURA — High-Fidelity Luxury E-Commerce Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-16%20App%20Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=flat-square&logo=greensock)](https://greensock.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-UI-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Express](https://img.shields.io/badge/Express-API_Gateway-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-000000?style=flat-square&logo=vercel)](https://aura-omega-eight.vercel.app/)

> **Live Link**: [https://aura-omega-eight.vercel.app/](https://aura-omega-eight.vercel.app/)

**Aura** is a high-fidelity, interactive luxury optics & camera e-commerce platform designed with a high-fashion "Maison" broadsheet aesthetic. It combines kinetic typography, 3D CSS cube matrixes, scroll-linked animations, and real-time state persistence to deliver a seamless shopping experience from discovery to checkout.

---

## 🌌 Core Architectural & Design Concept

Aura adheres to the **"Sublime Luxury"** aesthetic:
- **Kinetic Typography Hero**: An interlocking typography puzzle animation (`Hero.tsx`) where the letters **A-u-r-a** assemble from opposite screen corners, lock into tight tracking, and scale 15x on scroll with a 20px Gaussian blur transition.
- **Editorial Design System**: Pristine White (`#FFFFFF`) and Deep Zinc (`#09090b`) high-contrast monochrome layout with serif titles (`Playfair Display`), clean sans-serif UI (`Inter`), and technical monospace product references.
- **3D Rubik's Archive Matrix**: An interactive 3D CSS `preserve-3d` Rubik's-style product mosaic (`ProductMosaic.tsx`) with 26 cubies featuring high-resolution camera and lens optics, supporting face rotations and direct "+ ADD" cart actions.

---

## 🚀 Key Features

### 1. Hero & Motion Orchestration
- **Kinetic Typography Lockup (`Hero.tsx`)**: GSAP-driven letter assembly that locks together and scales up 15x on pinned scroll scrub.
- **Scroll-Linked Marquees (`Showcase.tsx`)**: Dual high-velocity product trains ("New Arrivals" and "Trending Collection") with hover-lift cards and interactive product books.
- **Eclipse Curtain Transition (`EclipseTransition.tsx` / `StepIntoLight.tsx`)**: A scroll-linked multi-layer clip-path curtain reveal ("Step into the light") that peels back to uncover the product archive.

### 2. Interactive Product Exploration
- **Interactive 3D Product Cube (`ProductMosaic.tsx`)**: CSS 3D `preserve-3d` matrix featuring 26 interactive cubies displaying optics catalog images across 6 faces with hover states and instant cart triggers.
- **Spotlight Showcase & Quick View (`CameraSection.tsx`)**: Interactive product cards featuring magnetic spring-physics buttons, cursor spotlight trails, and backdrop-blurred quick-view modal deep dives.

### 3. Global State & E-Commerce Infrastructure
- **Hydration-Safe Store Provider (`StoreContext.tsx`)**: React Context with a post-mount `isHydrated` guard that completely prevents Next.js SSR-to-client hydration mismatch errors (React `#418/#425`).
- **Client Providers Boundary (`ClientProviders.tsx`)**: Isolates context providers from Next.js server components in `layout.tsx`.
- **Stealth Navigation Bar (`Navbar.tsx`)**: Auto-hiding navbar on scroll down that reappears instantly on top-edge hover. Includes a real-time cart drawer portal and profile modal.
- **Dedicated Shopping Bag (`/cart`)**: Detailed item management, subtotal calculations, expedited shipping fee calculations, 8% VAT estimations, and Apple Pay mock integration.

### 4. Hardened Backend API Gateway (Node.js/Express)
- **Security Middleware (`security.js`)**: Helmet-equivalent HTTP security headers, strict CORS origin whitelisting, and request body size limits (`10kb`).
- **Centralized Error Handling (`errorHandler.js`)**: Custom `AppError` operational exception class separating development and production error responses.
- **Logging & Graceful Shutdown (`server.js`)**: Winston production logger and process signal listeners (`SIGTERM`/`SIGINT`) for clean server teardown.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **Animation & Spatial Engines**:
  - GSAP & ScrollTrigger (Kinetic typography & pinned scroll zoom)
  - Framer Motion (3D CSS cube matrix, spring physics, spotlight cards, modals)
- **State Management**: React Context API (Hydration-safe)

### Backend API Gateway (Port 5001)
- **Runtime**: Node.js
- **Framework**: Express 5
- **Security & Logging**: Cors, Helmet-style security headers, Winston logger, Custom Error Handler

---

## 📁 Project Structure

```
AURA/
├── frontend/                     # Next.js App Router Frontend
│   ├── src/
│   │   ├── app/                  # App Router Pages & Layout
│   │   │   ├── cart/page.tsx     # Shopping Bag & Bill Recap Page
│   │   │   ├── globals.css       # Global Styling & Fonts
│   │   │   ├── layout.tsx        # Server Root Layout
│   │   │   └── page.tsx          # Main Landing Experience
│   │   ├── components/           # UI & Animation Components
│   │   │   ├── CameraSection.tsx # Spotlight cards & Quick View modal
│   │   │   ├── EclipseTransition.tsx # Curtain reveal animation
│   │   │   ├── Footer.tsx        # Maison Footer
│   │   │   ├── Hero.tsx          # Kinetic Typography GSAP Hero
│   │   │   ├── MosaicCategoryTransition.tsx
│   │   │   ├── Navbar.tsx        # Stealth Navigation & Drawer Portals
│   │   │   ├── PageLoader.tsx    # Initial Page Loader
│   │   │   ├── ProductBook.tsx   # Product Card Component
│   │   │   ├── ProductMosaic.tsx # Interactive 3D CSS Rubik's Cube
│   │   │   ├── Showcase.tsx       # Marquee Product Trains
│   │   │   ├── StepIntoLight.tsx # Cinematic Bridge Text
│   │   │   └── providers/
│   │   │       └── ClientProviders.tsx # Client Context Isolator
│   │   └── context/
│   │       └── StoreContext.tsx  # Hydration-Safe Cart & Auth Context
│   └── package.json
│
└── backend/                      # Express API Gateway (Port 5001)
    ├── src/
    │   ├── app.js                # Express Middleware & Routing
    │   ├── middleware/
    │   │   ├── errorHandler.js   # Operational Error Middleware
    │   │   └── security.js       # Security Headers & CORS Config
    │   └── utils/
    │       └── logger.js         # Winston Production Logger
    ├── server.js                 # Server Entry Point & Process Handlers
    └── package.json
```

---

## ⚡ Getting Started & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- NPM or PNPM

### 1. Installation
```bash
git clone https://github.com/chandu004-pixel/AURA.git
cd AURA
```

### 2. Run Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 3. Run Backend API Gateway
```bash
# In a second terminal window
cd backend
npm install
npm run dev
```
The backend API runs at **`http://localhost:5001`**.

---

## 🔐 Security & Optimization Highlights

1. **Hydration Protection**: Deferred client state hydration (`isHydrated` flag) eliminates React `#418/#425` SSR mismatch errors.
2. **3D CSS Performance**: `ProductMosaic.tsx` uses GPU-accelerated CSS `preserve-3d` transformations with backface culling to ensure smooth 60 FPS performance without WebGL canvas overhead.
3. **Hardened API Gateway**: Express is configured with strict CORS whitelist protection, HTTP security headers, 10kb body payload caps, and graceful signal handlers (`SIGTERM`/`SIGINT`).

---

## 📜 License

Built with precision by the **Aura Engineering & Design Team**. All rights reserved.
