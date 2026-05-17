import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Navigation from "./Navigation";
import { BookOpen, Star, PlayCircle, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const ProfessionalHero = () => {
  useEffect(() => {
    // Fire confetti from bottom left and right
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        particleCount,
        startVelocity: 40,
        spread: 360,
        ticks: 60,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#2563eb', '#3b82f6', '#60a5fa', '#fbbf24']
      });
      confetti({
        particleCount,
        startVelocity: 40,
        spread: 360,
        ticks: 60,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#2563eb', '#3b82f6', '#60a5fa', '#fbbf24']
      });
    }, 250);
    
    // Simple bottom blast
    confetti({
      particleCount: 150,
      spread: 100,
      startVelocity: 60,
      origin: { y: 1, x: 0.5 },
      colors: ['#2563eb', '#3b82f6', '#60a5fa', '#fbbf24', '#ffffff']
    });
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[95vh] bg-slate-50 overflow-hidden flex flex-col">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[80px]" />
        <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-indigo-100/40 blur-[80px]" />
      </div>

      {/* Navigation Layer */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navigation theme="light" />
      </div>

      {/* Main Hero Container */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 flex items-center pt-32 pb-16 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Content */}
          <div className="flex flex-col items-start text-left max-w-2xl xl:max-w-3xl z-10">
            {/* Trust Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
            >
              <Trophy size={16} className="text-yellow-500" />
              <span className="text-sm font-bold text-slate-800 tracking-wide">
                India's Premium UPSC Institute
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight"
            >
              Dream Big. <br className="hidden md:block" />
              Achieve <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Greater.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl font-medium"
            >
              Transform your aspirations into reality. Expert guidance, dynamic curriculum, and unwavering support to help you conquer the Civil Services Examination.
            </motion.p>

            {/* Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-14"
            >
              <HashLink
                smooth
                to="/#courses"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-full transition-all shadow-lg hover:shadow-blue-500/30"
              >
                Start Preparation
              </HashLink>
              <Link
                to="/register"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-full transition-all gap-2 shadow-sm"
              >
                <PlayCircle size={20} />
                Watch Demo
              </Link>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-8 sm:gap-12 pt-8 border-t border-slate-200 w-full max-w-xl"
            >
              <div>
                <h4 className="text-3xl font-black text-slate-900 mb-1">50k+</h4>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider text-[10px]">Aspirants Mentored</p>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
              <div>
                <h4 className="text-3xl font-black text-slate-900 mb-1">600+</h4>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider text-[10px]">Selections</p>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
              <div>
                <h4 className="text-3xl font-black text-slate-900 mb-1">Top 10</h4>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider text-[10px]">AIR Ranks</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visuals (3D Floating Image) */}
          <div className="relative w-full flex justify-center lg:justify-end mt-12 lg:mt-0 z-10 px-4 sm:px-0">
            {/* Main Floating Image */}
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotateZ: [0, 2, -1, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full max-w-[500px]"
            >
              {/* Backglow for 3D effect */}
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full transform scale-90 translate-y-10" />
              
              <img 
                src="/images/upsc_3d_hero.png" 
                alt="UPSC Preparation at iTopper" 
                className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl relative z-10 border-4 border-white"
              />

              {/* Floating Card 1 */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-6 -right-6 sm:-right-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 z-20"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Daily</p>
                  <p className="text-sm font-black text-slate-900">Live Classes</p>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-8 -left-4 sm:-left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex flex-col gap-1 z-20"
              >
                <div className="flex items-center gap-1 text-yellow-400 mb-1">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-sm font-black text-slate-900">Top Rated Tutors</p>
                <p className="text-xs text-slate-500 font-semibold">by 10k+ Students</p>
              </motion.div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProfessionalHero;
