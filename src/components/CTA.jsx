import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPaperPlane, FaCheck } from "react-icons/fa";

const CTA = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Floating particles animation
    const particles = document.querySelectorAll(".particle");
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: -15,
        x: Math.sin(index) * 10,
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Form reveal animation
    gsap.fromTo(
      formRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/send_mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === "success") {
        alert("Your request has been sent! We will contact you soon.");
        setFormData({ name: "", phone: "", interest: "" });
      } else {
        alert("Failed to send your request. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending mail:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen relative flex items-center pb-15 pt-15 justify-center overflow-hidden bg-[#151316]"
      data-scroll-section
    >
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#151316] via-[#1a181b] to-[#151316]"></div>

      {/* Floating particles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 rounded-full blur-sm opacity-20"
          style={{
            background:
              "linear-gradient(90deg,#1e3a8a 0%,#1d4ed8 50%,#3b82f6 100%)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        ></div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center mb-16 tracking-wide">
            Begin Your{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                background:
                  "linear-gradient(90deg, #1e3a8a 30%, #1d4ed8 60%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              UPSC Journey
            </span>
          </h3>

          <p className="text-lg md:text-2xl text-gray-300 mb-12">
            Get expert guidance and chart your path to success.
          </p>

          {/* Contact Form */}
          <div
            ref={formRef}
            className="bg-[#1a181b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/40"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Full Name */}
                <div className="space-y-2 text-left">
                  <label className="text-gray-300 text-sm font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#151316] border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#1d4ed8]/50 focus:shadow-[0_0_10px_#1d4ed8] transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* ✅ Phone Number Field */}
              <div className="space-y-2 text-left">
                <label className="text-gray-300 text-sm font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#151316] border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#1e3a8a]/50 focus:shadow-[0_0_10px_#1e3a8a] transition-all duration-300"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Area of Interest */}
              <div className="space-y-2 text-left">
                <label className="text-gray-300 text-sm font-semibold">
                  Which UPSC path interested you?
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#151316] border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#1e3a8a]/50 focus:shadow-[0_0_10px_#1e3a8a] transition-all duration-300"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="one-to-one">One to One Program</option>
                  <option value="mentorship">Mentorship</option>
                  <option value="prelims">Prelims</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform ${!isSubmitting && 'hover:-translate-y-1'} shadow-lg group overflow-hidden border border-white/15`}
                style={{
                  background: isSubmitting ? "#475569" : "linear-gradient(90deg,#1e3a8a 37.08%,#1d4ed8 62.26%,#3b82f6 99.82%)",
                }}
              >
                {!isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>}
                <span className="relative flex items-center justify-center space-x-2">
                  <span>{isSubmitting ? "Sending..." : "Request a doubt session"}</span>
                  {!isSubmitting && <FaPaperPlane className="group-hover:translate-x-1 transition-transform duration-300" />}
                </span>
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
              {[
                "Expert Faculty",
                "Comprehensive Material",
                "1:1 Mentorship",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-3 text-gray-300"
                >
                  <FaCheck
                    className="text-transparent bg-clip-text"
                    style={{
                      background:
                        "linear-gradient(90deg,#1e3a8a 37.08%,#1d4ed8 62.26%,#3b82f6 99.82%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
