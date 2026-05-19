import React, { useState } from "react";
import { Target, PenTool, ClipboardList, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Mentorship", "Writing", "Test Series", "Notes"];

  const courseData = [
    {
      id: 1,
      title: "One-on-One Mentorship Program",
      badge: "BESTSELLER",
      tagline: "Popular",
      price: "Premium Plan",
      category: "Mentorship",
      bullets: [
        "1 on 1 Sessions with Toppers",
        "Holistic Strategy & Scheduling",
        "Notes Making Guidance"
      ],
      icon: Target,
      iconColor: "text-[#163F66] bg-[#163F66]/5 border-[#163F66]/10",
      badgeColor: "bg-orange-50 text-orange-600 border-orange-100"
    },
    {
      id: 2,
      title: "Daily Answer Writing Program",
      badge: "MOST ENROLLED",
      tagline: null,
      price: "₹9,999/-",
      category: "Writing",
      bullets: [
        "Unlimited Evaluation in 24 hrs",
        "1 on 1 Doubt Clearance",
        "GS & Essay Coverage"
      ],
      icon: PenTool,
      iconColor: "text-[#163F66] bg-[#163F66]/5 border-[#163F66]/10",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-100"
    },
    {
      id: 3,
      title: "Prelims 2026 Test Series",
      badge: "NEW BATCH",
      tagline: null,
      price: "₹1,999/-",
      category: "Test Series",
      bullets: [
        "55 Comprehensive Tests",
        "PYQ Based Revision",
        "Holistic CA Coverage"
      ],
      icon: ClipboardList,
      iconColor: "text-[#163F66] bg-[#163F66]/5 border-[#163F66]/10",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    }
  ];

  const filteredCourses = activeCategory === "All"
    ? courseData
    : courseData.filter(course => course.category === activeCategory);

  const openCurriculum = (title) => {
    window.alert(`This program "${title}" is currently under construction. Please check back later!`);
  };

  return (
    <section id="courses" className="pt-20 pb-10 px-4 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Title Block */}
        <div className="mb-14 text-center">
          <p className="text-[13px] sm:text-sm font-extrabold tracking-widest text-[#163F66] uppercase mb-3">
            Choose the right path for your UPSC journey
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight mb-4">
            OUR <span className="text-[#EF961D]">PROGRAMS</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#EF961D] mx-auto rounded-full shadow-sm"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16 max-w-2xl mx-auto px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold border transition-all duration-350 cursor-pointer ${activeCategory === category
                ? "bg-[#163F66] text-white border-[#163F66] shadow-md scale-105"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => {
              const IconComponent = course.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.35 }}
                  key={course.id}
                  className="flex flex-col bg-white rounded-[20px] border border-slate-200/80 hover:border-slate-300/80 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.01] min-h-[460px] relative overflow-hidden group flex-1"
                >
                  {/* Premium Solid Top Accent Bar (like high-end academic journals & portals) */}
                  <div className="absolute top-0 left-0 w-full h-[5px] bg-[#163F66]" />

                  {/* Inner Content Wrapper */}
                  <div className="p-7 sm:p-8 flex flex-col flex-grow">
                    {/* Top Badges Row */}
                    <div className="flex justify-between items-center w-full mb-6 mt-1">
                      {/* Round Square Icon */}
                      <div className={`p-2.5 rounded-xl border ${course.iconColor} flex items-center justify-center`}>
                        <IconComponent size={20} className="stroke-[2.5]" />
                      </div>

                      {/* Tag pill */}
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold border tracking-wider uppercase ${course.badgeColor}`}>
                        {course.badge}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-xl font-black text-slate-900 leading-snug mb-3 pr-2 group-hover:text-[#163F66] transition-colors duration-300">
                      {course.title}
                    </h3>

                    {/* Pricing Panel */}
                    <div className="mb-6 flex items-center">
                      <div className="bg-[#EF961D]/5 text-slate-800 border border-[#EF961D]/15 px-3.5 py-1 rounded-xl font-black text-sm flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">Price:</span>
                        <span className="text-[#163F66]">{course.price}</span>
                      </div>
                    </div>

                    {/* Bullet Points with Checkmark Icons */}
                    <ul className="space-y-4 mb-8">
                      {course.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3.5">
                          {/* Checked Icon Badge */}
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#EF961D]/10 text-[#EF961D] shrink-0 mt-0.5">
                            <Check size={11} className="stroke-[3.5]" />
                          </div>
                          <span className="text-sm sm:text-base text-slate-600 font-bold leading-relaxed">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="mt-auto pt-4">
                      <button
                        onClick={() => openCurriculum(course.title)}
                        className="w-full py-3.5 rounded-[12px] bg-[#0b1329] hover:bg-[#EF961D] text-white hover:text-black font-extrabold text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
                      >
                        <span>View Program Details</span>
                        <ChevronRight size={14} className="stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Courses;
