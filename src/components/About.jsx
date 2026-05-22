import React from "react";
import ScrollVelocity from "./ScrollVelocity";

const AboutUs = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-50 pb-16 pt-12 border-b border-slate-100"
    >
      {/* Redesigned About Us Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#EF961D] uppercase mb-3">
              ABOUT iTopper
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#163F66] tracking-tight leading-tight mb-6">
              Empowering Aspirants, <br />
              <span className="text-slate-800">Delivering UPSC Excellence.</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#EF961D] rounded-full mb-8"></div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-medium">
              iTopper is India's leading digital platform dedicated to comprehensive, result-oriented education for UPSC CSE, IAS, and allied Civil Services. Founded with a vision to democratize elite mentorship, we bridge the gap between dedication and high-caliber guidance.
            </p>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-medium">
              Since 2020, we have empowered thousands of civil services aspirants across India with structured course modules, real-time evaluation matrices, and strategic preparation roadmaps tailored to the evolving demand of the UPSC exam pattern.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full pt-6 border-t border-slate-200">
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-[#EF961D]">10K+</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Students Guided</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-[#EF961D]">150+</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Selections</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-[#EF961D]">24/7</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Mentorship</p>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Graphical Panel */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-[20px] p-8 sm:p-10 border border-slate-200/80 shadow-md relative overflow-hidden group">
              <h3 className="text-xl font-bold text-[#163F66] mb-6">Our Core Vision</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-medium italic border-l-4 border-[#EF961D] pl-4">
                "To cultivate analytical minds, ethical decision-making, and deep conceptual clarity in the next generation of civil servants, making world-class guidance accessible to every corner of India."
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xl">🎯</span>
                  <div>
                    <h5 className="font-semibold text-sm text-slate-800">Laser-Focused Syllabus</h5>
                    <p className="text-[11px] text-slate-500 font-medium">Updated dynamically for CSE changes.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xl">📊</span>
                  <div>
                    <h5 className="font-semibold text-sm text-slate-800">Advanced Analytics</h5>
                    <p className="text-[11px] text-slate-500 font-medium">Detailed feedback on answer writing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Why Choose Us Section is commented out as requested */}
      {/* <WhyChooseUs /> */}

      {/* Dynamic Text Ticker at the bottom */}
      <div className="h-[120px] flex items-center justify-center pointer-events-none mt-6">
        <ScrollVelocity
          texts={["iTopper - Crack UPSC with Us"]}
          numCopies={20}
          className="custom-scroll-text pt-4 text-slate-400 font-semibold tracking-wider"
        />
      </div>
    </section>
  );
};

export default AboutUs;
