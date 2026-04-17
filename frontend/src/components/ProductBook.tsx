'use client';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

import { useStore } from '@/context/StoreContext';

// Tiny base64 BlurHash/LQIP placeholder
const BLUR_PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO88OjxfwAJ4wPNyY9m4wAAAABJRU5ErkJggg==";

export default function ProductBook({ product, index }: { product: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { addToCart } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { margin: '600px 0px 600px 0px', once: false });

  const productImage = `https://picsum.photos/seed/${product.id}/600/900`;
  const productPrice = "€499.00";

  return (
    <>
      <motion.div
        ref={cardRef}
        layoutId={`book-container-${product.id}`}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.5, z: -500 }}
        whileInView={{ opacity: 1, scale: 1, z: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-[300px] h-[450px] bg-zinc-100 rounded-xl cursor-pointer relative group perspective-[1000px] shadow-xl hover:shadow-2xl transition-shadow overflow-hidden"
      >
        {isInView ? (
          <div className="absolute inset-0 bg-zinc-300 rounded-xl group-hover:scale-105 transition-transform duration-500 origin-bottom overflow-hidden">
               <Image 
                 src={productImage} 
                 alt={product.title}
                 fill
                 sizes="(max-width: 768px) 100vw, 300px"
                 className="object-cover opacity-80"
                 placeholder="blur"
                 blurDataURL={BLUR_PLACEHOLDER}
                 loading="lazy"
               />
               
               {isHovered && (
                 <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                   <span className="text-[10px] text-white font-bold uppercase tracking-widest">Video Focus</span>
                 </div>
               )}
            </div>
        ) : (
          <div className="absolute inset-0 bg-zinc-100 rounded-xl border-2 border-zinc-200/50" />
        )}

        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <span className="text-[10px] bg-black/50 backdrop-blur-md w-fit px-3 py-1 rounded-full uppercase tracking-widest font-bold text-white shadow-xl">
             {isInView ? "Mounted" : "Culled"}
          </span>
          <h3 className="text-4xl font-black uppercase text-white drop-shadow-lg mix-blend-difference">{product.title}</h3>
        </div>
      </motion.div>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-[200] backdrop-blur-sm"
            />

            <motion.div
              layoutId={`book-container-${product.id}`}
              transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-white rounded-2xl z-[210] flex overflow-hidden shadow-2xl"
            >
              <div className="w-1/2 h-full bg-zinc-100 relative perspective-[2000px]">
                <motion.div 
                  initial={{ rotateY: 0 }} animate={{ rotateY: -180 }} transition={{ duration: 1, ease: "easeInOut" }}
                  style={{ transformOrigin: "left" }}
                  className="absolute inset-0 bg-zinc-800 z-20 shadow-2xl"
                />
                
                <div className="absolute inset-0 p-10 flex flex-col items-center justify-center">
                  <div className="w-full h-full relative overflow-hidden bg-zinc-200 rounded-lg flex items-center justify-center">
                     <Image src={productImage} alt={product.title} fill className="object-cover opacity-50 blur-xl" />
                     <span className="absolute z-10 text-zinc-600 font-bold tracking-widest uppercase">3D Exploration</span>
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                className="w-1/2 h-full p-16 flex flex-col justify-center bg-white"
              >
                <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-sm uppercase tracking-widest text-zinc-400 hover:text-black">Close [X]</button>
                
                <h2 className="text-[4vw] font-black uppercase leading-none text-black">{product.title}</h2>
                <p className="mt-6 text-zinc-500 text-lg max-w-md">
                   Discover the pinnacle of artisanal luxury. The {product.title} is meticulously crafted to offer a sensory experience that transcends traditional lifestyle boundaries.
                </p>
                
                <div className="mt-auto">
                  <span className="text-3xl font-mono text-black">{productPrice}</span>
                  <div className="mt-6 flex gap-4">
                    <button 
                      onClick={() => {
                        addToCart({ id: `showcase-${product.id}`, title: product.title, price: productPrice, image: productImage });
                        setIsOpen(false);
                      }}
                      className="flex-1 py-5 bg-black text-white font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition"
                    >
                        Add to Bag
                    </button>
                    <button className="px-8 py-5 border border-zinc-300 text-black font-bold uppercase tracking-widest rounded-full hover:bg-zinc-100 transition">Specs</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

