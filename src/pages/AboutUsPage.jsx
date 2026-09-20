import React from "react";
import { Link } from "react-router-dom";
import { Award, BookOpen, CheckCircle, Target, Users, ArrowLeft, Mail, Phone, MapPin, Sparkles, GraduationCap, ShieldCheck } from "lucide-react";

export default function AboutUsPage() {
  const services = [
    {
      title: "Personalized Mentorship",
      desc: "One-on-one strategic guidance directly supervised by Ex-Bureaucrat Mr. Amit Kumar and interview-appeared mentors."
    },
    {
      title: "Interview Guidance Program",
      desc: "Comprehensive mock interviews, DAF analysis, and personality test preparation by experienced panellists."
    },
    {
      title: "Prelims Test Series",
      desc: "High-yield test modules with detailed explanation PDFs and performance analytics matching UPSC trends."
    },
    {
      title: "Mains Test Series",
      desc: "Structured full-length and sectional tests designed to master answer structuring, time management, and presentation."
    },
    {
      title: "Daily Answer Writing Programs",
      desc: "Daily GS & Essay questions with prompt evaluation, actionable feedback, and model answer frameworks."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      {/* Hero Header */}
      <div className="bg-[#0a2968] text-white pt-14 pb-20 px-6 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#EF961D] hover:text-white mb-6 transition-colors uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 bg-[#EF961D] text-slate-900 rounded-lg font-black">
              <GraduationCap size={28} />
            </span>
            <span className="text-xs font-extrabold tracking-widest text-[#EF961D] uppercase">
              About iTopper Institute
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
            Empowering Aspirants, <br />
            <span className="text-[#EF961D]">Delivering UPSC Success.</span>
          </h1>

          <p className="text-slate-200 text-base md:text-lg font-medium max-w-3xl leading-relaxed">
            iTopper is an initiative by <strong className="text-white">UPSC 2017 Topper & Ex-Bureaucrat Mr. Amit Kumar</strong> to provide best quality services to students preparing for UPSC Civil Services Exam and other State PCS Exams.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20 space-y-12">
        {/* Founder & Guidance Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-12 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#EF961D] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
                <Sparkles size={14} /> Guided by Ex-Bureaucrat
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-[#0a2968] tracking-tight">
                Direct Mentorship Under Amit Sir (UPSC 2017 Topper)
              </h2>

              <p className="text-slate-600 leading-relaxed text-base font-medium">
                Under the direct guidance of <strong className="text-slate-900">Amit Sir</strong>, a qualified team of professionals who themselves have reached till the interview stage of UPSC CSE are providing top-tier mentorship and evaluation services.
              </p>

              <p className="text-slate-600 leading-relaxed text-base font-medium">
                Amit Sir has already mentored hundreds of students successfully till now. Hundreds of aspirants have joined his programs for achieving success in this esteemed examination.
              </p>

              <div className="bg-blue-50/80 border-l-4 border-[#0a2968] p-5 rounded-r-2xl space-y-2">
                <h4 className="font-extrabold text-[#0a2968] text-base flex items-center gap-2">
                  <Target className="text-[#EF961D]" size={20} />
                  Our Core Objective
                </h4>
                <p className="text-sm text-slate-700 font-semibold leading-relaxed">
                  The primary aim of the institute is to help students achieve their dream goal of becoming a civil servant, especially <strong className="text-[#0a2968]">IAS, IPS, IRS, IFS</strong> and allied state civil services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Offered Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black tracking-widest text-[#EF961D] uppercase">
              What We Offer
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-[#0a2968] tracking-tight">
              Our Core Mentorship & Exam Services
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Tailored preparation modules designed for UPSC CSE Prelims, Mains, and Interview.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((srv, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/80 hover:border-[#0a2968]/30 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0a2968] flex items-center justify-center font-bold">
                  <CheckCircle size={20} className="text-[#EF961D]" />
                </div>
                <h3 className="text-lg font-bold text-[#0a2968]">{srv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why iTopper - Key Highlights */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 space-y-6">
          <h2 className="text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-4 flex items-center gap-2">
            <ShieldCheck className="text-[#EF961D]" size={24} />
            Why Civil Services Aspirants Trust iTopper
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <div className="text-3xl font-black text-[#EF961D]">Topper Guidance</div>
              <h4 className="font-bold text-[#0a2968]">Bureaucrat Mentorship</h4>
              <p className="text-xs text-slate-600">Strategies designed directly by ex-bureaucrats who cleared the UPSC CSE exam.</p>
            </div>

            <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <div className="text-3xl font-black text-[#EF961D]">Interview Stage Team</div>
              <h4 className="font-bold text-[#0a2968]">Expert Evaluators</h4>
              <p className="text-xs text-slate-600">Answer evaluations done by mentors who have themselves reached UPSC CSE interview stage.</p>
            </div>

            <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <div className="text-3xl font-black text-[#EF961D]">Results Focused</div>
              <h4 className="font-bold text-[#0a2968]">Proven Track Record</h4>
              <p className="text-xs text-slate-600">Hundreds of successful students guided towards IAS, IPS, and IRS selections.</p>
            </div>
          </div>
        </div>

        {/* Contact Footer Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-[#EF961D] text-slate-900 rounded-xl font-bold">
              <Mail size={22} />
            </span>
            <div>
              <h3 className="text-xl font-extrabold text-white">Connect with iTopper Academy</h3>
              <p className="text-xs text-slate-400">Join our mentorship programs or reach out for counseling:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-medium">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Mail className="text-[#EF961D] shrink-0" size={20} />
              <div className="truncate">
                <span className="text-[11px] text-slate-400 block">Email Us</span>
                <a href="mailto:contact@itopper.academy" className="text-white hover:text-[#EF961D] font-bold text-sm truncate">
                  contact@itopper.academy
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Phone className="text-[#EF961D] shrink-0" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 block">Phone / Helpline</span>
                <a href="tel:9877536047" className="text-white hover:text-[#EF961D] font-bold text-sm">
                  +91 9877536047
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <MapPin className="text-[#EF961D] shrink-0" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 block">Head Office</span>
                <span className="text-white text-xs font-semibold">
                  Shop No 55, 2nd Floor, Old Rajinder Nagar, Delhi 110060
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
