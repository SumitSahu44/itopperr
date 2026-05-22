import React from "react";
import { Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-10 px-4 bg-[#f8fafc] relative overflow-hidden border-b border-slate-100 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto w-full text-center flex flex-col items-center">
        
        {/* Get in Touch Pill */}
        <div className="bg-[#e2e8f0] text-[#1e3a8a] px-6 py-2 rounded-full font-bold text-sm mb-6 inline-block">
          Get in Touch
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-black text-[#1e3a8a] tracking-tight mb-12">
          Contact Us
        </h2>

        {/* Call Button */}
        <a 
          href="tel:+919517776651"
          className="w-full sm:w-[90%] bg-[#1e3a8a] hover:bg-[#172b66] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-3 font-bold text-xl sm:text-2xl transition-all shadow-md hover:shadow-lg mb-4"
        >
          <Phone size={28} strokeWidth={2.5} />
          Call: 9517776651
        </a>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/919517776651"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-[90%] bg-[#22c55e] hover:bg-[#1da851] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-3 font-bold text-xl sm:text-2xl transition-all shadow-md hover:shadow-lg"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="M12.004 2.013A9.972 9.972 0 0 0 2 11.99a9.962 9.962 0 0 0 1.346 4.975L2 22l5.166-1.344a9.97 9.97 0 0 0 4.838 1.258h.005A9.974 9.974 0 0 0 22.002 12a9.982 9.982 0 0 0-2.92-7.058 9.932 9.932 0 0 0-7.078-2.929zm0 18.243h-.003a8.272 8.272 0 0 1-4.225-1.157l-.304-.18-3.136.821.836-3.055-.198-.314A8.252 8.252 0 0 1 3.666 12a8.293 8.293 0 0 1 8.337-8.307 8.258 8.258 0 0 1 5.88 2.434A8.254 8.254 0 0 1 20.316 12a8.288 8.288 0 0 1-8.312 8.256zm4.56-6.223c-.25-.125-1.479-.73-1.708-.813-.23-.083-.396-.125-.563.125-.167.25-.646.812-.792.979-.146.166-.292.187-.542.062-.25-.125-1.055-.389-2.012-1.24a7.485 7.485 0 0 1-1.393-1.733c-.146-.25-.015-.385.11-.51.112-.113.25-.292.375-.438.125-.146.167-.25.25-.417.083-.166.042-.312-.021-.437-.063-.125-.563-1.354-.771-1.854-.203-.49-.411-.424-.563-.432-.146-.008-.312-.008-.479-.008a.916.916 0 0 0-.667.312c-.23.25-.876.854-.876 2.083 0 1.229.896 2.417 1.021 2.583.125.167 1.761 2.688 4.264 3.768.597.258 1.064.412 1.428.528.599.19 1.144.163 1.573.1.478-.07 1.479-.604 1.688-1.188.208-.583.208-1.083.146-1.187-.062-.104-.23-.167-.48-.292z" />
          </svg>
          WhatsApp: 9517776651
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
