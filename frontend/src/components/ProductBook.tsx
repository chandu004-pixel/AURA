'use client';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

// Tiny base64 BlurHash/LQIP placeholder
const BLUR_PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO88OjxfwAJ4wPNyY9m4wAAAABJRU5ErkJggg==";

export default function ProductBook({ product, index }: { product: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 1. Spatial Culling (Virtualization)
  const cardRef = useRef<HTMLDivElement>(null);
  // Unmount heavy media when outside this 600px buffer margin
  const isInView = useInView(cardRef, { margin: '600px 0px 600px 0px', once: false });

  return (
    <>
      {/* The Closed Card (What the user sees first) */}
      <motion.div
        ref={cardRef}
        layoutId={`book-container-${product.id}`}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.5, z: -500 }}
        whileInView={{ opacity: 1, scale: 1, z: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }} // Staggered "Slipstream" entrance on scroll
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-[300px] h-[450px] bg-zinc-100 rounded-xl cursor-pointer relative group perspective-[1000px] shadow-xl hover:shadow-2xl transition-shadow overflow-hidden"
      >
        {/* Spatial Culling wrapper: Only render heavy media inside when in view */}
        {isInView ? (
          <>
            {/* 2 & 3. LQIP & Play-on-Focus Video/Image */}
            <div className="absolute inset-0 bg-zinc-300 rounded-xl group-hover:scale-105 transition-transform duration-500 origin-bottom overflow-hidden">
               {/* Simulate the heavy media asset crossfading from BlurHash */}
               {/* If it were a video, we'd use <video autoPlay={isHovered} /> */}
               <Image 
                 src={`https://picsum.photos/seed/${product.id}/600/900`} 
                 alt={product.title}
                 fill
                 sizes="(max-width: 768px) 100vw, 300px"
                 className="object-cover opacity-80"
                 placeholder="blur"
                 blurDataURL={BLUR_PLACEHOLDER}
                 loading="lazy"
               />
               
               {/* 3. Play-on-Focus representation */}
               {isHovered && (
                 <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                   <span className="text-[10px] text-white font-bold uppercase tracking-widest">Video Focus</span>
                 </div>
               )}
            </div>
          </>
        ) : (
          /* Empty lightweight placeholder for elements completely scrolled away */
          <div className="absolute inset-0 bg-zinc-100 rounded-xl border-2 border-zinc-200/50" />
        )}

        {/* Card Cover Overlay Text */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <span className="text-[10px] bg-black/50 backdrop-blur-md w-fit px-3 py-1 rounded-full uppercase tracking-widest font-bold text-white shadow-xl">
             {isInView ? "Mounted" : "Culled"}
          </span>
          <h3 className="text-4xl font-black uppercase text-white drop-shadow-lg mix-blend-difference">{product.title}</h3>
        </div>
      </motion.div>

      {/* 2. The Open State (The Modal Book Spread) */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
            {/* Darken Background */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
            />

            {/* The Opened Book */}
            <motion.div
              layoutId={`book-container-${product.id}`}
              transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-white rounded-2xl z-50 flex overflow-hidden shadow-2xl"
            >
              {/* Left Page (The Cover swinging open / Gallery) */}
              <div className="w-1/2 h-full bg-zinc-100 relative perspective-[2000px]">
                {/* This div acts as the "Cover" swinging open 180 degrees */}
                <motion.div 
                  initial={{ rotateY: 0 }} animate={{ rotateY: -180 }} transition={{ duration: 1, ease: "easeInOut" }}
                  style={{ transformOrigin: "left" }}
                  className="absolute inset-0 bg-zinc-800 z-20 shadow-2xl"
                />
                
                {/* The Gallery underneath */}
                <div className="absolute inset-0 p-10 flex flex-col items-center justify-center">
                  <div className="w-full h-full bg-zinc-200 rounded-lg animate-pulse flex items-center justify-center">
                     <span className="text-zinc-400 font-bold tracking-widest uppercase">Product 3D Viewer</span>
                  </div>
                </div>
              </div>

              {/* Right Page (Details & Cart) */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                className="w-1/2 h-full p-16 flex flex-col justify-center bg-white"
              >
                <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-sm uppercase tracking-widest text-zinc-400 hover:text-black">Close [X]</button>
                
                <h2 className="text-[4vw] font-black uppercase leading-none text-black">{product.title}</h2>
                <p className="mt-6 text-zinc-500 text-lg max-w-md">
                  Experience unparalleled design and engineering. The {product.title} redefines what is possible in modern hardware architecture.
                </p>
                
                <div className="mt-auto">
                  <span className="text-3xl font-medium text-black">$499.00</span>
                  <div className="mt-6 flex gap-4">
                    <button className="flex-1 py-5 bg-black text-white font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition">Add to Cart</button>
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
