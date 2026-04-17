import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import FashionSection from "@/components/FashionSection";
import StepIntoLight from "@/components/StepIntoLight";
import MosaicCategoryTransition from "@/components/MosaicCategoryTransition";
import Footer from "@/components/Footer";

export default async function Home() {
  let message = "Loading...";

  try {
    const res = await fetch('http://127.0.0.1:5001/api/health', {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Backend returned status: ${res.status}`);
    }

    const data = await res.json();
    message = data.message;

  } catch (error) {
    console.error("Fetch failed:", error);
    message = "Could not connect to the backend server. Is it running?";
  }

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
      {/* 3D Cinematic Hero Component */}
      <Hero />

      {/* Slipstream Entrance Gallery 1 */}
      <Showcase 
        marqueeText="New Arrivals"
        className="pt-32 pb-8"
        direction="right" 
        duration={12} 
        products={[
          { id: 1, title: 'Aura 01' },
          { id: 2, title: 'Aura 02' },
          { id: 3, title: 'Aura 03' },
          { id: 4, title: 'Lumina 01' },
          { id: 5, title: 'Lumina 02' },
          { id: 6, title: 'Lumina 03' },
          { id: 7, title: 'Spectra 01' },
          { id: 8, title: 'Spectra 02' },
          { id: 9, title: 'Nova 01' },
          { id: 10, title: 'Nova 02' },
        ]}
      />

      {/* Slipstream Entrance Gallery 2 */}
      <Showcase 
        marqueeText="Trending Collection"
        className="pt-8 pb-32"
        direction="left" 
        duration={16} 
        products={[
          { id: 11, title: 'Zenith 01' },
          { id: 12, title: 'Zenith 02' },
          { id: 13, title: 'Zenith 03' },
          { id: 14, title: 'Pulse 01' },
          { id: 15, title: 'Pulse 02' },
          { id: 16, title: 'Pulse 03' },
          { id: 17, title: 'Echo 01' },
          { id: 18, title: 'Echo 02' },
          { id: 19, title: 'Vortex 01' },
          { id: 20, title: 'Vortex 02' },
        ]}
      />

      {/* Step Into Light — cinematic bridge text in the dark gap */}
      <StepIntoLight />

      {/* Fashion Section */}
      <FashionSection />

      {/* Horizontal Transition: Tactile Cube -> Full Collection Grid */}
      <MosaicCategoryTransition />

      {/* Senior UI Footer */}
      <Footer />

    </main>
  );
}
