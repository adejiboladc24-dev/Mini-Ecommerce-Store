import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const Loader = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 animate-pulse"></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo - Same as Navbar */}
        <div className="mb-8 flex justify-center">
          <div className="relative animate-pulse">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-50 blur-2xl animate-pulse"></div>
            
            {/* Logo box - rotating */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-primary via-purple-500 to-secondary flex items-center justify-center shadow-2xl animate-spin-slow">
              <Sparkles className="text-white animate-pulse" size={40} />
            </div>
          </div>
        </div>

        {/* Brand name - Same as Navbar */}
        <div className="animate-fade-in-up">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            LuxeStore
          </h1>
          
          <p className="text-white/70 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold animate-fade-in">
            Premium Collection
          </p>
        </div>

        {/* Loading dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
