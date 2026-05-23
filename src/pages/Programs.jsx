import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Target, 
  Award, 
  Lightbulb,
  ArrowRight,
  Zap,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// Fade-up animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Programs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    education: "",
    stream: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/send_mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (data.status === "success") {
        alert("Thank you for registering! Our counsellors will contact you soon.");
        setFormData({ name: "", phone: "", city: "", education: "", stream: "" });
      } else {
        alert("Failed to send your request. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending mail:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-[#EF961D] selection:text-white pb-0 flex flex-col">
      
      {/* Navigation Layer */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navigation theme="light" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 pb-10 lg:pt-32 lg:pb-16 px-4 overflow-hidden border-b border-slate-100 flex-grow">
        {/* Abstract Background Gradients (Lightened) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100 blur-[120px] opacity-60"></div>
          <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-orange-100 blur-[150px] opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex justify-center">
          
          {/* Main Hero Content */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="space-y-8 flex flex-col items-start text-left max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <Zap className="w-5 h-5 text-[#EF961D]" />
              <span className="text-sm font-bold tracking-wider text-[#163F66] uppercase">Rank Storm Mentorship</span>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4 flex flex-col items-start">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#163F66] leading-[1.1] uppercase">
                Rank Storm Mentorship <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF961D] to-orange-500">
                  Programme 2026/2027
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
                Prepare for UPSC, IAS & States Civil Services with a strategic mentorship programme specially designed for serious aspirants aiming to become future rankers.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-start gap-4 pt-4">
              <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white shadow-md border border-slate-100">
                <Calendar className="w-5 h-5 text-[#EF961D]" />
                <div className="text-left">
                  <p className="text-xs text-slate-500 font-medium">Batch Starts</p>
                  <p className="text-sm font-bold text-slate-800">June 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white shadow-md border border-slate-100">
                <MapPin className="w-5 h-5 text-[#EF961D]" />
                <div className="text-left">
                  <p className="text-xs text-slate-500 font-medium">Modes Available</p>
                  <p className="text-sm font-bold text-slate-800">Residential | Classroom | Online</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="pt-4">
              <HashLink smooth to="#counselling-form" className="inline-flex items-center gap-2 bg-[#163F66] hover:bg-[#EF961D] text-white font-bold py-3.5 px-8 rounded-full transition-colors text-lg shadow-lg">
                Schedule a Counselling Session <ArrowRight className="w-5 h-5" />
              </HashLink>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ================= PROGRAMMES OVERVIEW ================= */}
      <section className="pt-12 pb-4 md:pt-16 md:pb-6 px-4 relative z-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#163F66] mb-6 uppercase tracking-tight">
              Rank <span className="text-[#EF961D]">Storm</span><br className="md:hidden" /> Programme 26/27
            </h2>
            
            {/* Aims & Objectives Box */}
            <div className="inline-block relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#163F66] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest z-10 shadow-md whitespace-nowrap">
                Aims & Objectives
              </div>
              <div className="bg-white rounded-2xl p-6 md:p-8 max-w-3xl mx-auto relative shadow-xl border border-slate-100 border-t-[#EF961D] border-t-4">
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed text-center">
                  The RankStorm is designed with a clear mission and approach: <br/>
                  <span className="text-[#163F66] font-bold">To transform serious aspirants into UPSC rankers through a structured, exam-oriented evolution.</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Three Program Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-8 mb-12 md:mb-20 max-w-6xl mx-auto px-1 sm:px-4">
            {/* 20 Days */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative w-full h-[80px] sm:h-[130px] md:h-[200px] flex items-center justify-start group cursor-pointer">
              {/* Colored Background Shape */}
              <div 
                className="absolute right-0 h-[60px] sm:h-[100px] md:h-[170px] w-[85%] sm:w-[80%] flex items-center justify-end pr-2 sm:pr-4 md:pr-5 transition-transform duration-500 shadow-sm md:shadow-md"
                style={{ 
                  backgroundColor: "#E85D22", 
                  clipPath: "polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)" 
                }}
              >
                <span className="text-white font-bold text-[10px] sm:text-lg md:text-xl">01</span>
              </div>
              
              {/* Overlapping White Box */}
              <div className="relative left-1 sm:left-4 md:left-6 w-[75%] h-[50px] sm:h-[80px] md:h-[130px] bg-white shadow-md md:shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center z-10 transition-transform duration-500 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 border border-slate-50 py-1">
                <h3 className="text-[10px] sm:text-xl md:text-2xl lg:text-3xl font-black text-[#E85D22] leading-none sm:leading-tight">20 Days</h3>
                <h4 className="text-[10px] sm:text-xl md:text-2xl lg:text-3xl font-black text-[#222222] leading-none sm:leading-tight mt-0.5 sm:mt-0">Program</h4>
                <p className="text-[#222222] font-bold mt-0.5 sm:mt-1 md:mt-2 text-[7px] sm:text-xs lg:text-sm">(Mains)</p>
              </div>
            </motion.div>

            {/* 3 Months */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }} className="relative w-full h-[80px] sm:h-[130px] md:h-[200px] flex items-center justify-start group cursor-pointer">
              <div 
                className="absolute right-0 h-[60px] sm:h-[100px] md:h-[170px] w-[85%] sm:w-[80%] flex items-center justify-end pr-2 sm:pr-4 md:pr-5 transition-transform duration-500 shadow-sm md:shadow-md"
                style={{ 
                  backgroundColor: "#F1B511", 
                  clipPath: "polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)" 
                }}
              >
                <span className="text-white font-bold text-[10px] sm:text-lg md:text-xl">02</span>
              </div>
              
              <div className="relative left-1 sm:left-4 md:left-6 w-[75%] h-[50px] sm:h-[80px] md:h-[130px] bg-white shadow-md md:shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center z-10 transition-transform duration-500 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 border border-slate-50 py-1">
                <h3 className="text-[10px] sm:text-xl md:text-2xl lg:text-3xl font-black text-[#F1B511] leading-none sm:leading-tight">3 Months</h3>
                <h4 className="text-[10px] sm:text-xl md:text-2xl lg:text-3xl font-black text-[#222222] leading-none sm:leading-tight mt-0.5 sm:mt-0">Program</h4>
                <p className="text-[#222222] font-bold mt-0.5 sm:mt-1 md:mt-2 text-[7px] sm:text-xs lg:text-sm">(Mains)</p>
              </div>
            </motion.div>

            {/* 12 Months */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="relative w-full h-[80px] sm:h-[130px] md:h-[200px] flex items-center justify-start group cursor-pointer">
              <div 
                className="absolute right-0 h-[60px] sm:h-[100px] md:h-[170px] w-[85%] sm:w-[80%] flex items-center justify-end pr-2 sm:pr-4 md:pr-5 transition-transform duration-500 shadow-sm md:shadow-md"
                style={{ 
                  backgroundColor: "#3F6BB5", 
                  clipPath: "polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)" 
                }}
              >
                <span className="text-white font-bold text-[10px] sm:text-lg md:text-xl">03</span>
              </div>
              
              <div className="relative left-1 sm:left-4 md:left-6 w-[75%] h-[50px] sm:h-[80px] md:h-[130px] bg-white shadow-md md:shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center z-10 transition-transform duration-500 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 border border-slate-50 py-1">
                <h3 className="text-[10px] sm:text-xl md:text-2xl lg:text-3xl font-black text-[#3F6BB5] leading-none sm:leading-tight text-center">12 Months</h3>
                <h4 className="text-[10px] sm:text-xl md:text-2xl lg:text-3xl font-black text-[#222222] leading-none sm:leading-tight text-center mt-0.5 sm:mt-0">Program</h4>
                <p className="text-[#222222] font-bold mt-0.5 sm:mt-1 md:mt-2 text-[7px] sm:text-xs lg:text-sm whitespace-nowrap">(Prelims+Mains)</p>
              </div>
            </motion.div>
          </div>

        </div>
        
        {/* Style for hiding scrollbar but keeping functionality */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </section>

      {/* ================= POSTER SECTION ================= */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-2 pb-12 md:pt-4 md:pb-16">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="w-full flex justify-center"
        >
          <img 
            src="/images/posterprogram.jpeg" 
            alt="Programs Poster" 
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </section>

      {/* ================= PROGRAM DETAILS (HIGHLIGHT CARDS) ================= */}
      <section className="py-12 md:py-16 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#163F66] mb-4 uppercase tracking-tight">
              Program <span className="text-[#EF961D]">Highlights</span>
            </h2>
            <p className="text-slate-600 font-medium">Choose the ideal program that fits your preparation stage.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* CARD 1: 20 Days (White Card) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white rounded-[24px] shadow-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="p-6 text-center">
                <h3 className="text-2xl font-black text-[#132A5B]">20 Days Program</h3>
                <span className="inline-block mt-2 bg-[#EF961D]/10 text-[#EF961D] px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">Mains</span>
              </div>
              <div className="bg-[#132A5B] text-white px-5 py-3 text-sm font-bold text-center">
                Ethics & Essay Foundation
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-2 bg-[#F8F9FB] border border-slate-200 text-[#132A5B] px-4 py-2.5 rounded-xl font-bold text-sm mb-6 shadow-sm">
                  <Users className="w-4 h-4 shrink-0" /> Ideal for: Mains Aspirants
                </div>
                <ul className="space-y-4 mb-8">
                  {["Essay & Ethics complete foundation", "Daily assignment during classes", "Detailed evaluation by mentors", "Case studies & PYQs discussion", "One-to-one mentorship"].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#132A5B] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <HashLink smooth to="#counselling-form" className="block w-full bg-[#132A5B] hover:bg-[#EF961D] text-white text-center font-bold py-3.5 rounded-full transition-colors text-lg shadow-md">
                    Apply Now
                  </HashLink>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: 3 Months (Blue Card) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }} className="bg-[#132A5B] rounded-[24px] shadow-2xl border border-[#2A447E] overflow-hidden flex flex-col hover:shadow-[0_20px_50px_rgba(19,42,91,0.4)] transition-all duration-300 transform md:-translate-y-4 relative z-10">
              <div className="bg-[#FACC15] text-[#132A5B] font-black text-center py-2.5 text-sm uppercase tracking-widest shadow-sm">
                Advanced Mentorship
              </div>
              <div className="p-6 text-center border-b border-white/10">
                <h3 className="text-2xl font-black text-white">3 Months Program</h3>
                <span className="inline-block mt-2 bg-white/10 text-[#FACC15] px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">Mains</span>
              </div>
              <div className="bg-black/20 text-[#FACC15] px-5 py-3 text-sm font-bold text-center">
                Covering GS Papers, Essay & Ethics
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-2 bg-[#254282] border border-[#3B5998] text-[#FACC15] px-4 py-2.5 rounded-xl font-bold text-sm mb-6 shadow-sm">
                  <Users className="w-4 h-4 shrink-0" /> Ideal for: Dedicated Aspirants
                </div>
                <ul className="space-y-4 mb-8">
                  {["Answer writing sessions with mentor", "Real-time evaluation during sessions", "Complete Ethics & Essay lectures", "Consistent mentorship support", "Skill: Presentation & Time Mgmt"].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#FACC15] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <HashLink smooth to="#counselling-form" className="block w-full bg-[#FACC15] hover:bg-white text-[#132A5B] text-center font-black py-3.5 rounded-full transition-colors text-lg shadow-[0_10px_20px_rgba(250,204,21,0.2)]">
                    Apply Now
                  </HashLink>
                </div>
              </div>
            </motion.div>

            {/* CARD 3: 12 Months (White Card) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="bg-white rounded-[24px] shadow-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="p-6 text-center">
                <h3 className="text-2xl font-black text-[#132A5B]">12 Months Program</h3>
                <span className="inline-block mt-2 bg-[#8E2DE2]/10 text-[#8E2DE2] px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">Prelims + Mains</span>
              </div>
              <div className="bg-[#132A5B] text-white px-5 py-3 text-sm font-bold text-center">
                Comprehensive 4-Phase Preparation
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-2 bg-[#F8F9FB] border border-slate-200 text-[#132A5B] px-4 py-2.5 rounded-xl font-bold text-sm mb-6 shadow-sm">
                  <Users className="w-4 h-4 shrink-0" /> Ideal for: Beginners & Foundation
                </div>
                <ul className="space-y-4 mb-8">
                  {["Holistic prep (NCERT to Advanced)", "Concept to application focus", "Prelims–Mains Bridge & PYQs", "Intensive Simulation & Test Series", "Direct teaching by Amit Sir"].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#132A5B] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <HashLink smooth to="#counselling-form" className="block w-full bg-[#132A5B] hover:bg-[#8E2DE2] text-white text-center font-bold py-3.5 rounded-full transition-colors text-lg shadow-md">
                    Apply Now
                  </HashLink>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= COUNSELLING FORM SECTION ================= */}
      <section id="counselling-form" className="py-16 md:py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#163F66] to-[#EF961D]"></div>
              
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-[#163F66] mb-3">Schedule a Counselling Session</h2>
                <p className="text-slate-500 text-lg">Get personalized guidance from our expert counsellors</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 text-sm font-bold mb-1.5">Student's Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter full name" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#EF961D] focus:ring-1 focus:ring-[#EF961D] transition-all bg-slate-50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-bold mb-1.5">Phone No (WhatsApp) <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Enter 10-digit mobile number" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#EF961D] focus:ring-1 focus:ring-[#EF961D] transition-all bg-slate-50 focus:bg-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-1.5">City <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter your city" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#EF961D] focus:ring-1 focus:ring-[#EF961D] transition-all bg-slate-50 focus:bg-white" />
                </div>

                {/* Education Radio Buttons */}
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-2">Education <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["12th Appearing", "Entered 11th/12th", "Doing Graduation", "Graduation Completed"].map((level) => (
                      <label key={level} className={`cursor-pointer border rounded-xl py-3 px-3 text-xs font-bold text-center transition-all ${formData.education === level ? 'bg-[#163F66] text-white border-[#163F66] shadow-md' : 'bg-white text-slate-600 border-slate-300 hover:border-[#163F66]'}`}>
                        <input type="radio" name="education" value={level} checked={formData.education === level} onChange={handleInputChange} className="hidden" required />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stream Radio Buttons */}
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-3">Stream <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <div className="flex flex-wrap gap-6">
                    {["Arts", "Commerce", "Science/Engineering"].map((stream) => (
                      <label key={stream} className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                        <input type="radio" name="stream" value={stream} checked={formData.stream === stream} onChange={handleInputChange} className="w-5 h-5 text-[#EF961D] focus:ring-[#EF961D] accent-[#EF961D]" />
                        {stream}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting} className={`w-full ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#EF961D] hover:bg-[#d88415]'} text-white font-black py-4 rounded-xl transition-all transform ${!isSubmitting && 'hover:-translate-y-1'} shadow-[0_10px_20px_rgba(239,150,29,0.3)] flex items-center justify-center gap-2 text-lg`}>
                    {isSubmitting ? "REGISTERING..." : "Register Now"} {!isSubmitting && <ArrowRight className="w-6 h-6" />}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default Programs;
