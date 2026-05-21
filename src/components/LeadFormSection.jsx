import React from "react";
import { Phone } from "lucide-react";

const LeadFormSection = () => {
  return (
    <section className="py-16 px-4 bg-slate-50 relative flex justify-center items-center">
      <div className="bg-white rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.1)] p-8 sm:p-10 max-w-[420px] w-full relative z-10">
        <h2 className="text-[2.2rem] font-bold text-[#1e3a8a] text-center mb-3 leading-[1.2]">
          Join Best <br />
          IAS Coaching in <br />
          Delhi
        </h2>
        
        <p className="text-center text-[#1e3a8a] font-bold text-[15px] mb-8">
          Your trusted guide for All UPSC <br /> Civil Services Exams
        </p>

        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] text-[15px]"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full px-4 py-3.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] text-[15px]"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] text-[15px]"
            />
          </div>
          
          <button
            type="button"
            className="w-full bg-[#1e3a8a] hover:bg-[#172b66] text-white font-bold py-4 rounded-lg mt-4 transition-colors shadow-md tracking-wide"
          >
            SCHEDULE COUNSELLING <br /> SESSION
          </button>
        </form>
      </div>
    </section>
  );
};

export default LeadFormSection;
