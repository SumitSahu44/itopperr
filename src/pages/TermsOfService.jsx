import React from "react";
import { Link } from "react-router-dom";
import { FileText, AlertTriangle, CheckCircle, ShieldAlert, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function TermsOfService() {
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
              <FileText size={28} />
            </span>
            <span className="text-xs font-extrabold tracking-widest text-[#EF961D] uppercase">
              iTopper User Agreement
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-slate-300 text-sm font-medium max-w-2xl leading-relaxed">
            Welcome to iTopper. These terms and conditions outline the rules and regulations for the use of iTopper’s Website (www.itopper.academy) and educational services.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Official Document
            </span>
            <span>•</span>
            <span>Last updated: November 2025</span>
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
          
          {/* Critical Warnings Box */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-extrabold text-amber-900 text-base flex items-center gap-2">
              <AlertTriangle className="text-amber-600 shrink-0" size={22} />
              MANDATORY STUDENT RULES & CONDITIONS
            </h3>
            <div className="space-y-3 text-sm text-amber-950 font-medium">
              <div className="bg-white/80 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
                <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="text-slate-900 block font-bold mb-0.5">1. EXAM YEAR ATTEMPT REQUIREMENT:</strong>
                  STUDENTS NEED TO JOIN THE PROGRAM FOR THE YEAR THEY ARE ATTEMPTING EXAM, OTHERWISE SUBSCRIPTIONS CAN BE CANCELLED WITHOUT ANY REFUND.
                </div>
              </div>

              <div className="bg-white/80 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
                <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="text-slate-900 block font-bold mb-0.5">2. STRICT NO SUBSCRIPTION SHARING POLICY:</strong>
                  UNDER ANSWER EVALUATION PROGRAMS, STUDENTS CAN SEND THEIR OWN ANSWERS AND ESSAYS ONLY. SUBSCRIPTION SHARING IS NOT ALLOWED. IN SUCH CASES, IF AN ENROLLED STUDENT ALSO SHARES COPY OF ANY OTHER STUDENT FOR EVALUATION, SUBSCRIPTION OF ENROLLED STUDENT WOULD BE CANCELLED WITHOUT ANY REFUND.
                </div>
              </div>
            </div>
          </div>

          {/* 1. Acceptance of Terms */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              1. Acceptance of Terms & Terminology
            </h2>
            <p className="text-sm">
              By accessing this website we assume you accept these terms and conditions. Do not continue to use iTopper if you do not agree to take all of the terms and conditions stated on this page.
            </p>
            <p className="text-sm">
              The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: <strong className="text-slate-900">“Client”, “You” and “Your”</strong> refers to you, the person log on this website and compliant to the Company’s terms and conditions. <strong className="text-slate-900">“The Company”, “Ourselves”, “We”, “Our” and “Us”</strong>, refers to iTopper. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to prevailing laws of India.
            </p>
          </section>

          {/* 2. Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              2. Cookies
            </h2>
            <p className="text-sm">
              We employ the use of cookies. By accessing iTopper, you agree to use cookies in agreement with iTopper’s Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
            </p>
          </section>

          {/* 3. Intellectual Property License */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              3. Intellectual Property Rights & License
            </h2>
            <p className="text-sm">
              Unless otherwise stated, iTopper and/or its licensors own the intellectual property rights for all material on iTopper. All intellectual property rights are reserved. You may access this from iTopper for your own personal use subject to restrictions set in these terms and conditions.
            </p>
            
            <div className="bg-red-50/70 border border-red-200 rounded-xl p-5 space-y-2 text-sm">
              <strong className="text-red-900 font-bold block mb-1">You must not under any circumstances:</strong>
              <ul className="list-disc list-inside space-y-1.5 text-red-950 font-medium ml-2">
                <li>Republish material from iTopper</li>
                <li>Sell, rent or sub-license material from iTopper</li>
                <li>Reproduce, duplicate or copy material from iTopper</li>
                <li>Redistribute content from iTopper</li>
              </ul>
            </div>
          </section>

          {/* 4. User Comments & Content */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              4. User Comments & Interactive Areas
            </h2>
            <p className="text-sm">
              Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas. iTopper does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of iTopper, its agents, and/or affiliates.
            </p>
            <p className="text-sm">
              iTopper reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.
            </p>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2 text-sm">
              <strong className="text-slate-900 font-bold block">You warrant and represent that:</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-700 ml-2">
                <li>You are entitled to post comments on our website and have all necessary licenses and consents to do so;</li>
                <li>The Comments do not invade any intellectual property right of any third party;</li>
                <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or unlawful material;</li>
                <li>The Comments will not be used to solicit or promote business, custom, or unlawful activity.</li>
              </ul>
            </div>
          </section>

          {/* 5. Hyperlinking & iFrames */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              5. Hyperlinking & iFrames
            </h2>
            <p className="text-sm">
              Government agencies, search engines, news organizations, and online directory distributors may link to our Website without prior written approval. Without prior approval and written permission, you may not create frames around our Web Pages that alter in any way the visual presentation or appearance of our Website.
            </p>
          </section>

          {/* 6. Disclaimer & Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              6. Disclaimer & Reservation of Rights
            </h2>
            <p className="text-sm">
              To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. We reserve the right to request that you remove all links or any particular link to our Website, and we reserve the right to amend these terms and conditions at any time.
            </p>
          </section>

          {/* Contact Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-4 shadow-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-[#EF961D] text-slate-900 rounded-lg font-bold">
                <Mail size={20} />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-white">iTopper Support & Inquiries</h3>
                <p className="text-xs text-slate-400">For any questions or clarifications regarding our Terms & Conditions:</p>
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
                  <span className="text-[11px] text-slate-400 block">Location</span>
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
