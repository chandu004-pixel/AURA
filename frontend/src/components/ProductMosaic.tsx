'use client';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';

const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=300&q=80',
];

function buildCubies() {
  const arr: { x: number; y: number; z: number; images: string[] }[] = [];
  let imgIdx = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        const images = Array.from({ length: 6 }, (_, i) =>
          PRODUCT_IMAGES[(imgIdx + i) % PRODUCT_IMAGES.length]
        );
        imgIdx = (imgIdx + 3) % PRODUCT_IMAGES.length;
        arr.push({ x, y, z, images });
      }
    }
  }
  return arr;
}

const STABLE_CUBIES = buildCubies();

function Cubie({ x, y, z, size, gap, images }: { x: number; y: number; z: number; size: number; gap: number; images: string[] }) {
  const { addToCart } = useStore();
  const offset = size + gap;
  const translateX = x * offset;
  const translateY = y * offset;
  const translateZ = z * offset;

  const faces = [
    { dir: 'front',  show: z === 1,  rotate: 'rotateY(0deg)',   img: images[0] },
    { dir: 'back',   show: z === -1, rotate: 'rotateY(180deg)', img: images[1] },
    { dir: 'right',  show: x === 1,  rotate: 'rotateY(90deg)',  img: images[2] },
    { dir: 'left',   show: x === -1, rotate: 'rotateY(-90deg)', img: images[3] },
    { dir: 'top',    show: y === -1, rotate: 'rotateX(90deg)',  img: images[4] },
    { dir: 'bottom', show: y === 1,  rotate: 'rotateX(-90deg)', img: images[5] },
  ];

  return (
    <div 
      className="absolute"
      style={{ 
        width: size, 
        height: size, 
        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {faces.map((f, i) => f.show && (
        <div 
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ 
                id: `mosaic-${x}-${y}-${z}-${f.dir}`, 
                title: 'Archive Sample', 
                price: '€640', 
                image: f.img 
            });
          }}
          className="absolute inset-0 bg-zinc-900 border-[1px] border-black/50 overflow-hidden cursor-pointer"
          style={{ 
            transform: `${f.rotate} translateZ(${size/2}px)`,
            backfaceVisibility: 'hidden'
          }}
        >
          {f.img && (
            <div className="relative w-full h-full opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500 group">
               <Image src={f.img} alt="Product" fill className="object-cover" sizes="150px" />
               <div className="absolute inset-x-0 bottom-0 bg-white/20 backdrop-blur-md h-0 group-hover:h-8 transition-all duration-300 flex items-center justify-center">
                  <span className="text-[8px] font-black tracking-widest text-black">+ ADD</span>
               </div>
               <div className="absolute inset-0 border-[4px] border-black/20 pointer-events-none" />
            </div>
          )}
        </div>
      ))}
      <div className="absolute inset-0 bg-black/40" style={{ transform: 'translateZ(-1px)' }} />
    </div>
  );
}

export default function ProductMosaicCube() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.92]);
  const yTranslate = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-180, 180]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [180, -180]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ opacity, scale, y: yTranslate, perspective: '1500px' }}
      className="h-[75vh] w-full bg-zinc-950 relative flex flex-col items-center justify-center overflow-hidden pt-4 pb-8 origin-center"
    >
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-600 font-bold mb-4 block">Collection Cube</span>
        <h2 className="text-5xl font-serif text-white/80 tracking-tighter">Tactile Archive</h2>
        <p className="mt-4 text-zinc-500 text-xs uppercase tracking-widest opacity-40">Slide to rotate | Click face to bag</p>
      </div>

      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.05}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="w-[300px] h-[300px] relative cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {STABLE_CUBIES.map((c, i) => (
            <Cubie key={i} x={c.x} y={c.y} z={c.z} size={100} gap={4} images={c.images} />
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-6 right-[5vw] text-right">
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-black">Ref. 3x3x3_ARTIF_01</p>
      </div>
    </motion.section>
  );
}
