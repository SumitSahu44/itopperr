import React from "react";
import { Users, Clock, Flame, ArrowRight } from "lucide-react";

const StudyWithMe = () => {
  const enterRoomAlert = () => {
    window.alert("Our Virtual co-studying rooms are launching soon! It will be accessible directly through your Student Dashboard.");
  };

  return (
    <section id="study-with-me" className="py-20 px-4 bg-slate-50 relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Interactive Study Library Visual Mockup */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">

            {/* Dashboard Card */}
            <div className="bg-[#0b1329] text-white rounded-[24px] p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              {/* Virtual Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  {/* Pulsing live dot */}
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div>
                    <h5 className="font-extrabold text-xs text-white">Virtual Library Room #4</h5>
                    <p className="text-[10px] text-slate-400 font-bold">120+ Active Aspirants Live</p>
                  </div>
                </div>

                <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Live Room
                </span>
              </div>

              {/* Pomodoro Timer widget mockup */}
              <div className="bg-white/5 border border-white/5 rounded-xl p-5 text-center mb-6 relative group overflow-hidden">
                <p className="text-[10px] uppercase tracking-widest text-[#EF961D] font-extrabold mb-1">Focus Session Active</p>
                <h4 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-wider mb-2">24:59</h4>
                <p className="text-[11px] text-slate-400 font-bold">Pomodoro #2: Answer Writing Focus</p>
              </div>

              {/* Simulated active toppers list */}
              <div className="space-y-3">
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Co-Studying With Toppers:</p>

                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[#EF961D]/40">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Topper" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h6 className="text-[11px] font-black text-white">Ananya Sharma (AIR 48)</h6>
                      <p className="text-[9px] text-slate-400 font-bold">Currently writing Essay module</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-400/5 px-2 py-0.5 rounded">Active</span>
                </div>

                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[#EF961D]/40">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Topper" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h6 className="text-[11px] font-black text-white">Rahul Verma (AIR 104)</h6>
                      <p className="text-[9px] text-slate-400 font-bold">Solving Ethics pyqs</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-400/5 px-2 py-0.5 rounded">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-left">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#EF961D] uppercase mb-3">
              LIVE CO-STUDY ROOMS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#163F66] tracking-tight leading-tight mb-6">
              Study With Me: <br />
              <span className="text-slate-800">Your Virtual 24/7 Library.</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#EF961D] rounded-full mb-8"></div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-bold">
              UPSC preparation can be an isolating journey. iTopper's premium **Study With Me** rooms provide a dynamic, highly focused virtual workspace where you can study alongside UPSC toppers and serious aspirants in real-time peer groups.
            </p>

            {/* Feature blocks */}
            <div className="space-y-6 w-full mb-10">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#163F66]/5 rounded-xl text-[#163F66] border border-[#163F66]/10 shrink-0">
                  <Users size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-1">Topper & Peer Group Studying</h4>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">Join specialized focus rooms with selected CSE candidates to learn their focus patterns and routine discipline.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#163F66]/5 rounded-xl text-[#163F66] border border-[#163F66]/10 shrink-0">
                  <Clock size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-1">Custom Pomodoro Focus Timers</h4>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">Structure your daily revision into high-yield Pomodoro sessions (25-min focus, 5-min break) managed automatically.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#163F66]/5 rounded-xl text-[#163F66] border border-[#163F66]/10 shrink-0">
                  <Flame size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-1">Daily Study Streak Leaderboard</h4>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">Track your daily focus hours, earn study badges, and stay motivated as you climb the rank board alongside toppers.</p>
                </div>
              </div>
            </div>

            {/* Enter Room Button */}
            <button
              onClick={enterRoomAlert}
              className="px-8 py-3.5 rounded-xl bg-[#0b1329] hover:bg-[#EF961D] text-white hover:text-black font-extrabold text-sm sm:text-base transition-all duration-300 shadow-sm flex items-center gap-3 cursor-pointer"
            >
              <span>Enter Study Room</span>
              <ArrowRight size={16} className="stroke-[2.5]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StudyWithMe;
