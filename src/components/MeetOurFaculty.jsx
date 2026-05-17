import React from "react";

const facultyData = [
  {
    name: "Dr. Shivin Chaudhary Sir",
    subtitle: "Ex-IRS",
    subjects: "Economy, Environment, Disaster Management, Science & Tech and Security",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Varun Jain Sir",
    subtitle: "4 UPSC Mains, 2 Interviews",
    subjects: "International Relations, Live Answer Writing, Live MCQ Solving & Mentorship",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Sajal Singh Sir",
    subtitle: "Mentor to 600+ successful rankers\n3 UPSC Interviews",
    subjects: "Head of Mentorship",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Himanshu Khatri Sir",
    subtitle: "Ex-IRS",
    subjects: "History",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    name: "Aditya Kalia Sir",
    subtitle: "2 UPSC Interviews",
    subjects: "Economy",
    image: "https://randomuser.me/api/portraits/men/57.jpg",
  },
  {
    name: "Peeyush Kumar Sir",
    subtitle: "50+ Rankers in Top 100",
    subjects: "Ethics & Essay",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
];

const MeetOurFaculty = () => {
  return (
    <section className="py-20 bg-white" id="faculty">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-black text-center text-black mb-20 tracking-tight">
          Meet The Faculty
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-20">
          {facultyData.map((faculty, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Circular Avatar with Gradient Border */}
              <div className="relative w-48 h-48 rounded-full p-1 bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800">
                <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Name Banner */}
              <div className="relative w-full max-w-[280px] flex justify-center z-10 mt-[-24px] px-2">
                {/* Dark green background banner with slanted edges */}
                <div
                  className="absolute top-3 w-full h-10 bg-blue-900 z-0 shadow-lg"
                  style={{
                    clipPath: "polygon(4% 0, 96% 0, 100% 100%, 0% 100%)",
                  }}
                ></div>
                {/* Yellow foreground banner */}
                <div className="bg-blue-600 py-2 w-[90%] font-bold text-center text-sm sm:text-base text-white z-10 shadow-sm relative rounded-sm">
                  {faculty.name}
                </div>
              </div>

              {/* Subtitle and Subjects */}
              <div className="mt-6 text-center px-4">
                <p className="text-gray-600 text-sm md:text-sm whitespace-pre-line mb-1">
                  {faculty.subtitle}
                </p>
                <p className="text-black font-bold text-sm md:text-base whitespace-pre-line leading-snug">
                  {faculty.subjects}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurFaculty;
