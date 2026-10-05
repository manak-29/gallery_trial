import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DemoOne from "./components/demo";
import DiscCascadeCarousel, { type DiscCascadeItem } from "./components/ui/disc-cascade-carousel";
import { type HaloReelItem } from "./components/ui/halo-reel";
import { X, Film, ChevronRight, Grid, Disc, Sparkles, ArrowLeft, Image as ImageIcon, ChevronDown } from "lucide-react";

export type EventPhoto = {
  id: string;
  src: string;
  title: string;
  date: string;
  location: string;
  eventId: string;
  eventName: string;
  frameStyle?: "baroque-gold" | "burnt-mahogany" | "broken-victorian" | "chipped-wood";
};

export type EventCategory = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  pattern: "sunburst" | "rings" | "halftone" | "horizon" | "stripes" | "eclipse" | "mosaic";
  palette: [string, string, string];
  coverImage?: string;
  photos: EventPhoto[];
};

// Event Categories Mock Data
const EVENTS_DATA: EventCategory[] = [
  {
    id: "freshers",
    title: "FRESHERS '25",
    subtitle: "The Genesis & Night of Lights",
    year: "2025",
    pattern: "sunburst",
    palette: ["#1b1d1f", "#e8572b", "#f0c94c"],
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    photos: [
      {
        id: "fr-1",
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
        title: "Neon DJ Night Beats",
        date: "Sept 12, 2025",
        location: "Grand Amphitheatre",
        eventId: "freshers",
        eventName: "FRESHERS '25",
        frameStyle: "baroque-gold"
      },
      {
        id: "fr-2",
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
        title: "Stage Spotlight Solo",
        date: "Sept 12, 2025",
        location: "Main Auditorium",
        eventId: "freshers",
        eventName: "FRESHERS '25",
        frameStyle: "broken-victorian"
      },
      {
        id: "fr-3",
        src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
        title: "Freshers Crowds Cheering",
        date: "Sept 12, 2025",
        location: "Central Arena",
        eventId: "freshers",
        eventName: "FRESHERS '25",
        frameStyle: "burnt-mahogany"
      },
      {
        id: "fr-4",
        src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
        title: "Mr. & Ms. Freshers Crowning",
        date: "Sept 12, 2025",
        location: "Main Stage",
        eventId: "freshers",
        eventName: "FRESHERS '25",
        frameStyle: "chipped-wood"
      }
    ]
  },
  {
    id: "trinity",
    title: "TRINITY FEST",
    subtitle: "Annual Flagship Cultural Extravaganza",
    year: "2025",
    pattern: "eclipse",
    palette: ["#141414", "#e9e4da", "#c8a24a"],
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    photos: [
      {
        id: "tr-1",
        src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
        title: "Live Rock Concert Night",
        date: "Nov 04, 2025",
        location: "Trinity Main Grounds",
        eventId: "trinity",
        eventName: "TRINITY FEST",
        frameStyle: "baroque-gold"
      },
      {
        id: "tr-2",
        src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
        title: "Spectacular Laser Light Show",
        date: "Nov 04, 2025",
        location: "Skyline Stage",
        eventId: "trinity",
        eventName: "TRINITY FEST",
        frameStyle: "burnt-mahogany"
      },
      {
        id: "tr-3",
        src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop",
        title: "Celebrity Artist Live Set",
        date: "Nov 05, 2025",
        location: "Trinity Arena",
        eventId: "trinity",
        eventName: "TRINITY FEST",
        frameStyle: "broken-victorian"
      },
      {
        id: "tr-4",
        src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
        title: "Pyrotechnics & Firework Finale",
        date: "Nov 05, 2025",
        location: "Main Grounds",
        eventId: "trinity",
        eventName: "TRINITY FEST",
        frameStyle: "chipped-wood"
      }
    ]
  },
  {
    id: "carnival",
    title: "CARNIVAL",
    subtitle: "Street Food, Games & Rides",
    year: "2025",
    pattern: "mosaic",
    palette: ["#f2e3c6", "#d2452b", "#2a5d8f"],
    coverImage: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=800&auto=format&fit=crop",
    photos: [
      {
        id: "cr-1",
        src: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=800&auto=format&fit=crop",
        title: "Sunset Ferris Wheel Lights",
        date: "Dec 18, 2025",
        location: "Carnival Square",
        eventId: "carnival",
        eventName: "CARNIVAL",
        frameStyle: "baroque-gold"
      },
      {
        id: "cr-2",
        src: "https://images.unsplash.com/photo-1561489413-985b06da5bee?q=80&w=800&auto=format&fit=crop",
        title: "Artisan Food & Craft Stalls",
        date: "Dec 18, 2025",
        location: "North Promenade",
        eventId: "carnival",
        eventName: "CARNIVAL",
        frameStyle: "chipped-wood"
      },
      {
        id: "cr-3",
        src: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=800&auto=format&fit=crop",
        title: "Street Acrobatics & Buskers",
        date: "Dec 19, 2025",
        location: "Carnival Plaza",
        eventId: "carnival",
        eventName: "CARNIVAL",
        frameStyle: "broken-victorian"
      },
      {
        id: "cr-4",
        src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
        title: "Golden Hour Festivities",
        date: "Dec 19, 2025",
        location: "Carnival Square",
        eventId: "carnival",
        eventName: "CARNIVAL",
        frameStyle: "burnt-mahogany"
      }
    ]
  },
  {
    id: "farewell",
    title: "FAREWELL NIGHT",
    subtitle: "A Nostalgic Toast to the Graduates",
    year: "2024",
    pattern: "horizon",
    palette: ["#2d3f7a", "#e8b4c8", "#f4efe6"],
    coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    photos: [
      {
        id: "fw-1",
        src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
        title: "Senior Gala Dinner & Suits",
        date: "May 20, 2024",
        location: "Grand Ballroom",
        eventId: "farewell",
        eventName: "FAREWELL NIGHT",
        frameStyle: "baroque-gold"
      },
      {
        id: "fw-2",
        src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop",
        title: "Candlelight Farewell Vigil",
        date: "May 20, 2024",
        location: "Quadrangle Lawn",
        eventId: "farewell",
        eventName: "FAREWELL NIGHT",
        frameStyle: "broken-victorian"
      },
      {
        id: "fw-3",
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        title: "Group Memories & Embraces",
        date: "May 20, 2024",
        location: "Memorial Courtyard",
        eventId: "farewell",
        eventName: "FAREWELL NIGHT",
        frameStyle: "burnt-mahogany"
      },
      {
        id: "fw-4",
        src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop",
        title: "Champagne Toast to the Future",
        date: "May 20, 2024",
        location: "Grand Ballroom",
        eventId: "farewell",
        eventName: "FAREWELL NIGHT",
        frameStyle: "chipped-wood"
      }
    ]
  },
  {
    id: "sports",
    title: "SPORTS MEET",
    subtitle: "Championship Glory & Athletics",
    year: "2024",
    pattern: "stripes",
    palette: ["#d9e3df", "#16443f", "#f08a5d"],
    coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
    photos: [
      {
        id: "sp-1",
        src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
        title: "100m Sprint Track Final",
        date: "Feb 10, 2024",
        location: "Olympic Stadium Track",
        eventId: "sports",
        eventName: "SPORTS MEET",
        frameStyle: "baroque-gold"
      },
      {
        id: "sp-2",
        src: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
        title: "Football League Championship Goal",
        date: "Feb 11, 2024",
        location: "Trinity Turf Field",
        eventId: "sports",
        eventName: "SPORTS MEET",
        frameStyle: "broken-victorian"
      },
      {
        id: "sp-3",
        src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
        title: "Basketball Tournament Final Dunk",
        date: "Feb 12, 2024",
        location: "Indoor Sports Complex",
        eventId: "sports",
        eventName: "SPORTS MEET",
        frameStyle: "burnt-mahogany"
      },
      {
        id: "sp-4",
        src: "https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=800&auto=format&fit=crop",
        title: "Trophy Ceremony Victory Lift",
        date: "Feb 12, 2024",
        location: "Stadium Podium",
        eventId: "sports",
        eventName: "SPORTS MEET",
        frameStyle: "chipped-wood"
      }
    ]
  },
  {
    id: "cultural",
    title: "CULTURAL EVE",
    subtitle: "Dances, Drama & Fashion Runway",
    year: "2024",
    pattern: "rings",
    palette: ["#e9e6df", "#1d1d1d", "#d84b3c"],
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    photos: [
      {
        id: "cu-1",
        src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
        title: "Ethnic Fashion Show Runway",
        date: "Oct 15, 2024",
        location: "Grand Hall Stage",
        eventId: "cultural",
        eventName: "CULTURAL EVE",
        frameStyle: "baroque-gold"
      },
      {
        id: "cu-2",
        src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
        title: "Acoustic Classical Ensemble",
        date: "Oct 15, 2024",
        location: "Music Hall",
        eventId: "cultural",
        eventName: "CULTURAL EVE",
        frameStyle: "burnt-mahogany"
      },
      {
        id: "cu-3",
        src: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=800&auto=format&fit=crop",
        title: "Skit & Drama Performance",
        date: "Oct 16, 2024",
        location: "Drama Theatre",
        eventId: "cultural",
        eventName: "CULTURAL EVE",
        frameStyle: "broken-victorian"
      },
      {
        id: "cu-4",
        src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
        title: "Folk Dance Troupe Performance",
        date: "Oct 16, 2024",
        location: "Main Auditorium",
        eventId: "cultural",
        eventName: "CULTURAL EVE",
        frameStyle: "chipped-wood"
      }
    ]
  }
];

export default function App() {
  const [introPhase, setIntroPhase] = useState<"video" | "reel" | "fog" | "discs">("video");
  const [selectedHaloImage, setSelectedHaloImage] = useState<HaloReelItem | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<EventPhoto | null>(null);
  const [discsViewMode, setDiscsViewMode] = useState<"discs" | "mobile-gallery">("discs");

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Video -> Dual Reel
  const enterDualReel = useCallback(() => {
    setIntroPhase("reel");
  }, []);

  // Dual Reel -> Fog Text
  const triggerFogTransition = useCallback(() => {
    setIntroPhase("fog");
  }, []);

  // Handle fog finish (auto after 2.5s)
  useEffect(() => {
    if (introPhase === "fog") {
      const timer = setTimeout(() => {
        setIntroPhase("discs");
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [introPhase]);

  // Video ended transition to Dual Reel
  const handleVideoEnded = () => {
    setTimeout(() => {
      enterDualReel();
    }, 500);
  };

  // Scroll wheel handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 25) {
        if (introPhase === "video") {
          enterDualReel();
        } else if (introPhase === "reel" && !selectedHaloImage) {
          triggerFogTransition();
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [introPhase, selectedHaloImage, enterDualReel, triggerFogTransition]);

  // Map EVENTS_DATA to DiscCascadeItem format
  const discCascadeItems: DiscCascadeItem[] = EVENTS_DATA.map((ev) => ({
    title: ev.title,
    pattern: ev.pattern,
    palette: ev.palette,
    eventId: ev.id,
    src: ev.coverImage,
    credits: [
      { label: "EVENT YEAR", value: ev.year },
      { label: "COLLECTION", value: ev.subtitle },
      { label: "PHOTOS", value: `${ev.photos.length} Captured Shots` }
    ],
    reviews: [
      { source: "TRINITY ARCHIVES", quote: `Relive ${ev.title} memories in full high-definition.` }
    ]
  }));

  // Active event object
  const activeEvent = EVENTS_DATA.find((e) => e.id === selectedEventId) || EVENTS_DATA[0];
  const allPhotos: EventPhoto[] = EVENTS_DATA.flatMap((e) => e.photos);
  const displayedPhotos = selectedEventId ? activeEvent.photos : allPhotos;

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden select-none">
      
      {/* ── BACKGROUND VIDEO & AMBIENT GLOW ─────────────────────────── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: introPhase === "video" ? 1 : 1.08,
            filter: introPhase === "video" 
              ? "blur(0px) brightness(0.9) contrast(1.05)" 
              : introPhase === "fog"
                ? "blur(22px) brightness(0.18) contrast(1.2)"
                : selectedPhoto || selectedHaloImage
                  ? "blur(22px) brightness(0.18) contrast(1.1)"
                  : "blur(14px) brightness(0.3) contrast(1.1)",
            opacity: introPhase === "video" ? 1 : introPhase === "fog" ? 0.15 : 0.22,
          }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            ref={videoRef}
            src="/hero_intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dynamic Dark Vignette Glow */}
        <motion.div 
          animate={{
            opacity: introPhase === "video" ? 0.35 : 0.95
          }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950/80 to-slate-950" 
        />
      </div>


      {/* ── PHASE 1: VIDEO HERO OVERLAY ──────────────────────────────── */}
      <AnimatePresence>
        {introPhase === "video" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 pointer-events-auto"
          >
            {/* Small Top Right Skip Intro Button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={enterDualReel}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-slate-950/50 backdrop-blur-md text-amber-200/90 text-[10px] uppercase tracking-[0.2em] font-mono hover:bg-amber-500/20 hover:border-amber-300 hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer z-50"
            >
              <span>Skip Intro</span>
              <ChevronRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>

            {/* Bottom Middle Enter Gallery Button */}
            <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-40">
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onClick={enterDualReel}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border border-amber-300/40"
              >
                <span className="relative z-10">ENTER GALLERY</span>
                <span className="relative z-10 text-amber-950">✦</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ── PHASE 2: ORIGINAL DUAL 3D HALO REELS (TWO-SIDES LOOP) ─────── */}
      <AnimatePresence>
        {introPhase === "reel" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 flex-1 flex flex-col w-full h-full overflow-hidden ${
              selectedHaloImage ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            {/* Navbar */}
            <header className="w-full px-6 md:px-10 py-4 flex items-center justify-between border-b border-amber-500/15 backdrop-blur-md bg-slate-950/60 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full border border-amber-400/50 flex items-center justify-center bg-amber-500/15 text-amber-300 font-serif font-bold text-lg shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  ✦
                </div>
                <span className="font-serif text-lg tracking-wider text-amber-100/90 font-semibold">
                  Gallery Trinity
                </span>
              </div>

              <nav className="flex items-center gap-4 text-xs tracking-widest text-slate-300/80 uppercase font-mono">
                <button 
                  onClick={() => setIntroPhase("video")}
                  className="flex items-center gap-1.5 text-amber-300/90 hover:text-amber-200 border border-amber-500/30 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Watch Intro</span>
                </button>
                <button 
                  onClick={triggerFogTransition}
                  className="flex items-center gap-1.5 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 transition-all cursor-pointer font-semibold shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  <span>Event Discs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </nav>
            </header>

            {/* Title Section */}
            <div className="w-full flex flex-col items-center justify-center pt-4 pb-1 text-center z-20 px-4">
              <h1 className="text-xl md:text-3xl font-serif tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 drop-shadow-[0_4px_25px_rgba(245,158,11,0.35)] font-bold">
                Trinity Gallery
              </h1>
              <p className="mt-1 text-[9px] md:text-[11px] uppercase tracking-[0.45em] text-amber-400/70 font-mono">
                A Picture of Memories • Dual 3D Showcase
              </p>
            </div>

            {/* Original Dual 3D Halo Reel Showcase Component */}
            <div className="flex-1 flex flex-col items-center justify-center py-0 px-2 md:px-6 overflow-hidden">
              <div className="w-full max-w-[1700px] mx-auto">
                <DemoOne onSelectImage={setSelectedHaloImage} />
              </div>
            </div>

            {/* Bottom Scroll Prompt Bar */}
            <div className="w-full py-3 border-t border-amber-500/15 backdrop-blur-md bg-slate-950/60 flex items-center justify-between px-6 z-20">
              <span className="text-[10px] text-slate-400/70 font-mono tracking-widest hidden sm:inline">
                © 2026 GALLERY TRINITY
              </span>

              <button
                onClick={triggerFogTransition}
                className="mx-auto sm:mx-0 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-300 hover:text-amber-200 transition-colors cursor-pointer group"
              >
                <span>Scroll or click to Relive the Past in Fog</span>
                <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ── PHASE 3: FOG TRANSITION OVERLAY ("RELIVE THE PAST") ────────── */}
      <AnimatePresence>
        {introPhase === "fog" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            onClick={() => setIntroPhase("discs")}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-slate-950/85 backdrop-blur-xl cursor-pointer"
          >
            {/* Animated Mist / Fog Layers */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-to-r from-amber-500/20 via-slate-100/10 to-amber-500/20 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute top-1/3 left-1/3 w-[600px] h-[300px] bg-amber-400/15 rounded-full blur-[100px] animate-ping" style={{ animationDuration: '6s' }} />
            </div>

            {/* Fog Text Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-[10px] uppercase tracking-[0.3em] font-mono mb-4 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Memory Archives</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 drop-shadow-[0_8px_35px_rgba(245,158,11,0.4)] font-bold"
              >
                Relive The Past
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 1.2, delay: 0.7 }}
                className="mt-3 text-xs sm:text-sm uppercase tracking-[0.4em] text-amber-300/80 font-mono"
              >
                Moments etched in time & gold
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                className="mt-10 text-[10px] uppercase tracking-[0.3em] text-amber-400/60 font-mono"
              >
                Click anywhere to reveal vinyl event collection
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ── PHASE 4: EVENT VINYL DISCS & MOBILE GALLERY GRID ─────────── */}
      <AnimatePresence>
        {introPhase === "discs" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 flex-1 flex flex-col w-full h-full overflow-hidden ${
              selectedPhoto ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            {/* Header / Navbar */}
            <header className="w-full px-6 md:px-10 py-4 flex items-center justify-between border-b border-amber-500/15 backdrop-blur-md bg-slate-950/60 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIntroPhase("reel")}
                  className="h-8 w-8 rounded-full border border-amber-400/50 flex items-center justify-center bg-amber-500/15 text-amber-300 font-serif font-bold text-lg shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:bg-amber-500/30 transition-all cursor-pointer"
                  title="Back to 3D Reels"
                >
                  <ArrowLeft className="w-4 h-4 text-amber-300" />
                </button>
                <span className="font-serif text-lg tracking-wider text-amber-100/90 font-semibold">
                  Eventwise Archives
                </span>
              </div>

              {/* View Mode Switcher Nav */}
              <div className="flex items-center gap-2 p-1 rounded-full border border-amber-500/30 bg-slate-900/60 backdrop-blur-md">
                <button
                  onClick={() => setDiscsViewMode("discs")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    discsViewMode === "discs" 
                      ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
                      : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  <Disc className="w-3.5 h-3.5" />
                  <span>Vinyl Discs</span>
                </button>

                <button
                  onClick={() => setDiscsViewMode("mobile-gallery")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    discsViewMode === "mobile-gallery" 
                      ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
                      : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Mobile Grid</span>
                </button>
              </div>

              <nav className="flex items-center gap-3 text-xs tracking-widest text-slate-300/80 uppercase font-mono hidden md:flex">
                <button 
                  onClick={() => setIntroPhase("reel")}
                  className="flex items-center gap-1.5 text-amber-300/90 hover:text-amber-200 border border-amber-500/30 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer"
                >
                  <span>3D Reels</span>
                </button>
              </nav>
            </header>

            {/* Section Title */}
            <div className="w-full flex flex-col items-center justify-center pt-4 pb-1 text-center z-20 px-4">
              <h1 className="text-xl md:text-3xl font-serif tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 drop-shadow-[0_4px_25px_rgba(245,158,11,0.35)] font-bold">
                {discsViewMode === "discs" ? "Vinyl Event Catalogue" : "Mobile Gallery View"}
              </h1>
              <p className="mt-1 text-[9px] md:text-[11px] uppercase tracking-[0.45em] text-amber-400/70 font-mono">
                {discsViewMode === "discs" ? "Select an event disc to open photos" : "Browse all event photos in grid layout"}
              </p>
            </div>

            {/* DISCS CAROUSEL VIEW */}
            {discsViewMode === "discs" && (
              <div className="flex-1 w-full relative overflow-hidden flex flex-col justify-center">
                <DiscCascadeCarousel
                  items={discCascadeItems}
                  height="75vh"
                  discSize="clamp(190px, min(48vmin, 36vw), 380px)"
                  spacing={1.05}
                  rise={0.22}
                  depth={0.45}
                  yaw={24}
                  fan={-12}
                  tilt={-5}
                  roll={110}
                  spin={18}
                  sheen={0.65}
                  bounce={0.25}
                  duration={0.85}
                  loop={true}
                  autoplay={4500}
                  brand="TRINITY"
                  hint="DRAG OR SWIPE DISCS TO EXPLORE EVENTS"
                  background="transparent"
                  color="#f59e0b"
                  serif='"Instrument Serif", "Times New Roman", serif'
                  sans='"Inter", sans-serif'
                  display='"Oswald", sans-serif'
                  onSelect={(item) => {
                    if (item.eventId) {
                      setSelectedEventId(item.eventId);
                      setDiscsViewMode("mobile-gallery");
                    }
                  }}
                />
              </div>
            )}

            {/* MOBILE GALLERY GRID VIEW */}
            {discsViewMode === "mobile-gallery" && (
              <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-4 overflow-y-auto flex flex-col">
                
                {/* Event Category Tabs Bar */}
                <div className="w-full flex items-center justify-between border-b border-amber-500/20 pb-3 mb-6 flex-wrap gap-3">
                  <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full scrollbar-none">
                    <button
                      onClick={() => setSelectedEventId(null)}
                      className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                        selectedEventId === null 
                          ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
                          : "bg-slate-900/60 text-amber-200/70 border-amber-500/20 hover:border-amber-400/50"
                      }`}
                    >
                      All Events ({allPhotos.length})
                    </button>

                    {EVENTS_DATA.map((ev) => (
                      <button
                        key={ev.id}
                        onClick={() => setSelectedEventId(ev.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                          selectedEventId === ev.id 
                            ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
                            : "bg-slate-900/60 text-amber-200/70 border-amber-500/20 hover:border-amber-400/50"
                        }`}
                      >
                        {ev.title} ({ev.photos.length})
                      </button>
                    ))}
                  </div>

                  {selectedEventId && (
                    <button
                      onClick={() => setDiscsViewMode("discs")}
                      className="flex items-center gap-1.5 text-xs text-amber-300/80 hover:text-amber-200 font-mono uppercase tracking-wider cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Discs</span>
                    </button>
                  )}
                </div>

                {/* Mobile Gallery Block Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 pb-12">
                  {displayedPhotos.map((photo) => (
                    <motion.div
                      key={photo.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-amber-500/20 shadow-lg cursor-pointer hover:border-amber-400/60 transition-all duration-300"
                    >
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                      <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col justify-end">
                        <span className="text-[9px] uppercase tracking-widest text-amber-400/80 font-mono">
                          {photo.eventName}
                        </span>
                        <span className="text-xs sm:text-sm font-serif font-semibold text-amber-100 line-clamp-1 group-hover:text-amber-300 transition-colors">
                          {photo.title}
                        </span>
                      </div>

                      <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/70 border border-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <footer className="w-full px-8 py-3 border-t border-amber-500/10 backdrop-blur-sm bg-slate-950/60 text-center text-[10px] text-slate-400/70 font-mono tracking-widest z-20">
              <span>© 2026 GALLERY TRINITY • ALL RIGHTS RESERVED</span>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ── ENLARGED MODAL FOR HALO REEL PICTURES ───────────────────── */}
      <AnimatePresence>
        {selectedHaloImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedHaloImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg cursor-pointer pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl max-h-[85vh] flex flex-col items-center justify-center overflow-visible bg-transparent p-2"
            >
              <button
                onClick={() => setSelectedHaloImage(null)}
                className="absolute -top-3 -right-3 z-50 p-2 rounded-full bg-slate-950/90 text-amber-200 hover:text-white hover:bg-amber-500/30 border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-200 cursor-pointer"
                aria-label="Close enlarged view"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative flex flex-col items-center group">
                <div className="relative inline-block overflow-hidden drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
                  <img
                    src="/frame_gold_thin.png"
                    alt="Authentic Carved Vintage Baroque Frame"
                    className="w-[320px] sm:w-[380px] md:w-[440px] max-w-full h-auto pointer-events-none drop-shadow-2xl z-20 relative"
                  />

                  <div className="absolute inset-0 z-10 flex items-center justify-center p-[8.3%]">
                    <div className="relative w-full h-full flex items-center justify-center bg-black/90 overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,0.85)] border border-amber-950/40">
                      {selectedHaloImage.src ? (
                        <img
                          src={selectedHaloImage.src}
                          alt={selectedHaloImage.alt ?? "Enlarged artwork"}
                          className="w-full h-full object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center"
                          style={{
                            backgroundColor: selectedHaloImage.bgColor,
                            color: selectedHaloImage.textColor,
                          }}
                        >
                          <span className="text-3xl font-black">{selectedHaloImage.title}</span>
                          <span className="text-xs uppercase tracking-widest opacity-70">{selectedHaloImage.subtitle}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedHaloImage.alt ? (
                  <div className="mt-2.5 px-5 py-1.5 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border border-amber-500/50 shadow-[0_8px_25px_rgba(0,0,0,0.9)] flex flex-col items-center text-center rounded-sm max-w-xs sm:max-w-sm relative z-30">
                    <div className="absolute top-1 left-2 text-[7px] text-amber-400/40 font-mono">✦</div>
                    <div className="absolute top-1 right-2 text-[7px] text-amber-400/40 font-mono">✦</div>
                    <span className="font-serif text-xs md:text-sm text-amber-100 tracking-wider drop-shadow-md font-semibold">
                      {selectedHaloImage.alt}
                    </span>
                    <span className="mt-0.5 text-[8px] md:text-[9px] text-amber-400/70 font-mono uppercase tracking-[0.25em]">
                      TRINITY GALLERY EXHIBIT • GOLD BAROQUE FRAME
                    </span>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>


      {/* ── ENLARGED MODAL FOR EVENT PHOTO GRID ─────────────────────── */}
      <AnimatePresence>
        {selectedPhoto ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg cursor-pointer pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl max-h-[85vh] flex flex-col items-center justify-center overflow-visible bg-transparent p-2"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 z-50 p-2 rounded-full bg-slate-950/90 text-amber-200 hover:text-white hover:bg-amber-500/30 border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-200 cursor-pointer"
                aria-label="Close enlarged view"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative flex flex-col items-center group">
                <div className="relative inline-block overflow-hidden drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
                  <img
                    src="/frame_gold_thin.png"
                    alt="Authentic Carved Vintage Baroque Frame"
                    className="w-[320px] sm:w-[380px] md:w-[440px] max-w-full h-auto pointer-events-none drop-shadow-2xl z-20 relative"
                  />

                  <div className="absolute inset-0 z-10 flex items-center justify-center p-[8.3%]">
                    <div className="relative w-full h-full flex items-center justify-center bg-black/90 overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,0.85)] border border-amber-950/40">
                      <img
                        src={selectedPhoto.src}
                        alt={selectedPhoto.title}
                        className="w-full h-full object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 px-5 py-2 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border border-amber-500/50 shadow-[0_8px_25px_rgba(0,0,0,0.9)] flex flex-col items-center text-center rounded-sm max-w-xs sm:max-w-sm relative z-30">
                  <div className="absolute top-1 left-2 text-[7px] text-amber-400/40 font-mono">✦</div>
                  <div className="absolute top-1 right-2 text-[7px] text-amber-400/40 font-mono">✦</div>
                  <span className="font-serif text-xs md:text-sm text-amber-100 tracking-wider drop-shadow-md font-semibold">
                    {selectedPhoto.title}
                  </span>
                  <span className="mt-0.5 text-[8px] md:text-[9px] text-amber-400/70 font-mono uppercase tracking-[0.25em]">
                    {selectedPhoto.eventName} • {selectedPhoto.date} • {selectedPhoto.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
