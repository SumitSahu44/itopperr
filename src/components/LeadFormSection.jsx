import React from "react";
import { CheckCircle2 } from "lucide-react";

const LeadFormSection = () => {
  return (
    <section className="py-12 px-4 bg-[#f8fafc] border-t border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#163F66] mb-4 leading-snug">
            Expert Guidance for Your <br />
            <span className="text-[#EF961D]">UPSC CSE Journey</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Connect with our experienced mentors for a personalized counselling session. Get all your doubts cleared and build a strategic roadmap for your IAS preparation.
          </p>

          <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#EF961D] shrink-0" />
              <span className="text-slate-700 font-medium">Personalized 1-on-1 Mentorship</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#EF961D] shrink-0" />
              <span className="text-slate-700 font-medium">Detailed Syllabus & Strategy Discussion</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#EF961D] shrink-0" />
              <span className="text-slate-700 font-medium">Guidance from Ex-UPSC Panelists</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#EF961D] shrink-0" />
              <span className="text-slate-700 font-medium">Insights on Latest Exam Trends</span>
            </li>
          </ul>
        </div>

        {/* Right Side Form */}
        <div className="w-full max-w-[400px] shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8">
            <h3 className="text-2xl font-bold text-[#163F66] text-center mb-2">
              Book a Free Counselling
            </h3>
            <p className="text-center text-slate-500 text-sm mb-6">
              Fill the details below and we will contact you shortly.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-slate-700 text-sm font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-md border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#163F66] focus:ring-1 focus:ring-[#163F66] text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-semibold mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Enter your 10-digit number"
                  className="w-full px-4 py-3 rounded-md border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#163F66] focus:ring-1 focus:ring-[#163F66] text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-md border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#163F66] focus:ring-1 focus:ring-[#163F66] text-sm"
                />
              </div>
              
              <button
                type="button"
                className="w-full bg-[#163F66] hover:bg-[#0b1329] text-white font-bold py-3.5 rounded-md mt-4 transition-colors text-sm tracking-wide shadow-md"
              >
                SCHEDULE NOW
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LeadFormSection;
