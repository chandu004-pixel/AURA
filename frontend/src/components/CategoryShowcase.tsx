'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const CATEGORIES = [
  {
    title: 'Footwear',
    subtitle: 'Elevated Steps',
    description: 'From sculptural heels to minimal sneakers — every stride, intentional.',
    accent: '#c9a96e',
    products: [
      { name: 'Noir Stiletto', price: '€890', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80' },
      { name: 'Canvas Runner', price: '€420', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
      { name: 'Velvet Loafer', price: '€560', image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=500&q=80' },
      { name: 'Arch Sandal', price: '€340', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=500&q=80' },
    ],
  },
  {
    title: 'Accessories',
    subtitle: 'Silent Statements',
    description: 'Pieces that speak volumes through restraint and material mastery.',
    accent: '#a8b5a0',
    products: [
      { name: 'Onyx Ring', price: '€280', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80' },
      { name: 'Silk Scarf', price: '€190', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=500&q=80' },
      { name: 'Leather Belt', price: '€350', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80' },
      { name: 'Canvas Tote', price: '€470', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80' },
    ],
  },
  {
    title: 'Outerwear',
    subtitle: 'Architecture of Form',
    description: 'Structured silhouettes that redefine the boundary between body and space.',
    accent: '#8a7b6b',
    products: [
      { name: 'Wool Overcoat', price: '€1,400', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=500&q=80' },
      { name: 'Puffer Vest', price: '€780', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80' },
      { name: 'Trench Coat', price: '€1,200', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80' },
      { name: 'Leather Jacket', price: '€960', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80' },
    ],
  },
  {
    title: 'Essentials',
    subtitle: 'The Foundation',
    description: 'Core wardrobe elements refined to their purest, most enduring form.',
    accent: '#b8a9c9',
    products: [
      { name: 'Cashmere Knit', price: '€520', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=500&q=80' },
      { name: 'Linen Shirt', price: '€290', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80' },
      { name: 'Tailored Trouser', price: '€410', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=500&q=80' },
      { name: 'Silk Camisole', price: '€380', image: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?auto=format&fit=crop&w=500&q=80' },
    ],
  },
];

export default function CategoryShowcase() {
  return (
    <div className="w-full h-full pt-16 pb-12 px-[5vw] flex flex-col bg-white text-zinc-900">
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
                     <div key={j} className="group cursor-pointer">
                        <div className="aspect-[4/5] relative bg-zinc-100 overflow-hidden rounded-[2px] mb-3">
                           <Image 
                             src={prod.image} 
                             alt={prod.name} 
                             fill 
                             sizes="(max-width: 1024px) 40vw, 20vw" 
                             className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                           />
                           <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundColor: cat.accent }} />
                        </div>
                        <h4 className="text-sm text-zinc-600 tracking-wide group-hover:text-zinc-900 transition-colors">{prod.name}</h4>
                        <p className="text-[10px] text-zinc-400 font-mono mt-1">{prod.price}</p>
                     </div>
                  ))}
               </div>
            </div>
          ))}
        </div>
    </div>
  );
}
