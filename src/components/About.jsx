import React from "react";
import ScrollVelocity from "./ScrollVelocity";
import { Link } from "react-router-dom";
import { ArrowRight, Award, CheckCircle } from "lucide-react";

const AboutUs = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-50 pb-16 pt-12 border-b border-slate-100"
    >
      {/* About Us Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Text Content */}
          <div className="lg:col-span-12 flex flex-col items-start text-left">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#EF961D] uppercase mb-3">
              ABOUT iTopper
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#163F66] tracking-tight leading-tight mb-6">
              Empowering Aspirants, <br />
              <span className="text-slate-800">Delivering UPSC Excellence.</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#EF961D] rounded-full mb-8"></div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 font-medium">
              <strong className="text-[#0a2968]">iTopper</strong> is an initiative by <strong className="text-slate-900">UPSC 2017 Topper & Ex-Bureaucrat Mr. Amit Kumar</strong> to provide best quality services to students preparing for UPSC Civil Services Exam and other State PCS Exams.
            </p>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-medium">
              Under the direct guidance of Amit Sir, a qualified team of professionals who themselves have reached till the interview stage of UPSC CSE provide Mentorship, Interview Guidance, Prelims & Mains Test Series, and Daily Answer Writing Programs to help students achieve their dream of becoming civil servants (IAS, IPS, IRS).
            </p>

            {/* Services Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mb-8">
              {[
                "Personalized UPSC Mentorship",
                "Interview Guidance Program",
                "Prelims & Mains Test Series",
                "Daily Answer Writing Programs"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-800 font-bold text-sm bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <CheckCircle className="text-[#EF961D] shrink-0" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a2968] hover:bg-[#EF961D] text-white font-extrabold text-sm rounded-xl transition-all shadow-md uppercase tracking-wider"
            >
              Read Full About iTopper <ArrowRight size={16} />
            </Link>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-2xl pt-8 border-t border-slate-200 mt-8">
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-[#EF961D]">Hundreds+</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Students Mentored</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-[#EF961D]">Ex-Bureaucrat</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Direct Guidance</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-[#EF961D]">IAS/IPS/IRS</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Dream Goal</p>
              </div>
            </div>
          </div>

        </div>
      </div>

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
