import React, { useState, useEffect } from "react";

const Testimonials = () => {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const videoIds = [
    "Sy7TuCjLm0M",
    "65hbv0AhGqU",
    "C_gCtLcCPR0"
  ];

  return (
    <section id="testimonials" className="py-10 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#163F66] mb-4">Student Testimonials</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hear directly from our successful students about their journey and how our platform helped them achieve their goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {videoIds.map((id, index) => {
            const embedUrl = origin
              ? `https://www.youtube.com/embed/${id}?enablejsapi=1&origin=${encodeURIComponent(origin)}&rel=0`
              : `https://www.youtube.com/embed/${id}`;

            return (
              <div key={index} className="w-full max-w-[315px] flex flex-col items-center">
                <div className="w-full aspect-[9/16] bg-slate-100 rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 relative">
                  <iframe
                    className="w-full h-full"
                    src={embedUrl}
                    title={`Student Testimonial ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  ></iframe>
                </div>
                <a
                  href={`https://www.youtube.com/shorts/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-xs font-bold text-[#163F66] hover:text-[#EF961D] flex items-center gap-1 transition-colors"
                >
                  Watch Video on YouTube ↗
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
