import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Mail, Phone, MapPin, ArrowLeft, Info, FileText } from "lucide-react";

export default function PrivacyPolicy() {
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
              <ShieldCheck size={28} />
            </span>
            <span className="text-xs font-extrabold tracking-widest text-[#EF961D] uppercase">
              iTopper Legal Notice
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-sm font-medium max-w-2xl leading-relaxed">
            This Privacy Policy outlines how iTopper collects, uses, and safeguards your personal information when accessing our website and civil services prep services.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Official Document
            </span>
            <span>•</span>
            <span>Last updated: 30th November, 2025</span>
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
          {/* Summary Callout */}
          <div className="bg-blue-50/80 border-l-4 border-[#0a2968] p-5 rounded-r-xl text-sm">
            <h3 className="font-extrabold text-[#0a2968] flex items-center gap-2 mb-2">
              <Info size={18} className="text-[#EF961D]" /> Important Notice for Aspirants
            </h3>
            <p className="text-slate-700">
              This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </div>

          {/* 1. Interpretation & Definitions */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="text-[#EF961D]" size={22} />
              1. Interpretation and Definitions
            </h2>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">Interpretation</h3>
              <p className="text-sm">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-slate-900">Definitions</h3>
              <p className="text-sm">For the purposes of this Privacy Policy:</p>

              <div className="grid gap-3 pt-2">
                {[
                  { term: "Account", desc: "Means a unique account created for You to access our Service or parts of our Service." },
                  { term: "Affiliate", desc: "Means an entity that controls, is controlled by or is under common control with a party, where 'control' means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority." },
                  { term: "Company", desc: "Referred to as either 'the Company', 'We', 'Us' or 'Our' in this Agreement, refers to iTopper." },
                  { term: "Cookies", desc: "Small files that are placed on your computer, mobile device or any other device by a website, containing details of your browsing history on that website among its many uses." },
                  { term: "Country", desc: "Refers to: Punjab & Delhi, India." },
                  { term: "Device", desc: "Means any device that can access the Service such as a computer, a cellphone or a digital tablet." },
                  { term: "Personal Data", desc: "Any information that relates to an identified or identifiable individual." },
                  { term: "Service", desc: "Refers to the Website (www.itopper.academy)." },
                  { term: "Service Provider", desc: "Means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, provide the Service on behalf of the Company, or assist the Company in analyzing how the Service is used." },
                  { term: "Usage Data", desc: "Data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit)." },
                  { term: "Website", desc: "Refers to iTopper, accessible from https://www.itopper.academy" },
                  { term: "You", desc: "Means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable." }
                ].map((def, idx) => (
                  <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 text-sm">
                    <strong className="text-[#0a2968] font-bold">{def.term}: </strong>
                    <span className="text-slate-700">{def.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Collecting & Using Your Data */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              2. Collecting and Using Your Personal Data
            </h2>

            <div className="space-y-4 text-sm">
              <h3 className="text-base font-bold text-slate-900">Types of Data Collected</h3>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-[#0a2968]">Personal Data</h4>
                <p>
                  While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1 font-semibold text-slate-800 ml-2">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-[#0a2968]">Usage Data</h4>
                <p>
                  Usage Data is collected automatically when using the Service. It may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
                <p>
                  When You access the Service by or through a mobile device, We may collect certain information automatically, including the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-[#0a2968]">Tracking Technologies and Cookies</h4>
                <p>
                  We use Cookies and similar tracking technologies (web beacons, tags, and scripts) to track the activity on Our Service and store certain information.
                </p>
                <ul className="space-y-2.5">
                  <li className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">Necessary / Essential Cookies (Session): </strong>
                    Essential to provide You with services available through the Website, authenticating users, and preventing fraudulent use of user accounts.
                  </li>
                  <li className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">Cookies Policy / Notice Acceptance Cookies (Persistent): </strong>
                    Identify if users have accepted the use of cookies on the Website.
                  </li>
                  <li className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">Functionality Cookies (Persistent): </strong>
                    Allow us to remember choices You make when You use the Website, such as remembering your login details or language preference.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Use of Personal Data */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              3. Use of Your Personal Data
            </h2>
            <p className="text-sm">The Company may use Personal Data for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 ml-2">
              <li><strong className="text-slate-900">To provide and maintain our Service:</strong> including monitoring the usage of our Service.</li>
              <li><strong className="text-slate-900">To manage Your Account:</strong> managing your registration as a user of the Service and giving access to mentorship functionalities.</li>
              <li><strong className="text-slate-900">For performance of a contract:</strong> development, compliance, and undertaking of purchase contracts for courses or services.</li>
              <li><strong className="text-slate-900">To contact You:</strong> via email, telephone calls, SMS, or push notifications regarding updates or informative communications related to UPSC preparation modules.</li>
              <li><strong className="text-slate-900">To provide news & special offers:</strong> general information about other test series, courses, and events similar to those you purchased unless opted out.</li>
              <li><strong className="text-slate-900">To manage Your requests:</strong> attending and managing your support queries and evaluation requests.</li>
            </ul>
          </section>

          {/* 4. Data Sharing, Retention & Transfer */}
          <section className="space-y-4 text-sm">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              4. Data Retention, Transfer & Security
            </h2>
            
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900">Retention & Security</h3>
              <p>
                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We retain data to comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <p>
                The security of Your Personal Data is important to Us. While we employ industry-standard encryption and security measures, no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-900">Delete Your Personal Data</h3>
              <p>
                You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You. You may update, amend, or delete your information at any time by contacting us directly.
              </p>
            </div>
          </section>

          {/* 5. Children's Privacy */}
          <section className="space-y-3 text-sm">
            <h2 className="text-xl md:text-2xl font-black text-[#0a2968] border-b border-slate-100 pb-3">
              5. Children's Privacy
            </h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and become aware that your child has provided us with Personal Data, please contact us.
            </p>
          </section>

          {/* Contact Us Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-4 shadow-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-[#EF961D] text-slate-900 rounded-lg font-bold">
                <Mail size={20} />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-white">Contact iTopper Privacy Desk</h3>
                <p className="text-xs text-slate-400">If you have any questions about this Privacy Policy, please reach out to us:</p>
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
                  <span className="text-[11px] text-slate-400 block">Address</span>
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
