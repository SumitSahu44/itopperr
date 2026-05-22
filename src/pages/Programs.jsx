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
  BookOpen,
  Briefcase,
  Layers,
  Star,
  Users,
  BarChart,
  Clock,
  Compass
} from "lucide-react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for registering! Our counsellors will contact you soon.");
    setFormData({ name: "", phone: "", city: "", education: "", stream: "" });
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-[#EF961D] selection:text-white pb-0 flex flex-col">
      
      {/* Navigation Layer */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navigation theme="light" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-4 overflow-hidden border-b border-slate-100 flex-grow">
        {/* Abstract Background Gradients (Lightened) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100 blur-[120px] opacity-60"></div>
          <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-orange-100 blur-[150px] opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <Zap className="w-5 h-5 text-[#EF961D]" />
              <span className="text-sm font-bold tracking-wider text-[#163F66] uppercase">Rank Storm Mentorship</span>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#163F66] leading-[1.1]">
                Civil Services Preparation <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF961D] to-orange-500">
                  with Graduation
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                Prepare for IAS/PCS in a structured 3-year timeframe with specialized mentorship programs designed to transform aspirants into toppers.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white shadow-md border border-slate-100">
                <Calendar className="w-5 h-5 text-[#EF961D]" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Batch Starts</p>
                  <p className="text-sm font-bold text-slate-800">15th April 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white shadow-md border border-slate-100">
                <MapPin className="w-5 h-5 text-[#EF961D]" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Modes Available</p>
                  <p className="text-sm font-bold text-slate-800">Residential | Classroom | Online</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto"
          >
            <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#163F66] to-[#EF961D]"></div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#163F66] mb-2">Schedule a Counselling Session</h3>
                <p className="text-slate-500 text-sm">Get personalized guidance from our expert counsellors</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-1.5">Student's Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter full name" className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#EF961D] focus:ring-1 focus:ring-[#EF961D] transition-all bg-slate-50 focus:bg-white" />
                </div>
                
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-1.5">Phone No (WhatsApp) <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Enter 10-digit mobile number" className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#EF961D] focus:ring-1 focus:ring-[#EF961D] transition-all bg-slate-50 focus:bg-white" />
                </div>

                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-1.5">City <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter your city" className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#EF961D] focus:ring-1 focus:ring-[#EF961D] transition-all bg-slate-50 focus:bg-white" />
                </div>

                {/* Education Radio Buttons */}
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-2">Education <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    {["12th Appearing", "Entered 11th/12th", "Doing Graduation", "Graduation Completed"].map((level) => (
                      <label key={level} className={`cursor-pointer border rounded-lg py-2 px-3 text-xs font-medium text-center transition-all ${formData.education === level ? 'bg-[#163F66] text-white border-[#163F66]' : 'bg-white text-slate-600 border-slate-300 hover:border-[#163F66]'}`}>
                        <input type="radio" name="education" value={level} checked={formData.education === level} onChange={handleInputChange} className="hidden" required />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stream Radio Buttons */}
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-2">Stream <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <div className="flex gap-4">
                    {["Arts", "Commerce", "Science/Engineering"].map((stream) => (
                      <label key={stream} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                        <input type="radio" name="stream" value={stream} checked={formData.stream === stream} onChange={handleInputChange} className="w-4 h-4 text-[#EF961D] focus:ring-[#EF961D]" />
                        {stream}
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#EF961D] hover:bg-[#d88415] text-white font-bold py-4 rounded-lg mt-2 transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(239,150,29,0.3)] flex items-center justify-center gap-2">
                  Register Now <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= PROGRAMMES OVERVIEW ================= */}
      <section className="py-24 px-4 relative z-10 bg-slate-50">
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
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00A8E8] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest z-10 shadow-md whitespace-nowrap">
                Aims & Objectives
              </div>
              <div className="bg-white rounded-2xl p-6 md:p-8 max-w-3xl mx-auto relative shadow-xl border border-slate-100 border-t-[#00A8E8] border-t-4">
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                  The RankStorm is designed with a clear mission and approach: <br/>
                  <span className="text-[#163F66] font-bold">To transform serious aspirants into UPSC rankers through a structured, exam-oriented evolution.</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Three Program Cards */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {/* 20 Days */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF512F] to-[#DD2476] rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl p-8 h-full flex flex-col items-center text-center transform transition duration-500 group-hover:-translate-y-2 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-[#FF512F]/10 flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-[#FF512F]">01</span>
                </div>
                <h3 className="text-3xl font-black text-[#163F66] mb-2">20 Days<br/>Program</h3>
                <p className="text-[#FF512F] font-bold text-lg mb-4">(Mains)</p>
                <p className="text-slate-600 text-sm mt-auto">Mains Oriented: Ethics & Essay foundation with intensive daily practice.</p>
              </div>
            </motion.div>

            {/* 3 Months */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }} className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F2C94C] to-[#F2994A] rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl p-8 h-full flex flex-col items-center text-center transform transition duration-500 group-hover:-translate-y-2 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-[#F2C94C]/10 flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-[#F2994A]">02</span>
                </div>
                <h3 className="text-3xl font-black text-[#163F66] mb-2">3 Months<br/>Program</h3>
                <p className="text-[#F2994A] font-bold text-lg mb-4">(Mains)</p>
                <p className="text-slate-600 text-sm mt-auto">Advanced Mains Mentorship Programme covering GS Papers, Essay & Ethics.</p>
              </div>
            </motion.div>

            {/* 12 Months */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-blue-50 border border-blue-100 rounded-2xl p-8 h-full flex flex-col items-center text-center transform transition duration-500 group-hover:-translate-y-2 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-[#8E2DE2]/10 flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-[#8E2DE2]">03</span>
                </div>
                <h3 className="text-3xl font-black text-[#163F66] mb-2">12 Months<br/>Program</h3>
                <p className="text-[#8E2DE2] font-bold text-lg mb-4">(Prelims + Mains)</p>
                <p className="text-slate-600 text-sm mt-auto">Comprehensive end-to-end preparation from foundation to intensive simulation.</p>
              </div>
            </motion.div>
          </div>

          {/* Core Pillars */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center">
            <h3 className="inline-block bg-[#00A8E8] text-white px-8 py-3 font-bold text-xl rounded-lg shadow-md mb-10">
              Core Pillars of the Programme
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Target className="w-6 h-6"/>, title: "Holistic Preparation" },
                { icon: <Lightbulb className="w-6 h-6"/>, title: "Concept to Application" },
                { icon: <CheckCircle2 className="w-6 h-6"/>, title: "End to End Solutions" },
                { icon: <Award className="w-6 h-6"/>, title: "Exam-Oriented Approach" }
              ].map((pillar, i) => (
                <div key={i} className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#00A8E8] flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">{pillar.title}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= 20 DAYS PROGRAM ================= */}
      <section className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#163F66] mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF512F] to-[#DD2476]">20 DAYS</span> PROGRAM
            </h2>
            <p className="text-xl text-slate-600 font-bold mb-6">Mains Oriented: Ethics & Essay</p>
            
            {/* Features Row */}
            <div className="inline-block bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 shadow-sm mx-auto">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                {["Assignment during classes", "Detailed evaluation", "Case studies discussion", "One-to-one mentorship", "Topper interaction", "Test Series / PYQ's"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm md:text-base text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#EF961D]" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#163F66] text-white py-4 px-6 font-bold text-lg flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#EF961D]" /> ESSAY FOUNDATION
              </div>
              <div className="p-8 space-y-6 flex-grow">
                <div className="mb-2">
                  <p className="text-[#EF961D] font-bold text-lg">iTopper Essay Course</p>
                  <p className="text-slate-500 font-medium text-sm">By Mr. Amit Kumar (Ex-Civil Servant)</p>
                </div>
                
                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Course Objective</h4>
                  <ul className="space-y-2">
                    {["Enhance competency across diverse important themes", "Strengthen understanding through well-structured handouts", "Improve writing skills (language, grammar, and flow)", "Provide structured evaluation through a test series"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Why Essay Paper Matters?</h4>
                  <ul className="space-y-2">
                    {["250 marks (equal to GS / Optional)", "High-scoring paper (150+ achievable)", "First paper in Mains – sets the momentum", "Low input, high output subject", "Game-changer in final selection"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#163F66] text-white py-4 px-6 font-bold text-lg flex items-center gap-3">
                <Compass className="w-6 h-6 text-[#EF961D]" /> ETHICS FOUNDATION
              </div>
              <div className="p-8 space-y-6 flex-grow">
                <div className="mb-2">
                  <p className="text-[#EF961D] font-bold text-lg">Applied Ethics & Core Concepts</p>
                  <p className="text-slate-500 font-medium text-sm">(Recommended by Toppers)</p>
                </div>

                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Course Objectives</h4>
                  <ul className="space-y-2">
                    {["Develop clear understanding of core ethical concepts", "Build strong ethical reasoning & analytical ability", "Learn structured answer-writing techniques", "Case study solving approach (real-based)", "Interlink current affairs with ethical dimensions"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Why should you join us?</h4>
                  <ul className="space-y-2">
                    {["Classes conducted by UPSC Topper(s)", "After class – one-on-one meeting with Sir", "High quality content", "PYQs & case study discussion during classes", "Test series practice"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 3 MONTHS PROGRAM ================= */}
      <section className="py-24 px-4 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#163F66] mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2C94C] to-[#F2994A]">3 MONTHS</span> PROGRAM
            </h2>
            <p className="text-xl text-slate-600 font-bold mb-6">Advanced Mains Mentorship Programme – 2026</p>
            <p className="max-w-2xl mx-auto text-slate-600 mb-6">
              End-to-End Solution with a strategic and effective approach to UPSC Mains preparation. A complete, power-packed programme focused on developing answer writing skills and overall performance.
            </p>

            {/* Coverage & Delivery Row */}
            <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
              <div className="bg-white border border-slate-200 rounded-xl px-6 py-4 shadow-sm flex-1">
                <span className="text-[#EF961D] font-bold block mb-2">Coverage</span>
                <p className="text-slate-700 text-sm font-medium">Essay, Ethics, GS Paper 1, GS Paper 2, GS Paper 3</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl px-6 py-4 shadow-sm flex-1">
                <span className="text-[#00A8E8] font-bold block mb-2">Mode of Delivery</span>
                <p className="text-slate-700 text-sm font-medium">Offline + Online (Hybrid Mode), Two-way communication</p>
              </div>
            </div>
          </motion.div>

          {/* 4 Cards Grid to match 12 Months structure */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#163F66] text-white py-4 px-6 font-bold text-lg flex items-center gap-3">
                <Target className="w-6 h-6 text-[#F2C94C]" /> Core Features
              </div>
              <div className="p-8 space-y-4 flex-grow">
                <ul className="space-y-3">
                  {["Answer writing sessions with mentor", "Consistent mentorship support", "Real-time evaluation during sessions", "Improving content quality", "Building strong arguments in answers", "Training in time management"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#163F66] text-white py-4 px-6 font-bold text-lg flex items-center gap-3">
                <Layers className="w-6 h-6 text-[#F2C94C]" /> Skill Development
              </div>
              <div className="p-8 space-y-4 flex-grow">
                <ul className="space-y-3">
                  {["Reading Approach", "Thinking in Questions", "Answer Writing Practice", "Presentation Skills"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#163F66] text-white py-4 px-6 font-bold text-lg flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-[#F2C94C]" /> What Will Be Provided
              </div>
              <div className="p-8 space-y-4 flex-grow">
                <ul className="space-y-3">
                  {["Complete Coverage", "Full Ethics lectures with notes", "Complete Essay lectures with notes", "Important topics: lectures + notes (One topic = One session)"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#163F66] text-white py-4 px-6 font-bold text-lg flex items-center gap-3">
                <Star className="w-6 h-6 text-[#F2C94C]" /> Additional Benefits
              </div>
              <div className="p-8 space-y-4 flex-grow">
                <ul className="space-y-3">
                  {["Answer writing skill development (Dimension-based & flowchart approach)", "Evaluation by toppers", "Daily answer writing practice", "Test Series"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 12 MONTHS PROGRAM ================= */}
      <section className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#163F66] mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2]">12 MONTHS</span> PROGRAM
            </h2>
            <p className="text-xl text-slate-600 font-bold mb-6">Advanced Mains Mentorship Programme – 2026</p>
            <div className="inline-block bg-[#00A8E8] text-white px-8 py-3 font-bold text-xl rounded-lg shadow-sm">
              COURSE STRUCTURE
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Phase 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#163F66] text-white py-4 px-6 font-bold text-lg flex items-center gap-3">
                <Clock className="w-6 h-6 text-[#8E2DE2]" /> Phase 1 (1–4 Months)
              </div>
              <div className="p-8 space-y-6 flex-grow">
                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-2">Focus Area</h4>
                  <p className="text-slate-600 text-sm mb-2">Holistic preparation and building a strong base</p>
                  <p className="text-slate-800 font-semibold flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EF961D] rounded-full"></div> One-on-One Personalized Strategy</p>
                </div>
                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Key Components</h4>
                  <ul className="space-y-2">
                    {["Reading approach and study style (NCERT to Advanced)", "Interlinking of topics, chapters, and subjects", "Developing a thinking process like rankers", "Enhancing the ability to understand between the lines", "Revision strategy and timetable planning"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Phase 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#163F66] text-white py-4 px-6 font-bold text-lg flex items-center gap-3">
                <BarChart className="w-6 h-6 text-[#8E2DE2]" /> Phase 2 (5–8 Months)
              </div>
              <div className="p-8 space-y-6 flex-grow">
                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-2">Applied Knowledge & Integrated Preparation</h4>
                  <p className="text-slate-600 text-sm">Focus: Concept to Application</p>
                </div>
                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Mains answer writing approach</h4>
                  <ul className="space-y-2 mb-4">
                    {["Develop critical thinking", "Improve writing approach", "Enhance presentation skills"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                    ))}
                  </ul>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Mentorship Support</h4>
                  <ul className="space-y-2">
                    {["Direct teaching by Amit Sir", "Doubt resolution", "End-to-end preparation guidance"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Phase 3 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#163F66] text-white py-4 px-6 font-bold text-lg flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#8E2DE2]" /> Phase 3 (9–10 Months)
              </div>
              <div className="p-8 space-y-6 flex-grow">
                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-2">Prelims–Mains Bridge</h4>
                </div>
                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Exam-Oriented Approach</h4>
                  <ul className="space-y-2 mb-6">
                    {["PYQs practice along with revision", "CSAT preparation", "Test Series"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                    ))}
                  </ul>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Advanced Practice</h4>
                  <ul className="space-y-2">
                    {["PYQs solving with Amit Sir & mentors", "Strategy building for solving questions", "Development of Analytical skills & Elimination techniques"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Phase 4 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#163F66] text-white py-4 px-6 font-bold text-lg flex items-center gap-3">
                <Award className="w-6 h-6 text-[#8E2DE2]" /> Phase 4 (11–12 Months)
              </div>
              <div className="p-8 space-y-6 flex-grow">
                <div>
                  <h4 className="text-[#163F66] font-black text-lg mb-2">Intensive Simulation</h4>
                </div>
                <div>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Final Transformation Phase</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>Transformation into a Ranker</li>
                  </ul>
                  <h4 className="text-[#163F66] font-bold text-lg mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {["Study with mentors", "Regular discussions with mentors", "Immediate doubt resolution", "Strategy refinement and execution"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default Programs;
