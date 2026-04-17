'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });

            // The "Puzzle" Animation: Each letter comes from a different 'corner'
            tl.from(".char-A1", { x: -200, y: -100, rotate: -45, opacity: 0 })
                .from(".char-U", { x: 0, y: 200, rotate: 20, opacity: 0 }, "-=1.2")
                .from(".char-R", { x: 0, y: -200, rotate: -20, opacity: 0 }, "-=1.2")
                .from(".char-A2", { x: 200, y: 100, rotate: 45, opacity: 0 }, "-=1.2")

                // The "Lock": Tighten the tracking at the very end to show them 'fitting'
                .to(".word-wrapper", { letterSpacing: "-1.5vw", duration: 1, ease: "back.out(2)" }, "-=0.5")

                // Fade in the subtitle at the end
                .to(".hero-sub", { opacity: 1, y: 0, duration: 1 }, "-=0.5");

            // As you scroll, the puzzle "fuses" into one solid block and scales up
            gsap.to(".word-wrapper", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    scrub: true,
                    pin: true,
                },
                scale: 15, // Zoom into the letters
                opacity: 0,
                filter: "blur(20px)"
            });
        }, containerRef); // Scoped to this component instance

        return () => ctx.revert(); // crucial for React Strict mode formatting
    }, []);

    return (
        <section ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden">
            <div className="word-wrapper flex text-[20vw] font-black uppercase leading-none tracking-[5vw] text-black">
                <span className="char-A1 inline-block">A</span>
                <span className="char-U  inline-block">u</span>
                <span className="char-R  inline-block">r</span>
                <span className="char-A2 inline-block">a</span>
            </div>

            <p className="hero-sub relative mt-2 text-gray-400 font-medium uppercase tracking-[0.2em] opacity-0 translate-y-4">
                Precision Crafted Commerce
            </p>

            <style>{`
        .word-wrapper span {
          display: inline-block;
          /* This ensures the letters look like they could physically interlock */
          filter: drop-shadow(0px 0px 0px rgba(0,0,0,0)); 
        }
      `}</style>
        </section>
    );
}