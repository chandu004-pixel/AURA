'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const REVIEWS = [
  { 
    text: "Aura redefined my relationship with materials. The Trench Coat isn't just worn; it's experienced.", 
    author: "Elena M.", 
    role: "Creative Director" 
  },
  { 
    text: "Uncompromising craftsmanship. The Noir Stiletto is architecturally flawless and startlingly comfortable.", 
    author: "Sarah K.", 
    role: "Architect" 
  },
  { 
    text: "Minimalism without the coldness. The tactile focus is a testament to true, quiet luxury.", 
    author: "David R.", 
    role: "Editor at Large" 
  },
  {
    text: "A masterclass in restraint. Every seam and silhouette feels deliberate, purposeful, and timeless.",
    author: "James T.",
    role: "Stylist"
  },
  {
    text: "It's rare to find pieces that feel both fundamentally classic and entirely avant-garde. Brilliant.",
    author: "Chloe S.",
    role: "Fashion Consultant"
  },
  {
    text: "The fabrics speak for themselves. The weight, the drape, the texture—it's sensory perfection.",
    author: "Marcus W.",
    role: "Photographer"
  }
];

const FOOTER_LINKS = [
  {
    title: "Archive",
    links: ["Footwear", "Accessories", "Outerwear", "Essentials", "View All"]
  },
  {
    title: "Maison",
    links: ["Philosophy", "Craftsmanship", "Sustainability", "Careers", "Press"]
  },
  {
    title: "Client Services",
    links: ["Contact", "Shipping & Returns", "Care Guide", "FAQ", "Track Order"]
  },
];

export default function Footer() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by roughly one card width
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 1.5 : current.offsetWidth / 1.5;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-black text-white selection:bg-white selection:text-black pt-32 pb-10 px-[5vw] border-t border-white/10 relative z-10">
      
      {/* 1. Senior UI/UX Detail: Integrated Editorial Reviews */}
      <div className="mb-40">
        <div className="flex items-center justify-between mb-16 border-b border-zinc-800 pb-6 outline-none">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-zinc-400">Client Perspectives</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')} 
              className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:border-white transition-all focus:outline-none"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:border-white transition-all focus:outline-none"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef} 
          className="flex gap-12 lg:gap-20 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {REVIEWS.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] snap-start shrink-0"
            >
              <svg className="w-6 h-6 text-zinc-700 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl lg:text-2xl font-serif text-white/90 leading-snug mb-8 flex-1">
                "{review.text}"
              </p>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest">{review.author}</p>
                <p className="text-[10px] text-zinc-500 font-mono tracking-wider mt-1">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Newsletter & Main Links */}
      <div className="flex flex-col lg:flex-row justify-between gap-20 mb-32">
        {/* Newsletter Call to Action */}
        <div className="lg:w-1/3">
          <h2 className="text-5xl font-serif tracking-tighter mb-4">Join the Inner Circle</h2>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed max-w-sm">
            Exclusive access to limited runs, editorial content, and private archive sales. 
          </p>
          <form className="relative border-b border-zinc-700 pb-2 group" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-transparent outline-none text-sm placeholder:text-zinc-600 text-white pr-20"
            />
            <button 
              type="submit" 
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest font-bold text-white/50 group-hover:text-white transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Navigation Columns */}
        <div className="lg:w-1/2 grid grid-cols-2 lg:grid-cols-3 gap-10">
          {FOOTER_LINKS.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-zinc-300 hover:text-white transition-colors relative group w-fit">
                      <span className="relative z-10">{link}</span>
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Bottom Bar: Brand, Legal, Social */}
      <div className="pt-8 border-t border-zinc-800 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <div className="text-3xl font-serif tracking-tighter">Aura</div>

        {/* Legal Links */}
        <div className="flex gap-6 text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
          <span>&copy; {new Date().getFullYear()} Aura Ltd.</span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:border-white transition-all">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:border-white transition-all">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:border-white transition-all">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12c-4.48 0-6.19-2.793-6.19-4.836 0-1.077.584-2.392 2.695-4.279.791-.708 1.487-1.486 1.487-2.31 0-.9-.705-1.55-1.503-1.55-.992 0-2.344 1.157-2.344 2.87 0 .546.177 1.127.354 1.488.163.33.208.43.155.702-.047.245-.157.818-.215 1.054-.083.33-.27.404-.541.278-1.577-.735-2.247-2.613-2.247-4.321 0-3.328 2.825-7.1 8.358-7.1 4.453 0 7.426 3.23 7.426 6.896 0 4.66-2.584 8.219-6.402 8.219-1.312 0-2.545-.705-2.969-1.517l-.841 3.29c-.312 1.218-.949 2.433-1.424 3.265.41.116.837.18 1.272.18 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
      
    </footer>
  );
}
