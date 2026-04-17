'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';

const CATEGORIES = [
  {
    title: 'Footwear',
    accent: '#c9a96e',
    products: [
      { id: 'fw-1', name: 'Noir Stiletto', price: '€890', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80' },
      { id: 'fw-2', name: 'Canvas Runner', price: '€420', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
      { id: 'fw-3', name: 'Velvet Loafer', price: '€560', image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=500&q=80' },
      { id: 'fw-4', name: 'Arch Sandal', price: '€340', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=500&q=80' },
    ],
  },
  {
    title: 'Accessories',
    accent: '#a8b5a0',
    products: [
      { id: 'ac-1', name: 'Onyx Ring', price: '€280', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80' },
      { id: 'ac-2', name: 'Silk Scarf', price: '€190', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=500&q=80' },
      { id: 'ac-3', name: 'Leather Belt', price: '€350', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80' },
      { id: 'ac-4', name: 'Canvas Tote', price: '€470', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80' },
    ],
  },
  {
    title: 'Outerwear',
    accent: '#8a7b6b',
    products: [
      { id: 'ou-1', name: 'Wool Overcoat', price: '€1,400', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=500&q=80' },
      { id: 'ou-2', name: 'Puffer Vest', price: '€780', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80' },
      { id: 'ou-3', name: 'Trench Coat', price: '€1,200', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80' },
      { id: 'ou-4', name: 'Leather Jacket', price: '€960', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80' },
    ],
  },
  {
    title: 'Essentials',
    accent: '#b8a9c9',
    products: [
      { id: 'es-1', name: 'Cashmere Knit', price: '€520', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=500&q=80' },
      { id: 'es-2', name: 'Linen Shirt', price: '€290', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80' },
      { id: 'es-3', name: 'Tailored Trouser', price: '€410', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=500&q=80' },
      { id: 'es-4', name: 'Silk Camisole', price: '€380', image: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?auto=format&fit=crop&w=500&q=80' },
    ],
  },
];

export default function CategoryShowcase() {
  const { addToCart } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div id="full-collection" className="w-full h-full pt-16 pb-12 px-[5vw] flex flex-col bg-white text-zinc-900">
        <div className="mb-8 text-center shrink-0">
          <h2 className="text-4xl lg:text-5xl font-serif text-zinc-900 tracking-tighter">Full Collection</h2>
          <p className="text-zinc-400 text-sm tracking-widest uppercase mt-3">Curated Categories</p>
        </div>

        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 min-h-0">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="flex flex-col h-full overflow-hidden">
               <div className="flex items-center gap-3 mb-6 shrink-0">
                  <div className="w-5 h-[2px]" style={{ backgroundColor: cat.accent }} />
                  <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-800">{cat.title}</h3>
               </div>
               
               <div className="flex-1 overflow-y-auto scrollbar-hide pr-2 space-y-6">
                  {cat.products.map((prod, j) => (
                     <div 
                       key={j} 
                       className="group cursor-pointer relative"
                     >
                        <div className="aspect-[4/5] relative bg-zinc-100 overflow-hidden rounded-[2px] mb-3">
                           <Image 
                             src={prod.image} 
                             alt={prod.name} 
                             fill 
                             sizes="(max-width: 1024px) 40vw, 20vw" 
                             className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                           />
                           <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundColor: cat.accent }} />
                           
                           {/* Choice Overlay */}
                           <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-sm flex flex-col gap-2 z-20">
                              <button 
                                onClick={() => addToCart({ id: prod.id, title: prod.name, price: prod.price, image: prod.image })}
                                className="w-full py-3 bg-black text-white text-[8px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-colors"
                              >
                                 + Add to Bag
                              </button>
                              <button 
                                onClick={() => setSelectedProduct({...prod, category: cat.title})}
                                className="w-full py-3 border border-zinc-200 text-black text-[8px] font-black uppercase tracking-[0.3em] hover:bg-zinc-50 transition-colors"
                              >
                                 Explore Detail
                              </button>
                           </div>
                        </div>
                        <h4 className="text-sm text-zinc-600 tracking-wide group-hover:text-zinc-900 transition-colors">{prod.name}</h4>
                        <p className="text-[10px] text-zinc-400 font-mono mt-1">{prod.price}</p>
                     </div>
                  ))}
               </div>
            </div>
          ))}
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-6 lg:p-12"
            >
               <motion.div 
                 onClick={() => setSelectedProduct(null)}
                 className="absolute inset-0 bg-black/90 backdrop-blur-xl"
               />
               
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0, y: 30 }}
                 animate={{ scale: 1, opacity: 1, y: 0 }}
                 exit={{ scale: 0.9, opacity: 0, y: 30 }}
                 className="relative w-full max-w-6xl h-[80vh] bg-white flex flex-col lg:flex-row overflow-hidden rounded-lg shadow-2xl"
               >
                  <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-50 text-black/40 hover:text-black transition-colors uppercase text-[10px] font-black tracking-widest flex items-center gap-2">
                     Close Archive <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>

                  <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative bg-zinc-100">
                      <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
                  </div>

                  <div className="w-full lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                      <span className="text-[10px] uppercase text-zinc-400 tracking-[0.4em] mb-4 font-bold">{selectedProduct.category}</span>
                      <h2 className="text-5xl lg:text-7xl font-serif text-black mb-10 tracking-tighter leading-none">{selectedProduct.name}</h2>
                      <p className="text-zinc-500 text-lg lg:text-xl leading-relaxed max-w-md mb-12">
                         An archival classic redefined for the modern connoisseur. This piece from the {selectedProduct.category} line emphasizes sculptural integrity and lasting craftsmanship.
                      </p>
                      
                      <div className="space-y-8">
                         <div className="flex justify-between items-center py-4 border-y border-zinc-100">
                            <span className="text-zinc-400 text-[10px] uppercase tracking-widest">Pricing</span>
                            <span className="text-2xl font-mono text-black">{selectedProduct.price}</span>
                         </div>
                         
                         <div className="flex gap-4">
                            <button 
                              onClick={() => { addToCart({ id: selectedProduct.id, title: selectedProduct.name, price: selectedProduct.price, image: selectedProduct.image }); setSelectedProduct(null); }}
                              className="flex-1 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-colors"
                            >
                               Secure This Piece
                            </button>
                            <button className="px-8 py-5 border border-zinc-200 text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-50 transition-colors">
                               Specs
                            </button>
                         </div>
                      </div>
                  </div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
