import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const timelineData = {
  2020: [
    {
      year: 2020,
      image: "/images/datavisulation.png",
      text: "The Academy was founded with a simple but bold mission: to make data science practical, accessible, and career-focused. With small, focused batches and a curriculum grounded in Python, statistics, and machine learning fundamentals, the journey began with clarity and conviction.",
    },
  ],
  2021: [
    {
      year: 2021,
      image: "/images/ML.png",
      text: "Structured mentorship, hands-on projects, and real datasets became central to the learning experience. Students weren’t just attending classes — they were building portfolios, solving business problems, and developing confidence in their abilities.",
    },
  ],
  2022: [
    {
      year: 2022,
      image: "/images/Ai.png",
      text: "This year marked a breakthrough. Dedicated interview preparation, resume-building sessions, and real-world capstone projects were integrated into the programs. Learners began securing opportunities in competitive roles, proving that practical training delivers real results.",
    },
  ],
  2023: [
    {
      year: 2023,
      image: "/images/innovation-lab.jpeg",
      text: `The Academy’s impact became visible through its students’ success stories. Learners secured placements in leading tech companies, analytics firms, start-up’s, and enterprise organizations. Roles such as:
• Data Analyst
• Machine Learning Engineer
• Business Intelligence Analyst
• AI Engineer
• Data Scientist
became common outcomes rather than rare achievements.

Each placement represented more than a job offer — it represented transformation. Students who once doubted their path were now contributing to real-world AI and data-driven projects across industries.`,
    },
  ],
  2024: [
    {
      year: 2024,
      image: "/images/business.jpeg",
      text: "As AI technologies evolved, the Academy expanded into Deep Learning, NLP, and Generative AI. Students gained exposure to cutting-edge tools and deployment practices, preparing them for next-generation AI roles. The placement network grew stronger, backed by industry trust and alumni performance.",
    },
  ],
  2025: [
    {
      year: 2025,
      image: "/images/dataengineering.png",
      text: `With a growing alumni base and stronger hiring connections, iTopper established itself as a trusted talent partner. Placement support became more structured, and industry collaborations deepened — ensuring students were not just trained, but strategically positioned for success.

This year, iTopper took a major leap by introducing a specialized Agentic AI course, designed to equip learners with the skills to create autonomous, decision-making AI systems. Alongside, iTopper continued to strengthen industry partnerships, refine placement support, and expand mentorship networks. Learners were not just trained for current roles — they were prepared for the AI of the future.

Top placements continued to rise, with students joining leading organizations as AI Engineers, Machine Learning Researchers, Data Analysts, and Product AI Specialists.`,
    },
  ],
  2026: [
    {
      year: 2026,
      image: "/images/Ai.png",
      text: `With advanced courses like Agentic AI, expanding industry partnerships, and a growing global community of learners, the Academy continues to push boundaries in AI education. Each year builds on the last, preparing students not just for today’s opportunities, but for the evolving world of AI and data science.

The journey doesn’t stop here. iTopper is continuing to innovate, expand, and empower learners, shaping careers and the future of intelligent technologies for years to come.`,
    },
  ],
};

export default function Journey() {
  const [activeRange, setActiveRange] = useState("2020");
  const [activeIndex, setActiveIndex] = useState(0);

  const data = timelineData[activeRange] || [];
  const activeItem = data[activeIndex] || data[0];

  const handlePrev = () => {
    const keys = Object.keys(timelineData);
    const currentIndex = keys.indexOf(activeRange);
    if (currentIndex > 0) {
      setActiveRange(keys[currentIndex - 1]);
      setActiveIndex(0);
    } else {
      setActiveRange(keys[keys.length - 1]);
      setActiveIndex(0);
    }
  };

  const handleNext = () => {
    const keys = Object.keys(timelineData);
    const currentIndex = keys.indexOf(activeRange);
    if (currentIndex < keys.length - 1) {
      setActiveRange(keys[currentIndex + 1]);
      setActiveIndex(0);
    } else {
      setActiveRange(keys[0]);
      setActiveIndex(0);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white py-20 px-4 md:px-10 mt-16">
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black mb-4 tracking-wide">
          Our{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              background:
                "linear-gradient(90deg, #1e3a8a 30%, #1d4ed8 60%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Story
          </span>
        </h2>

        <h3 className="text-xl md:text-2xl font-bold text-gray-600 mb-8 italic">
          From Vision to Transformation (2020–2026)
        </h3>

        <div className="max-w-4xl mx-auto mb-12 text-gray-700 text-lg leading-relaxed text-center">
          <p className="mb-6">
            Behind every great journey is a spark — a moment when purpose meets
            courage.
          </p>
          <p>
            In 2020, when industries were rapidly awakening to the power of data
            and AI, Shivansh Shukla envisioned an institution that would do more
            than teach concepts — it would build careers. That vision became iTopper — a place where ambition meets direction and
            potential turns into performance.
          </p>
        </div>

        {/* Top Range Selector */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 text-gray-600 text-sm md:text-base font-medium border-b border-gray-200 pb-4">
          {Object.keys(timelineData).map((range) => (
            <button
              key={range}
              onClick={() => {
                setActiveRange(range);
                setActiveIndex(0);
              }}
              className={`pb-1 px-3 rounded-md transition-all ${
                activeRange === range
                  ? "text-transparent bg-clip-text border-b-2 border-[#1d4ed8] font-semibold"
                  : "hover:text-[#1d4ed8]"
              }`}
              style={
                activeRange === range
                  ? {
                      background:
                        "linear-gradient(90deg,#1e3a8a 30%,#1d4ed8 60%,#3b82f6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : {}
              }
            >
              {range}
            </button>
          ))}
        </div>

        {/* Navigation Arrows for small screens or quick switch */}
        <div className="flex items-center justify-between mt-6 text-black md:hidden">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="font-bold text-lg">{activeRange}</span>

          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Active Year Content */}
        {activeItem && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRange}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 bg-white backdrop-blur-lg rounded-3xl border border-gray-200 p-8 md:p-12 shadow-2xl"
            >
              <div className="w-full md:w-1/3 shrink-0">
                <img
                  src={activeItem.image}
                  alt={activeRange}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg border border-gray-200"
                />
              </div>
              <div className="text-gray-700 text-center md:text-left text-base md:text-lg leading-relaxed whitespace-pre-line">
                <h4 className="text-2xl font-bold text-black mb-4">
                  {activeRange} –{" "}
                  {activeRange === "2020"
                    ? "The First Step"
                    : activeRange === "2021"
                      ? "Learning with Purpose"
                      : activeRange === "2022"
                        ? "Turning Skills into Careers"
                        : activeRange === "2023"
                          ? "Celebrating Top Placements"
                          : activeRange === "2024"
                            ? "Advancing with AI Innovation"
                            : activeRange === "2025"
                              ? "Expanding Impact & Industry Trust"
                              : "Moving Forward, Shaping the Future"}
                </h4>
                {activeItem.text}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
