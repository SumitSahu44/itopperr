import React from "react";

const Testimonials = () => {
  const videos = [
    "https://www.youtube.com/embed/Sy7TuCjLm0M",
    "https://www.youtube.com/embed/65hbv0AhGqU",
    "https://www.youtube.com/embed/C_gCtLcCPR0"
  ];

  return (
    <section id="testimonials" className="py-16 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#163F66] mb-4">Student Testimonials</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hear directly from our successful students about their journey and how our platform helped them achieve their goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {videos.map((url, index) => (
            <div key={index} className="w-full max-w-[315px] aspect-[9/16] bg-slate-100 rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <iframe
                className="w-full h-full"
                src={url}
                title={`Student Testimonial ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
