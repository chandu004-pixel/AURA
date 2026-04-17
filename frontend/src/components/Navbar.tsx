'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';

const NAV_LINKS = [
  { name: 'Collections', href: '#full-collection' },
  { name: 'Maison', href: '#' },
  { name: 'Archive', href: '#' },
  { name: 'Editorial', href: '#' },
];

const SEARCH_CATEGORIES = ['All', 'Footwear', 'Accessories', 'Outerwear', 'Essentials'];
const SORT_OPTIONS = ['Newest', 'Price: low to high', 'Price: high to low', 'Popularity'];

export default function Navbar() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const { user, login, logout, cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
      setIsProfileOpen(false); 
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const cartCount = cart.reduce((a: number, b: any) => a + b.quantity, 0);
  const shipping = 25.00;
  const total = cartTotal + shipping;

  const handleLoginSim = () => {
    login({ name: 'Alexander Aura', email: 'alex@aura.com' });
    setIsProfileOpen(false);
  };

  return (
    <>
      {/* Top Hover Trigger Zone */}
      <div 
        onMouseEnter={() => setIsHidden(false)}
        className="fixed top-0 left-0 w-full h-4 z-[110] pointer-events-auto"
      />

      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-500 ${
          isScrolled || isSearchOpen || isCartOpen || isProfileOpen ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="px-[5vw] h-20 flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link: { name: string; href: string }) => (
              <a key={link.name} href={link.href} className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <a href="/" className="text-2xl font-serif tracking-tighter text-white">Aura</a>
          </div>

          <div className="flex items-center gap-6 lg:gap-8">
            <button onClick={() => setIsSearchOpen(true)} className="group flex items-center gap-3">
              <span className="hidden lg:block text-[9px] uppercase tracking-widest font-bold text-white/40 group-hover:text-white transition-colors">Search</span>
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Profile Portal */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:border-white group transition-all"
              >
                <svg className={`w-4 h-4 transition-colors ${user ? 'text-white group-hover:text-black' : 'text-white/60 group-hover:text-black'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-4 w-64 bg-zinc-900 border border-white/10 rounded-lg p-6 shadow-2xl"
                  >
                    {user ? (
                      <div className="space-y-4">
                        <div className="pb-4 border-b border-white/5">
                          <p className="text-xs font-bold uppercase tracking-widest text-white">{user.name}</p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-1">{user.email}</p>
                        </div>
                        <ul className="space-y-3">
                          <li><a href="#" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white block">Orders</a></li>
                          <li><a href="#" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white block">Wishlist</a></li>
                          <li><a href="#" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white block">Settings</a></li>
                        </ul>
                        <button 
                          onClick={logout}
                          className="w-full pt-4 border-t border-white/5 text-[10px] uppercase tracking-[0.3em] font-bold text-red-500 hover:text-red-400 text-left"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-4">Welcome to Aura</p>
                        <button 
                           onClick={handleLoginSim}
                           className="w-full py-2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded hover:bg-zinc-200 transition-colors"
                        >
                          Login
                        </button>
                        <button className="w-full py-2 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded hover:border-white transition-all">
                          Sign Up
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setIsCartOpen(true)} className="relative group">
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[8px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[120] w-full max-w-md h-full bg-zinc-950 border-l border-white/5 flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-serif text-white uppercase tracking-tighter">Your Bag</h2>
                  <span className="text-[8px] font-mono bg-white/10 px-2 py-0.5 text-zinc-400 uppercase tracking-widest">{cartCount} items</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Close</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-20">
                    <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold">The bag is empty</p>
                  </div>
                ) : (
                  cart.map((item: any) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="w-24 h-32 relative bg-zinc-900 overflow-hidden rounded-[2px] shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="flex-1 flex flex-col pt-2">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-white/90">{item.title}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono mb-6">{item.price}</p>
                        <div className="mt-auto flex items-center border border-white/5 w-fit rounded overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-zinc-500 hover:text-white hover:bg-white/5">-</button>
                          <span className="px-3 py-1 text-[10px] text-white font-mono">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-zinc-500 hover:text-white hover:bg-white/5">+</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-500">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">€{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-500">
                      <span>Estimated Shipping</span>
                      <span className="font-mono text-white">€{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <span className="text-[12px] uppercase tracking-[0.4em] font-black text-white">Total</span>
                      <span className="text-2xl font-mono text-white">€{total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link 
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors mt-4 text-center block"
                  >
                    Complete Purchase
                  </Link>
                  <p className="text-[8px] text-zinc-600 text-center uppercase tracking-widest">Secured checkout by Aura Intelligence</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#111_0%,_#000_100%)] opacity-50" />
            <div className="relative h-full flex flex-col px-[5vw] pt-32 lg:pt-40 max-w-7xl mx-auto">
              <button onClick={() => setIsSearchOpen(false)} className="absolute top-10 right-[5vw] group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                <span className="text-[10px] uppercase tracking-widest font-bold">Close</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
              </button>
              <div className="mb-16">
                <input autoFocus type="text" placeholder="What are you looking for?" className="w-full bg-transparent border-b border-white/10 pb-8 text-4xl lg:text-6xl font-serif text-white outline-none placeholder:text-zinc-800 focus:border-white transition-colors" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-8">Category</h3>
                  <div className="flex flex-wrap gap-3">
                    {SEARCH_CATEGORIES.map((cat: string) => (
                      <button key={cat} className="px-5 py-2.5 rounded-full border border-white/10 text-xs text-white/60 hover:text-white hover:border-white transition-all">{cat}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-8">Sort By</h3>
                  <ul className="space-y-4">
                    {SORT_OPTIONS.map((opt: string) => (
                      <li key={opt}><button className="text-sm text-white/40 hover:text-white transition-colors">{opt}</button></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-8">Recent Searches</h3>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-sm text-zinc-600 hover:text-white transition-colors">Spring Archive 2024</a>
                    <a href="#" className="text-sm text-zinc-600 hover:text-white transition-colors">Lumina Silk Collection</a>
                    <a href="#" className="text-sm text-zinc-600 hover:text-white transition-colors">Noir Footwear</a>
                  </div>
                </div>
              </div>
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
