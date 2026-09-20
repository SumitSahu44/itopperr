import React from "react";
import { Link } from "react-router-dom";
import { RefreshCw, CheckCircle, XCircle, AlertCircle, ArrowLeft, Mail, Phone, MapPin, CreditCard, ShieldX } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      {/* Header Banner */}
      <div className="bg-[#0a2968] text-white pt-12 pb-16 px-6 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#EF961D] hover:text-white mb-6 transition-colors uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2 bg-[#EF961D]/20 text-[#EF961D] rounded-lg">
              <RefreshCw size={28} />
            </span>
            <span className="text-xs font-extrabold tracking-widest text-[#EF961D] uppercase">
              iTopper Payment Policy
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Refund & Return Policy
          </h1>
          <p className="text-slate-300 text-sm font-medium max-w-2xl leading-relaxed">
            Official Return and Refund Guidelines for iTopper UPSC CSE Mentorship, Answer Writing, and Test Series Programs.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Razorpay Verified Policy
            </span>
            <span>•</span>
            <span>Digital Services & Mentorship</span>
            <span>•</span>
            <a href="https://www.itopper.academy" className="text-[#EF961D] hover:underline font-bold">
              www.itopper.academy
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 md:p-12 space-y-10 leading-relaxed text-slate-700">
          
          {/* Physical Goods Return Notice */}
          <div className="bg-blue-50 border-l-4 border-[#0a2968] p-5 rounded-r-xl space-y-2">
            <h3 className="font-extrabold text-[#0a2968] text-base flex items-center gap-2">
              <AlertCircle className="text-[#EF961D]" size={20} />
              1. Physical Goods Return Policy
            </h3>
            <p className="text-sm text-slate-700 font-medium">
              As iTopper does not deal in any sale of physical goods, there is no requirement of a physical return policy. All offerings are digital mentorship, online evaluation, and test series services.
            </p>
          </div>

          {/* Refund Guidelines Section */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3 flex items-center gap-2">
              <CreditCard className="text-[#EF961D]" size={24} />
              2. Terms Regarding Refunds
            </h2>

            {/* 7-Day Refund Eligible Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-black text-base">
                <CheckCircle className="text-emerald-600 shrink-0" size={22} />
                7-Day Refund Window for Answer Evaluation Programs
              </div>
              <p className="text-sm text-emerald-950 font-medium">
                Students who have enrolled in answer evaluation programs: If a student hasn't sent any answer for evaluation, then they can request a full refund within <strong>7 days of enrollment</strong>. The refund will be processed within <strong>7 business days</strong> from when the refund request is received.
              </p>
            </div>

            {/* Non-Refundable Scenarios Box */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-900 font-black text-base">
                <ShieldX className="text-red-600 shrink-0" size={22} />
                Non-Refundable Conditions (Strictly Enforced)
              </div>

              <ul className="space-y-3 text-sm text-red-950 font-medium">
                <li className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-red-100">
                  <XCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <strong className="text-slate-900 font-bold block">Evaluated Answers or Essays:</strong>
                    If any answers or essays have already been evaluated by our mentorship team, a refund is <strong>NOT</strong> considered under any circumstances.
                  </div>
                </li>

                <li className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-red-100">
                  <XCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <strong className="text-slate-900 font-bold block">Prelims Test Series PDF Dispatch:</strong>
                    For the Prelims Test Series program, if test series PDFs have been emailed or provided to students, a refund is <strong>NOT</strong> considered.
                  </div>
                </li>

                <li className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-red-100">
                  <XCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <strong className="text-slate-900 font-bold block">Wrong Attempt Year Selection:</strong>
                    STUDENTS NEED TO JOIN THE PROGRAM FOR THE YEAR THEY ARE ATTEMPTING EXAM, OTHERWISE SUBSCRIPTIONS CAN BE CANCELLED WITHOUT ANY REFUND.
                  </div>
                </li>

                <li className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-red-100">
                  <XCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <strong className="text-slate-900 font-bold block">Subscription Sharing & Copy Sharing:</strong>
                    UNDER ANSWER EVALUATION PROGRAMS, STUDENTS CAN SEND THEIR OWN ANSWERS AND ESSAYS ONLY. SUBSCRIPTION SHARING IS NOT ALLOWED. IN SUCH CASES, IF AN ENROLLED STUDENT ALSO SHARES COPY OF ANY OTHER STUDENT FOR EVALUATION, SUBSCRIPTION OF ENROLLED STUDENT WOULD BE CANCELLED WITHOUT ANY REFUND.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Refund Processing Mode */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              3. Refund Processing & Mode of Payment
            </h2>
            <p className="text-sm">
              Approved refunds will be credited back to the original payment method (Credit Card, Debit Card, Net Banking, UPI, or Wallet) via our secure payment gateway partner (Razorpay).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-1">Processing Time</span>
                <span className="text-base font-extrabold text-[#0a2968]">Within 7 Business Days</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-1">Refund Method</span>
                <span className="text-base font-extrabold text-[#0a2968]">Original Source / Razorpay</span>
              </div>
            </div>
          </section>

          {/* Contact for Refunds Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-4 shadow-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-[#EF961D] text-slate-900 rounded-lg font-bold">
                <Phone size={20} />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-white">Need Clarification or Refund Assistance?</h3>
                <p className="text-xs text-slate-400">For any questions or clarification regarding refunds, reach out to our helpdesk:</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-sm font-medium">
              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                <Phone className="text-[#EF961D] shrink-0" size={18} />
                <div>
                  <span className="text-[11px] text-slate-400 block">Direct Helpline</span>
                  <a href="tel:9877536047" className="text-white hover:text-[#EF961D] font-bold">
                    +91 9877536047
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                <Mail className="text-[#EF961D] shrink-0" size={18} />
                <div className="truncate">
                  <span className="text-[11px] text-slate-400 block">Support Email</span>
                  <a href="mailto:contact@itopper.academy" className="text-white hover:text-[#EF961D] truncate font-bold">
                    contact@itopper.academy
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                <MapPin className="text-[#EF961D] shrink-0" size={18} />
                <div>
                  <span className="text-[11px] text-slate-400 block">Institute Location</span>
                  <span className="text-white text-xs font-semibold">
                    Old Rajinder Nagar, Delhi
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
