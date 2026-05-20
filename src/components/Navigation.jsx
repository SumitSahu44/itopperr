import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { AuthContext } from "../context/AuthContext";
import { User, LogOut, LogIn, X, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const { user, logout, enrollments } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    {
      name: "Programs",
      isDropdown: true,
      subItems: [
        { name: "Mentorship - Prelims", href: "/curriculum/mentorship-prelims" },
        { name: "Mentorship - Mains", href: "/curriculum/mentorship-mains" },
        { name: "Mentorship - Comprehensive (Pre + Mains)", href: "/curriculum/mentorship-comprehensive" }
      ]
    },
    {
      name: "Mains Writing",
      isDropdown: true,
      subItems: [
        { name: "Daily Mains Answer Writing", href: "/curriculum/daily-mains-answer-writing" },
        { name: "Answer Writing with Test Series", href: "/curriculum/answer-writing-test-series" },
        { name: "Answer Evaluation", href: "/curriculum/answer-evaluation" }
      ]
    },
    {
      name: "Modules",
      isDropdown: true,
      subItems: [
        { name: "GS Paper IV - Ethics", href: "/curriculum/gs-paper-4-ethics" },
        { name: "Geography", href: "/curriculum/geography" },
        { name: "Environment", href: "/curriculum/environment" },
        { name: "Essay", href: "/curriculum/essay" }
      ]
    },
    { name: "Study With Me", href: "/#study" },
    { name: "Blogs", href: "/#blogs" },
    { name: "Contact", href: "/#contact" }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 30 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <nav className="relative z-50 bg-transparent w-full">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 relative z-50 shrink-0">
              <div className="w-28 sm:w-32 flex items-center justify-center">
                <img
                  src="/images/itopper.png"
                  alt="iTopper Logo"
                  className="w-full object-contain"
                />
              </div>
            </Link>

            {/* Desktop Menu - xl breakpoint handles larger items list nicely */}
            <div className="hidden xl:flex items-center space-x-5 lg:space-x-7">
              {navItems.map((item) => {
                if (item.isDropdown) {
                  return (
                    <div
                      key={item.name}
                      className="relative py-2"
                      onMouseEnter={() => setHoveredDropdown(item.name)}
                      onMouseLeave={() => setHoveredDropdown(null)}
                    >
                      <button
                        className={`flex items-center gap-1 font-bold text-sm tracking-wide ${theme === "light" ? "text-slate-800 hover:text-[#0a2968]" : "text-slate-200 hover:text-white"
                          } transition-colors duration-200 py-1 cursor-pointer`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${hoveredDropdown === item.name ? "rotate-180 text-[#0a2968]" : ""
                            }`}
                        />
                      </button>

                      {/* Dropdown Menu Container */}
                      <AnimatePresence>
                        {hoveredDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute top-full left-0 mt-2 w-72 rounded-2xl p-2 shadow-2xl border z-50 backdrop-blur-md ${theme === "light"
                                ? "bg-white border-slate-100 text-slate-800"
                                : "bg-[#0b1329] border-slate-800 text-slate-200"
                              }`}
                          >
                            {item.subItems.map((sub, idx) => (
                              <HashLink
                                smooth
                                key={idx}
                                to={sub.href}
                                className={`block px-4 py-3 text-[13px] font-extrabold rounded-xl transition-all duration-200 ${theme === "light"
                                    ? "hover:bg-slate-50 hover:text-[#0a2968] text-slate-700"
                                    : "hover:bg-white/5 hover:text-[#0a2968] text-slate-300"
                                  }`}
                              >
                                {sub.name}
                              </HashLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <HashLink
                    smooth
                    key={item.name}
                    to={item.href}
                    className={`relative text-sm font-bold tracking-wide ${theme === "light" ? "text-slate-800 hover:text-[#0a2968]" : "text-slate-200 hover:text-white"
                      } transition-colors duration-300 group`}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0a2968] transition-all duration-300 group-hover:w-full"></span>
                  </HashLink>
                );
              })}
            </div>

            {/* CTA Buttons (Login / Enroll Now / User Profile) */}
            <div className="hidden xl:flex items-center space-x-4 shrink-0">
              {user ? (
                <div className="flex items-center gap-3">
                  {/* Dashboard / Enroll Now Link */}
                  {enrollments && enrollments.length > 0 ? (
                    <Link
                      to="/my-courses"
                      className="px-5 py-2.5 bg-[#0a2968] hover:bg-white hover:text-[#0a2968] border border-[#0a2968] text-white rounded-xl font-extrabold text-sm shadow-md transition-all duration-300"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <HashLink
                      smooth
                      to="/#courses"
                      className={`px-5 py-2.5 border-2 rounded-xl font-extrabold text-sm transition-all duration-300 ${theme === "light"
                          ? "border-[#0a2968] text-[#0a2968] hover:bg-[#0a2968] hover:text-white"
                          : "border-white/20 text-white hover:bg-white/10"
                        }`}
                    >
                      Enroll Now
                    </HashLink>
                  )}

                  {/* Profile Indicator */}
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${theme === "light"
                        ? "bg-slate-50 border-slate-200/60"
                        : "bg-white/5 border-white/10"
                      }`}
                  >
                    <User size={14} className={theme === "light" ? "text-slate-600" : "text-slate-400"} />
                    <span className={`text-xs font-bold capitalize ${theme === "light" ? "text-slate-800" : "text-white"}`}>
                      {user.name?.split(" ")[0] || "Student"}
                    </span>
                  </div>

                  {/* Logout Icon */}
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className={`p-2 transition-colors duration-300 cursor-pointer ${theme === "light" ? "text-slate-600 hover:text-red-600" : "text-slate-400 hover:text-red-400"
                      }`}
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-[#0a2968] hover:bg-white hover:text-[#0a2968] border border-[#0a2968] text-white rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wider flex items-center gap-2"
                >
                  <LogIn size={16} /> Enroll Now
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`xl:hidden relative z-50 w-10 h-10 flex items-center justify-center ${theme === "light" && !isMenuOpen ? "text-black" : "text-white"
                } focus:outline-none cursor-pointer`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="xl:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center overflow-y-auto pt-24 pb-8"
            >
              {/* Soft decorative background circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0a2968]/30 rounded-full blur-[100px] -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0a2968]/15 rounded-full blur-[100px] -z-10" />

              <div className="flex flex-col items-center space-y-6 w-full px-8 max-w-lg">
                {navItems.map((item) => {
                  if (item.isDropdown) {
                    const isDropdownOpen = activeMobileDropdown === item.name;
                    return (
                      <motion.div key={item.name} variants={itemVariants} className="w-full text-center">
                        <button
                          onClick={() => setActiveMobileDropdown(isDropdownOpen ? null : item.name)}
                          className="w-full flex items-center justify-center gap-2 text-2xl font-bold text-white/80 hover:text-white cursor-pointer"
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-[#0a2968]" : ""
                              }`}
                          />
                        </button>

                        {/* Mobile Dropdown Sub-links */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-3 space-y-3 overflow-hidden bg-white/5 rounded-2xl p-2 border border-white/5"
                            >
                              {item.subItems.map((sub, idx) => (
                                <HashLink
                                  smooth
                                  key={idx}
                                  to={sub.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="block py-2 text-base font-extrabold text-white/60 hover:text-[#0a2968] transition-colors"
                                >
                                  {sub.name}
                                </HashLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div key={item.name} variants={itemVariants} className="w-full text-center">
                      <HashLink
                        smooth
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-2xl font-bold text-white/80 hover:text-white hover:scale-105 transition-all duration-300"
                      >
                        {item.name}
                      </HashLink>
                    </motion.div>
                  );
                })}

                {/* Mobile Drawer CTA Button */}
                <motion.div variants={itemVariants} className="pt-6 w-full max-w-xs">
                  {user ? (
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex items-center justify-center gap-2 text-white/70 text-lg font-bold border-b border-white/10 pb-3 mb-2">
                        <User size={18} className="text-[#0a2968]" />
                        Hello, {user.name?.split(" ")[0]}
                      </div>

                      {enrollments && enrollments.length > 0 ? (
                        <Link
                          to="/my-courses"
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full py-3.5 bg-[#0a2968] text-white text-center font-extrabold rounded-xl shadow-md"
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <HashLink
                          smooth
                          to="/#courses"
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full py-3.5 bg-transparent border-2 border-white/20 text-white text-center font-extrabold rounded-xl"
                        >
                          Enroll Now
                        </HashLink>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full py-3 bg-red-600/20 text-red-400 font-extrabold rounded-xl border border-red-500/20 mt-2"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full py-4 bg-[#0a2968] text-white hover:bg-white hover:text-[#0a2968] border border-[#0a2968] text-center font-extrabold rounded-xl shadow-md transition-all duration-300 block uppercase tracking-wider text-sm"
                    >
                      Enroll Now
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
