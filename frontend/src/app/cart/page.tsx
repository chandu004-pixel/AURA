'use client';

import { useStore } from '@/context/StoreContext';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  
  const shipping = 25.00;
  const tax = cartTotal * 0.08; // 8% tax simulation
  const grandTotal = cartTotal + shipping + tax;

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Navbar />
      
      <section className="pt-32 pb-20 px-[5vw] max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16 underline-offset-8 decoration-zinc-200">
           <h1 className="text-6xl font-serif tracking-tighter">Shopping Bag</h1>
           <span className="text-sm font-mono text-zinc-400 mt-4">[{cart.length} items]</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Product List */}
          <div className="flex-1 space-y-12">
            <AnimatePresence mode='popLayout'>
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="py-20 text-center border-t border-zinc-100"
                >
                  <p className="text-zinc-400 font-medium text-lg mb-8 uppercase tracking-widest">Your bag is currently empty.</p>
                  <Link href="/" className="inline-block px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-colors">
                    Continue Exploration
                  </Link>
                </motion.div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col md:flex-row gap-8 pb-12 border-b border-zinc-100 group"
                  >
                    <div className="w-full md:w-48 aspect-[3/4] relative bg-zinc-50 overflow-hidden">
                       <Image src={item.image} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                    </div>
                    
                    <div className="flex-1 flex flex-col py-2">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block mb-2">Item Ref. 0x{item.id}</span>
                             <h3 className="text-3xl font-serif tracking-tight text-zinc-900">{item.title}</h3>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-300 hover:text-red-500 transition-colors"
                          >
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                       </div>
                       
                       <p className="text-zinc-500 max-w-sm text-sm leading-relaxed mb-8">
                          Handcrafted with precision. This archival piece features premium materials and the signature Aura silhouette.
                       </p>

                       <div className="mt-auto flex flex-wrap items-center justify-between gap-6">
                          <div className="flex items-center border border-zinc-200 rounded">
                             <button onClick={() => updateQuantity(item.id, -1)} className="px-5 py-2 text-zinc-400 hover:text-black hover:bg-zinc-50 transition-colors">-</button>
                             <span className="px-5 py-2 text-xs font-mono border-x border-zinc-100">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, 1)} className="px-5 py-2 text-zinc-400 hover:text-black hover:bg-zinc-50 transition-colors">+</button>
                          </div>
                          <span className="text-xl font-mono text-zinc-900">{item.price}</span>
                       </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Detailed Bill Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
             <div className="bg-zinc-50 p-10 sticky top-40 rounded-sm">
                <h2 className="text-[10px] uppercase font-black tracking-[0.5em] text-zinc-900 mb-10 border-b border-zinc-200 pb-4">Detailed Bill Recap</h2>
                
                <div className="space-y-6 mb-12">
                   <div className="flex justify-between text-sm">
                      <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                      <span className="font-mono text-zinc-900">€{cartTotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Shipping (Expedited)</span>
                      <span className="font-mono text-zinc-900">€{shipping.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">VAT (Estimated)</span>
                      <span className="font-mono text-zinc-900">€{tax.toFixed(2)}</span>
                   </div>
                   <div className="pt-6 border-t border-zinc-200 flex justify-between items-center">
                      <span className="text-xs uppercase tracking-[0.3em] font-black">Total Amount</span>
                      <span className="text-3xl font-mono text-black">€{grandTotal.toFixed(2)}</span>
                   </div>
                </div>

                <div className="space-y-4">
                   <button className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.5em] hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl">
                      Proceed to Payment
                   </button>
                   <button className="w-full py-5 border border-zinc-200 text-black text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:border-black transition-all">
                      Pay with Apple Pay
                   </button>
                </div>

                <p className="mt-8 text-[9px] text-zinc-400 leading-relaxed uppercase tracking-widest text-center">
                   Free returns within 14 days of receipt. All items are delivered with an authenticity certificate.
                </p>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
