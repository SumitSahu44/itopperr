import React from "react";
import { Link } from "react-router-dom";
import { XCircle, CheckCircle, Clock, AlertTriangle, ArrowLeft, Mail, Phone, MapPin, FileX } from "lucide-react";

export default function CancellationPolicy() {
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
              <FileX size={28} />
            </span>
            <span className="text-xs font-extrabold tracking-widest text-[#EF961D] uppercase">
              iTopper Enrollment Terms
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Cancellation Policy
          </h1>
          <p className="text-slate-300 text-sm font-medium max-w-2xl leading-relaxed">
            Standard cancellation rules and enrollment terms for iTopper UPSC Civil Services mentorship, test series, and answer evaluation subscriptions.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Razorpay Merchant Compliant
            </span>
            <span>•</span>
            <span>UPSC Prep Programs</span>
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
          
          {/* Overview Section */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              1. Overview
            </h2>
            <p className="text-sm">
              This policy outlines the conditions under which an enrolled student may cancel their mentorship or answer evaluation subscription at iTopper, as well as scenarios under which iTopper reserves the right to cancel a student's enrollment.
            </p>
          </section>

          {/* Cancellation Eligibility Window */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Clock className="text-[#EF961D]" size={22} />
              2. Student-Requested Cancellation Window
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm font-medium">
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <CheckCircle className="text-emerald-600 shrink-0" size={20} />
                  Within 7 Days of Enrollment
                </div>
                <p className="text-emerald-950 text-xs">
                  A student can request enrollment cancellation within <strong>7 days of enrollment</strong> provided no answer copies have been evaluated and no Prelims Test Series PDFs have been dispatched/emailed.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 p-5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-red-900 font-bold text-base">
                  <XCircle className="text-red-600 shrink-0" size={20} />
                  After 7 Days or Post Evaluation
                </div>
                <p className="text-red-950 text-xs">
                  No student-requested cancellations or refunds are accepted after 7 days of enrollment, or once any evaluation has been conducted or PDFs dispatched.
                </p>
              </div>
            </div>
          </section>

          {/* Automatic Cancellation by iTopper */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={22} />
              3. Forced / Automatic Cancellation Rules
            </h2>
            <p className="text-sm">
              iTopper reserves the right to immediately terminate or cancel a student's subscription without any refund under the following violations:
            </p>

            <div className="space-y-3 text-sm">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="text-slate-900 font-bold block">Incorrect Exam Attempt Year:</strong>
                  Students must join the program for the year they are attempting the exam. If enrolled under an incorrect attempt year, the subscription may be cancelled without refund.
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="text-slate-900 font-bold block">Subscription Sharing & Answer Copy Misuse:</strong>
                  Under answer evaluation programs, students can send their own answers and essays only. If an enrolled student shares copies of another student for evaluation or shares credentials, the subscription will be cancelled immediately without refund.
                </div>
              </div>
            </div>
          </section>

          {/* Cancellation Request Procedure */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              4. How to Request Cancellation
            </h2>
            <p className="text-sm">
              To request a cancellation within the eligible 7-day window, please send an official email or call us with the following details:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm font-semibold text-slate-800 ml-2">
              <li>Full Student Name & Registered Email / Phone Number</li>
              <li>Enrolled Program Name & Payment Transaction ID / Payment Receipt</li>
              <li>Reason for Cancellation</li>
            </ul>
            <p className="text-sm text-slate-600">
              Our support team will process eligible cancellation requests within <strong>7 business days</strong>.
            </p>
          </section>

          {/* Support Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-4 shadow-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-[#EF961D] text-slate-900 rounded-lg font-bold">
                <Mail size={20} />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-white">Cancellation Desk Contact</h3>
                <p className="text-xs text-slate-400">For cancellation assistance or questions regarding your enrollment:</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-sm font-medium">
              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                <Mail className="text-[#EF961D] shrink-0" size={18} />
                <div className="truncate">
                  <span className="text-[11px] text-slate-400 block">Email Us</span>
                  <a href="mailto:contact@itopper.academy" className="text-white hover:text-[#EF961D] truncate font-bold">
                    contact@itopper.academy
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                <Phone className="text-[#EF961D] shrink-0" size={18} />
                <div>
                  <span className="text-[11px] text-slate-400 block">Phone</span>
                  <a href="tel:9877536047" className="text-white hover:text-[#EF961D] font-bold">
                    +91 9877536047
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                <MapPin className="text-[#EF961D] shrink-0" size={18} />
                <div>
                  <span className="text-[11px] text-slate-400 block">Office Location</span>
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
