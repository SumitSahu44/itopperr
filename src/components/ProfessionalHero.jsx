import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Navigation from "./Navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const ProfessionalHero = () => {
  useEffect(() => {
    // Burst confetti on mount for an impressive, premium welcome effect
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
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
        colors: ['#0a2968', '#1e40af', '#3b82f6', '#93c5fd', '#ffffff']
      });
      confetti({
        particleCount,
        startVelocity: 40,
        spread: 360,
        ticks: 60,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#0a2968', '#1e40af', '#3b82f6', '#93c5fd', '#ffffff']
      });
    }, 250);

    confetti({
      particleCount: 150,
      spread: 100,
      startVelocity: 60,
      origin: { y: 1, x: 0.5 },
      colors: ['#0a2968', '#1e40af', '#3b82f6', '#93c5fd', '#ffffff']
    });

    return () => clearInterval(interval);
  }, []);

  const facultyData = [
    {
      name: "Amit Kumar",
      image: "/images/Amit Kumar.jpeg",
      description: "Mentor (Ex-IRS)",
    },
    {
      name: "Abhinav Bharati",
      image: "/images/Abhinav Bharati.jpeg",
      description: "( Founder and Mentor )",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#f2f8fc] via-[#f7fbfd] to-white overflow-hidden flex flex-col">
      {/* Decorative Subtle Background Gradients */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[450px] h-[450px] rounded-full bg-blue-100/30 blur-[100px]" />
        <div className="absolute top-[30%] -left-[10%] w-[350px] h-[350px] rounded-full bg-[#0a2968]/5 blur-[100px]" />
      </div>

      {/* Navigation Layer */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navigation theme="light" />
      </div>

      {/* Main Hero Container */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center pt-20 md:pt-28 pb-12 sm:pb-16 relative z-10 max-w-7xl">

        {/* Center Logo/Branding Block */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mt-2 md:mt-4 mb-2 sm:mb-4 select-none"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight flex items-center justify-center font-sans">
            <span className="text-[#0a2968] lowercase">i</span>
            <span className="text-[#0a2968] uppercase">Topper</span>
          </h1>
        </motion.div>

        {/* Pillars / Key Features Underlined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-y-6 gap-x-4 md:gap-12 lg:gap-20 mb-6 md:mb-10 text-center w-full max-w-5xl px-4"
        >
          {/* Pillar 1 */}
          <div className="flex flex-col items-center group">
            <span className="text-[15px] sm:text-lg md:text-2xl lg:text-3xl font-black text-slate-800 tracking-tight transition-colors duration-300 group-hover:text-[#0a2968] whitespace-nowrap">
              Credible Faculty
            </span>
            <div className="w-[85%] h-[3px] bg-[#0a2968] mt-2 rounded-full transition-all duration-300 group-hover:w-full group-hover:scale-105"></div>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col items-center group">
            <span className="text-[15px] sm:text-lg md:text-2xl lg:text-3xl font-black text-slate-800 tracking-tight transition-colors duration-300 group-hover:text-[#0a2968] whitespace-nowrap">
              Quality Content
            </span>
            <div className="w-[85%] h-[3px] bg-[#0a2968] mt-2 rounded-full transition-all duration-300 group-hover:w-full group-hover:scale-105"></div>
          </div>

          {/* Pillar 3 */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center group">
            <span className="text-[15px] sm:text-lg md:text-2xl lg:text-3xl font-black text-slate-800 tracking-tight transition-colors duration-300 group-hover:text-[#0a2968] whitespace-nowrap">
              Affordable Courses
            </span>
            <div className="w-[45%] md:w-[85%] h-[3px] bg-[#0a2968] mt-2 rounded-full transition-all duration-300 group-hover:w-full group-hover:scale-105"></div>
          </div>
        </motion.div>

        {/* Faculty Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 lg:gap-16 w-full max-w-4xl px-4 sm:px-6 justify-center mx-auto"
        >
          {facultyData.map((faculty, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Circular Headshot Container with custom yellow-orange border */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1 border-2 border-[#0a2968] bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 flex items-center justify-center">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Slanted Parallelogram Name Banner */}
              <div className="relative w-full max-w-[200px] sm:max-w-[240px] flex justify-center z-10 mt-[-20px] px-2 select-none">
                {/* Underlay Ribbon Shadow */}
                <div className="absolute top-1.5 left-2 w-full h-9 sm:h-10 bg-[#0a2968]/30 -skew-x-12 z-0 rounded-[2px]" />

                {/* Foreground Ribbon */}
                <div className="bg-[#0a2968] py-1.5 sm:py-2 w-full font-black text-center text-xs sm:text-sm md:text-base text-white -skew-x-12 z-10 shadow-md rounded-[2px] border border-[#0a2968]/10">
                  <div className="skew-x-12 tracking-wide font-extrabold uppercase">
                    {faculty.name}
                  </div>
                </div>
              </div>

              {/* Description below */}
              <p className="mt-5 text-center text-xs sm:text-sm md:text-base text-slate-700 font-bold max-w-[250px] leading-relaxed">
                {faculty.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Poster Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="w-full max-w-6xl px-1 sm:px-6 mt-8 sm:mt-16"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0a2968]/20 bg-white group hover:scale-[1.01] transition-all duration-300">
            <img
              src="/images/poster.jpeg"
              alt="iTopper Poster"
              className="w-full h-auto object-cover"
            />
            {/* Subtle glow / border overlay */}
            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
          </div>
        </motion.div>

        {/* Premium CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12 sm:mt-16 w-full max-w-md px-4 relative z-20"
        >
          <HashLink
            smooth
            to="/#courses"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0a2968] text-white hover:bg-white hover:text-[#0a2968] border-2 border-transparent hover:border-[#0a2968] transition-all duration-300 font-extrabold rounded-lg shadow-lg hover:shadow-[#0a2968]/20 text-center uppercase tracking-wider text-sm"
          >
            Start Preparation
          </HashLink>
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 border-2 border-[#0a2968] text-[#0a2968] hover:bg-[#0a2968] hover:text-white transition-all duration-300 font-extrabold rounded-lg text-center uppercase tracking-wider text-sm bg-white"
          >
            Register Now
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ProfessionalHero;
