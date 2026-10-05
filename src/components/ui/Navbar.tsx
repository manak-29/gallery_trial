import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const Navbar = ({ onAdminClick }: { onAdminClick?: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for frosted glass navbar effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { title: "Events", path: "/events" },
    { title: "Teams", path: "/teams" },
    { title: "Gallery", path: "/gallery" },
    { title: "Sponsors", path: "/sponsors" },
    { title: "Leaderboard", path: "/leaderboard" },
    { title: "Registrations", path: "/registrations" },
    { title: "Contact Us", path: "/contact" },
  ];

  // Left group: 4 links (Events, Teams, Gallery, Sponsors)
  const leftLinks = navLinks.slice(0, 4);
  // Right group: 3 links (Leaderboard, Registrations, Contact Us)
  const rightLinks = navLinks.slice(4);

  const linkColor = "#dc9d4a"; // gold color
  const lightGold = "#f3cf9b";

  return (
    <>
      {/* =========================================
          DESKTOP NAVBAR (Screen width >= 1024px)
          ========================================= */}
      <header
        className={`hidden lg:flex fixed top-0 left-0 w-full z-50 items-center justify-between transition-all duration-300 px-6 xl:px-12 ${
          scrolled
            ? "bg-[#050b18]/85 py-3 backdrop-blur-md border-b border-[#dc9d4a]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-5"
        }`}
        style={{
          fontFamily: "'Reggae One', cursive",
        }}
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-12 items-center gap-2">
          {/* Left Group (Col 1-5): 4 Links */}
          <nav className="col-span-5 flex items-center justify-start space-x-2 xl:space-x-6">
            {leftLinks.map((link) => {
              const isActive = link.path === "/gallery"; // hardcoded active for current page
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className="px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap hover:scale-105"
                  style={{
                    color: linkColor,
                    backgroundColor: isActive
                      ? "rgba(243, 207, 155, 0.2)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(243,207,155,0.35)"
                      : "1px solid transparent",
                  }}
                  onClick={(e) => {
                     // prevent default for demo purposes except gallery
                     if (link.path !== "/gallery") e.preventDefault();
                  }}
                >
                  {link.title}
                </a>
              );
            })}
          </nav>

          {/* Center Group (Col 6-7): Trinity Logo */}
          <div className="col-span-2 flex items-center justify-center">
            <a
              href="/"
              onClick={(e) => e.preventDefault()}
              className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
            >
              <img
                src="/trinity_logo.png"
                alt="Trinity Logo"
                className="h-10 xl:h-12 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(220,157,74,0.3)]"
              />
            </a>
          </div>

          {/* Right Group (Col 8-12): 3 Links + Admin */}
          <nav className="col-span-5 flex items-center justify-end space-x-2 xl:space-x-4">
            {rightLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap hover:scale-105"
                style={{
                  color: linkColor,
                  backgroundColor: "transparent",
                  border: "1px solid transparent",
                }}
                onClick={(e) => e.preventDefault()}
              >
                {link.title}
              </a>
            ))}
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer hover:scale-105"
                style={{
                  color: linkColor,
                  backgroundColor: "rgba(220,157,74,0.12)",
                  border: `1px solid rgba(220,157,74,0.35)`,
                  fontFamily: "'Reggae One', cursive",
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                }}
              >
                Admin
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* =========================================
          MOBILE & TABLET TOP BAR (Screen width < 1024px)
          ========================================= */}
      <header
        className={`lg:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-3 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? "bg-[#050b18]/90 backdrop-blur-md border-b border-[#dc9d4a]/25 shadow-lg"
            : "bg-[#050b18]/40 backdrop-blur-sm"
        }`}
        style={{
          fontFamily: "'Reggae One', cursive",
        }}
      >
        {/* Mobile Left: Logo */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }}
          className="flex items-center space-x-2"
        >
          <img
            src="/trinity_logo.png"
            alt="Trinity Logo"
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </a>

        {/* Mobile Right: Hamburger Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center"
          style={{
            color: linkColor,
            backgroundColor: isMenuOpen
              ? "rgba(220, 157, 74, 0.2)"
              : "rgba(11, 26, 59, 0.8)",
            border: `1px solid ${linkColor}`,
          }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* =========================================
          MOBILE & TABLET MENU OVERLAY
          ========================================= */}
      <div
        className={`lg:hidden fixed inset-0 z-40 backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(5, 11, 24, 0.96)",
          fontFamily: "'Reggae One', cursive",
        }}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
          {/* Centered Logo in Drawer Header */}
          <div className="flex justify-center mb-6">
            <a href="/" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }}>
              <img
                src="/trinity_logo.png"
                alt="Trinity Logo"
                className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(220,157,74,0.3)]"
              />
            </a>
          </div>

          {/* Navigation Links list */}
          <nav className="flex flex-col space-y-2.5 max-w-sm mx-auto w-full flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = link.path === "/gallery";
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className="w-full text-center px-6 py-3 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 block"
                  style={{
                    color: linkColor,
                    backgroundColor: isActive
                      ? "rgba(243, 207, 155, 0.2)"
                      : "rgba(11, 26, 59, 0.5)",
                    border: isActive
                      ? "1px solid rgba(243,207,155,0.4)"
                      : "1px solid rgba(220, 157, 74, 0.15)",
                  }}
                  onClick={(e) => {
                    if (link.path !== "/gallery") e.preventDefault();
                    setIsMenuOpen(false);
                  }}
                >
                  {link.title}
                </a>
              );
            })}
          </nav>

          {/* Quick Call-To-Action in Drawer */}
          <div className="mt-6 pt-4 border-t border-[#dc9d4a]/20 max-w-sm mx-auto w-full flex flex-col gap-3 text-center">
            {onAdminClick && (
              <button
                onClick={() => { onAdminClick(); setIsMenuOpen(false); }}
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-bold text-sm transition-all cursor-pointer"
                style={{
                  backgroundColor: "rgba(220, 157, 74, 0.15)",
                  color: lightGold,
                  border: "1px solid rgba(220, 157, 74, 0.3)",
                  fontFamily: "'Reggae One', cursive",
                }}
              >
                <span>Admin Panel</span>
              </button>
            )}
            <a
              href="/announcements"
              onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }}
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-bold text-sm transition-all"
              style={{
                backgroundColor: "rgba(220, 157, 74, 0.15)",
                color: lightGold,
                border: "1px solid rgba(220, 157, 74, 0.3)",
              }}
            >
              <Sparkles size={16} style={{ color: linkColor }} />
              <span>Latest Announcements</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
