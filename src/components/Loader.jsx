import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 80); // 4 seconds total (100 / 2 * 80ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e]">
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-secondary/20 animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 2,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [0, 1, 0],
              scale: [0, Math.random() * 2, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Animated logo container */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Outer glow ring */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto"
          >
            {/* Gradient ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-20 blur-2xl"></div>
            
            {/* Logo box */}
            <motion.div
              animate={{ 
                rotate: -360,
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-4 rounded-3xl bg-gradient-to-br from-primary via-purple-500 to-secondary flex items-center justify-center shadow-2xl shadow-primary/50"
              style={{
                boxShadow: '0 0 60px rgba(108, 99, 255, 0.6), 0 0 100px rgba(0, 245, 255, 0.4)',
              }}
            >
              <Sparkles className="text-white" size={48} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Brand name with letter animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {['L', 'u', 'x', 'e', 'S', 't', 'o', 'r', 'e'].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.7 + index * 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-white/70 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase font-semibold"
          >
            Where Luxury Meets Lifestyle
          </motion.p>
        </motion.div>

        {/* Progress bar container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Progress bar background */}
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
            {/* Animated progress fill */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          {/* Progress percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-4 flex items-center justify-between text-white/60 text-sm"
          >
            <span>Loading Experience...</span>
            <span className="font-bold text-white">{progress}%</span>
          </motion.div>
        </motion.div>

        {/* Loading dots animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Corner decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-40 h-40 border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-32 h-32 border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/4 w-24 h-24 border border-white/5 rounded-full"
      />
    </div>
  );
};

export default Loader;
