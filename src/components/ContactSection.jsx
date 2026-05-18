import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      window.alert("Please fill in all the required fields (Name, Email, and Message).");
      return;
    }
    window.alert(`Thank you, ${formData.name}! Your query has been successfully received. Our UPSC academic coordinators will get in touch with you shortly.`);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-slate-50 relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#EF961D] uppercase mb-3 block">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#163F66] tracking-tight mb-4">
            CONTACT <span className="text-[#EF961D]">US</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#EF961D] mx-auto rounded-full shadow-sm"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Contact Information Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-6">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl sm:text-3xl font-black text-[#163F66] leading-snug mb-4">
                Connect With Our Academic Experts
              </h3>
              <p className="text-sm sm:text-base text-slate-500 font-bold leading-relaxed mb-8">
                Have questions about our mentorship program, modules, or pricing? Our team of educational coordinators and UPSC counselors are here to guide you to the right path.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2.5 bg-[#163F66]/5 rounded-lg text-[#163F66] border border-[#163F66]/10 shrink-0">
                  <MapPin size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#163F66] text-sm">Headquarters</h5>
                  <p className="text-xs sm:text-sm text-slate-600 font-bold mt-0.5">iTopper Corporate Center, New Delhi, India</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2.5 bg-[#163F66]/5 rounded-lg text-[#163F66] border border-[#163F66]/10 shrink-0">
                  <Mail size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#163F66] text-sm">Support Email</h5>
                  <p className="text-xs sm:text-sm text-slate-600 font-bold mt-0.5">support@itopper.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2.5 bg-[#163F66]/5 rounded-lg text-[#163F66] border border-[#163F66]/10 shrink-0">
                  <Phone size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#163F66] text-sm">Contact Helpline</h5>
                  <p className="text-xs sm:text-sm text-slate-600 font-bold mt-0.5">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Message Form */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white rounded-[20px] p-8 sm:p-10 border border-slate-200/80 shadow-lg h-full">
              <h3 className="text-2xl font-black text-[#163F66] mb-6 text-left">Send Us A Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Your Name <span className="text-[#EF961D]">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#163F66] transition-all"
                    required
                  />
                </div>

                {/* Email & Phone side-by-side on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Your Email <span className="text-[#EF961D]">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#163F66] transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#163F66] transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Message <span className="text-[#EF961D]">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your query in detail..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#163F66] transition-all resize-none"
                    required
                  />
                </div>

                {/* Send Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#0b1329] hover:bg-[#EF961D] text-white hover:text-black font-extrabold text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    <span>Send Message</span>
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
