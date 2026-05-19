import React from "react";

const CoreValues = () => {
  return (
    <section id="core-values" className="py-6 bg-slate-50 relative overflow-hidden border-b border-slate-100">
      <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10 flex justify-center">
        <div className="bg-white rounded-[20px] p-8 sm:p-10 border border-slate-200/80 shadow-md relative overflow-hidden group w-full">
          <h3 className="text-xl font-bold text-[#163F66] mb-6">Our Core Vision</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-medium italic border-l-4 border-[#EF961D] pl-4">
            "To cultivate analytical minds, ethical decision-making, and deep conceptual clarity in the next generation of civil servants, making world-class guidance accessible to every corner of India."
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xl">🎯</span>
              <div>
                <h5 className="font-semibold text-sm text-slate-800">Laser-Focused Syllabus</h5>
                <p className="text-[11px] text-slate-500 font-medium">Updated dynamically for CSE changes.</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xl">📊</span>
              <div>
                <h5 className="font-semibold text-sm text-slate-800">Advanced Analytics</h5>
                <p className="text-[11px] text-slate-500 font-medium">Detailed feedback on answer writing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
