"use client";

import { HaloReel, type HaloReelItem } from "@/components/ui/halo-reel";
 
const LEFT_GALLERY: HaloReelItem[] = [
  {
    src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
    alt: "Fine Art & Portraiture",
    frameStyle: "broken-victorian",
  },
  {
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    alt: "Abstract Fluid Gradient artwork",
    frameStyle: "burnt-mahogany",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    alt: "3D Curved Digital Art",
    frameStyle: "baroque-gold",
  },
  {
    src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    alt: "Dark Neon Cyberpunk aesthetic",
    frameStyle: "chipped-wood",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    alt: "Ocean Sunset Seascape",
    frameStyle: "broken-victorian",
  },
  {
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
    alt: "Renaissance Painting",
    frameStyle: "baroque-gold",
  },
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    alt: "Cosmic Celestial Starlight",
    frameStyle: "burnt-mahogany",
  },
  {
    src: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop",
    alt: "Vibrant Brushstrokes",
    frameStyle: "chipped-wood",
  },
];

const RIGHT_GALLERY: HaloReelItem[] = [
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    alt: "Cosmic Celestial Starlight",
    frameStyle: "baroque-gold",
  },
  {
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
    alt: "Classic Renaissance Painting vibe",
    frameStyle: "broken-victorian",
  },
  {
    src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
    alt: "Anime style illustration",
    frameStyle: "burnt-mahogany",
  },
  {
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    alt: "Vibrant Canvas Brushstrokes",
    frameStyle: "chipped-wood",
  },
  {
    src: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop",
    alt: "Abstract Geometry",
    frameStyle: "broken-victorian",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    alt: "Ocean Sunset Seascape",
    frameStyle: "baroque-gold",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    alt: "3D Curved Digital Art",
    frameStyle: "burnt-mahogany",
  },
  {
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    alt: "Abstract Fluid Gradient artwork",
    frameStyle: "broken-victorian",
  },
];

interface DemoOneProps {
  onSelectImage?: (item: HaloReelItem) => void;
}

export default function DemoOne({ onSelectImage }: DemoOneProps) {
  return (
    <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-0 overflow-hidden">
      {/* LEFT REEL */}
      <div className="relative w-full md:w-[48%] h-[640px] overflow-hidden">
        <HaloReel
          items={LEFT_GALLERY}
          aria-label="Left Gallery Reel"
          centerXRatio={0}
          direction="forward"
          showCenterLabel={false}
          disableResponsiveFit={true}
          cardWidth={160}
          cardHeight={230}
          minScale={0.42}
          radiusXRatio={0.82}
          radiusYRatio={0.34}
          spread={1.2}
          autoPlay={true}
          holdDuration={1100}
          stepDuration={700}
          onItemClick={onSelectImage}
          className="h-full bg-transparent"
        />
      </div>

      {/* RIGHT REEL */}
      <div className="relative w-full md:w-[48%] h-[640px] overflow-hidden">
        <HaloReel
          items={RIGHT_GALLERY}
          aria-label="Right Gallery Reel"
          centerXRatio={1}
          direction="reverse"
          showCenterLabel={false}
          disableResponsiveFit={true}
          cardWidth={160}
          cardHeight={230}
          minScale={0.42}
          radiusXRatio={0.82}
          radiusYRatio={0.34}
          spread={1.2}
          autoPlay={true}
          holdDuration={1100}
          stepDuration={700}
          onItemClick={onSelectImage}
          className="h-full bg-transparent"
        />
      </div>
    </div>
  );
}
