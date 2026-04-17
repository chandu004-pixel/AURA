# AURA — Cinematic Luxury E-commerce

# Live Link: https://aura-omega-eight.vercel.app/

Aura is a high-fidelity, interactive e-commerce platform that blends cinematic storytelling with a performant shopping experience. Designed with a "Maison" aesthetic, the platform leverages state-of-the-art 3D transitions, scroll-linked animations, and a robust global state to provide a seamless, premium journey from discovery to checkout.

## 🌌 Core Concept: "The Statesman"
Aura (Rajya Sampark) is built around the identity of authority, craftsmanship, and grassroots intelligence. The design mirrors high-end editorial broadsheets, utilizing minimalist typography, architectural silhouettes, and expansive negative space to frame cinematic product showcases.

---

## 🚀 Key Features

### 1. Cinematic Foundation
- **3D Newspaper Spiral Hero**: An immersive Three.js environment that spirals archival newspaper cards towards the user, symbolizing history meeting modernity.
- **Eclipse Scroll Transition**: A dramatic, scroll-driven curtain reveal that transitions from the 3D spiral into the main maison archive.
- **Elastic Liquid Spotlight**: A custom cursor-driven spotlight effect in the Fashion Section that reveals hidden color layers on scroll, using advanced Framer Motion hooks.

### 2. Interactive Product Exploration
- **3D Product Mosaic**: An interactive 3D archive block where each face represents a unique category, supporting direct "Add to Bag" triggers and quick exploration.
- **Quick View Modal System**: Immersive, backdrop-blurred product deep-dives providing architectural details and high-resolution focus imagery without leaving the landing page.
- **Scroll-Linked Marquees**: High-velocity, scroll-triggered text marquees that provide rhythmic context to cinematic showcases.

### 3. Advanced E-commerce Logic
- **Global State Management**: Powered by React Context API, managing real-time authentication, shopping cart persistence, and dynamic subtotal calculations.
- **Smart Navbar**: A "Stealth" navigation bar that hides on scroll but reappears instantly upon hovering the top edge of the screen. Includes a real-time cart badge and profile portal.
- **Dedicated Cart Experience**: A sophisticated `/cart` page featuring a detailed "Bill Recap" system with shipping, tax simulations, and VAT breakdowns.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Vanilla CSS foundations)
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/) (UI Interactions & Transitions)
  - [GSAP](https://greensock.com/gsap/) (3D Camera Orchestration & ScrollTrigger)
- **3D Engine**: [Three.js](https://threejs.org/) (Custom Newspaper Spiral)
- **State**: React Context API

### Backend
- **Framework**: Node.js / Express
- **Port**: 5001 (API Health & Product Services)

---

## 📦 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- NPM or PNPM

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aura-ecommerce
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Setup Backend**
   ```bash
   cd ../backend
   npm install
   npm run dev
   ```

### Ports
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001

---

## 🎨 Design Philosophy
Aura adheres to the **"Sublime Luxury"** aesthetic:
- **Typography**: Serif titles for authority, Monospace for technical details, Sans-serif for navigation.
- **Color Palette**: Pristine White (#FFFFFF), Deep Zinc (#09090b), and subtle accent blurs.
- **Interactions**: Magnetic buttons, spring-physics transitions, and high-contrast micro-animations.

---

Built with precision by the **Aura Intelligence Team**.
