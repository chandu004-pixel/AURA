'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function StepIntoLight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Text rises and fades in as you scroll into view, then fades out
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [80, 0, 0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.3], ['0.6em', '0.15em']);
  const paraOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.65, 1], [0, 1, 1, 0]);
  const paraY = useTransform(scrollYProgress, [0.2, 0.45], [30, 0]);

  return (
    <div
      ref={ref}
      className="relative h-[42vh] w-full bg-zinc-950 flex items-center justify-center overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <motion.div
        style={{ opacity, y, scale }}
        className="text-center select-none pointer-events-none"
      >
        <motion.p
          style={{ letterSpacing }}
          className="text-[10px] uppercase text-white/25 font-bold mb-6 tracking-[0.5em] block"
        >
          Curated for you
        </motion.p>

        <h2 className="font-serif text-white/80 leading-[0.85] tracking-tighter">
          <span className="block text-[8vw]">Step into</span>
          <span className="block text-[8vw] italic text-white/40 ml-[4vw]">the light</span>
        </h2>

        {/* Razor decorative line */}
        <motion.div
          style={{ scaleX: scale }}
          className="mt-8 mx-auto w-16 h-[1px] bg-white/20 origin-center"
        />

        {/* Editorial paragraph */}
        <motion.p
          style={{ opacity: paraOpacity, y: paraY }}
          className="mt-8 text-sm text-white/30 leading-relaxed max-w-md mx-auto font-light tracking-wide"
        >
          Where craftsmanship meets intention. Each piece in this edit has been
          selected for its ability to transform the ordinary into something{' '}
          <span className="text-white/50 italic">quietly extraordinary</span>.
        </motion.p>
      </motion.div>
    </div>
  );
}
