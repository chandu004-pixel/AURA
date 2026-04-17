'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Collections', href: '#' },
  { name: 'Maison', href: '#' },
  { name: 'Archive', href: '#' },
  { name: 'Editorial', href: '#' },
];

const SEARCH_CATEGORIES = ['All', 'Footwear', 'Accessories', 'Outerwear', 'Essentials'];
const SORT_OPTIONS = ['Newest', 'Price: low to high', 'Price: high to low', 'Popularity'];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Smart Header Logic: Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-500 ${
          isScrolled || isSearchOpen ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="px-[5vw] h-20 flex items-center justify-between">
          {/* 1. Left Section: Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* 2. Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <a href="/" className="text-2xl font-serif tracking-tighter text-white">
              Aura
            </a>
          </div>

          {/* 3. Right Section: Search, Auth, Cart */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center gap-3"
            >
              <span className="hidden lg:block text-[9px] uppercase tracking-widest font-bold text-white/40 group-hover:text-white transition-colors">
                Search
              </span>
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Login/Signup */}
            <button className="hidden sm:flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                <svg className="w-4 h-4 text-white/60 group-hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </button>

            {/* Cart Trigger */}
            <button className="relative group">
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[8px] font-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                0
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Advanced Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black"
          >
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#111_0%,_#000_100%)] opacity-50" />

            <div className="relative h-full flex flex-col px-[5vw] pt-32 lg:pt-40 max-w-7xl mx-auto">
              {/* Close Button */}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-10 right-[5vw] group flex items-center gap-3 text-white/40 hover:text-white transition-colors"
              >
                <span className="text-[10px] uppercase tracking-widest font-bold">Close</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </button>

              {/* Main Search Input */}
              <div className="mb-16">
                <input
                  autoFocus
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent border-b border-white/10 pb-8 text-4xl lg:text-6xl font-serif text-white outline-none placeholder:text-zinc-800 focus:border-white transition-colors"
                />
              </div>

              {/* Advanced Filters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                {/* 1. Category Filter */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-8">Category</h3>
                  <div className="flex flex-wrap gap-3">
                    {SEARCH_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        className="px-5 py-2.5 rounded-full border border-white/10 text-xs text-white/60 hover:text-white hover:border-white transition-all"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Sort By */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-8">Sort By</h3>
                  <ul className="space-y-4">
                    {SORT_OPTIONS.map((opt) => (
                      <li key={opt}>
                        <button className="text-sm text-white/40 hover:text-white transition-colors">
                          {opt}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Trends/Popular */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-8">Recent Searches</h3>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-sm text-zinc-600 hover:text-white transition-colors">Spring Archive 2024</a>
                    <a href="#" className="text-sm text-zinc-600 hover:text-white transition-colors">Lumina Silk Collection</a>
                    <a href="#" className="text-sm text-zinc-600 hover:text-white transition-colors">Noir Footwear</a>
                  </div>
                </div>
              </div>

              {/* Suggestions / Results Placeholder */}
              <div className="mt-24 border-t border-white/5 pt-12 text-center">
                 <p className="text-zinc-700 text-[10px] uppercase tracking-widest font-mono">Press 'Enter' to explore the full archive</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
