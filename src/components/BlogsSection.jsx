import React from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

const BlogsSection = () => {
  const readArticleAlert = (title) => {
    window.alert(`The complete article "${title}" will be available on our official blog platform shortly. Stay tuned!`);
  };

  const blogs = [
    {
      id: 1,
      title: "Mastering UPSC Mains Answer Writing: 5 Pillar Strategy",
      category: "Strategy",
      date: "May 15, 2026",
      readTime: "6 min read",
      excerpt: "Learn how to structure your answers, manage word limits, and incorporate diagrams to stand out and score maximum marks in GS papers.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      title: "GS Paper IV (Ethics): How to Score 120+ Marks",
      category: "Syllabus Guide",
      date: "May 12, 2026",
      readTime: "8 min read",
      excerpt: "A comprehensive analysis of GS4. Learn how to write impactful case studies, quote philosophers, and present ethical dilemmas cleanly.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      title: "Prioritizing Current Affairs: Pre-cum-Mains Approach",
      category: "Current Affairs",
      date: "May 10, 2026",
      readTime: "5 min read",
      excerpt: "Uncover the exact framework to filter daily newspapers, link current events to static syllabus topics, and write factual data points.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section id="blogs" className="py-10 px-4 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#EF961D] uppercase mb-3 block">
            iTOOPER INSIGHTS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#163F66] tracking-tight mb-4">
            LATEST <span className="text-[#EF961D]">ARTICLES</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#EF961D] mx-auto rounded-full shadow-sm"></div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto items-stretch">
          {blogs.map((blog) => (
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              key={blog.id}
              className="flex flex-col bg-white rounded-[20px] border border-slate-200/80 hover:border-slate-350 shadow-md hover:shadow-lg overflow-hidden group transition-shadow duration-300 h-full flex-1"
            >
              {/* Blog Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />

                {/* Category badge */}
                <span className="absolute top-4 left-4 bg-white border border-slate-200 px-3 py-1 rounded-md text-[10px] font-black text-[#163F66] tracking-wider uppercase shadow-sm">
                  {blog.category}
                </span>
              </div>

              {/* Blog Content */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow text-left">
                {/* Metadata Row */}
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3.5">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#EF961D]" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-[#EF961D]" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-slate-900 leading-snug mb-3 pr-1 group-hover:text-[#163F66] transition-colors duration-300">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 font-bold leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Read Link */}
                <div className="mt-auto pt-3 border-t border-slate-100">
                  <button
                    onClick={() => readArticleAlert(blog.title)}
                    className="flex items-center gap-2 text-sm font-black text-[#163F66] hover:text-[#EF961D] transition-colors duration-300 cursor-pointer group/btn"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={13} className="stroke-[3] transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogsSection;
